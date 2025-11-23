import Project from "../models/Project.js";
import mongoose from "mongoose";

// Create a new project
export const createProject = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const { name, description, status } = req.body;
    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Project name is required" });
    }

    // Validate status if provided
    const validStatuses = ["pending", "in-progress", "completed"];
    const projectStatus =
      status && validStatuses.includes(status) ? status : "pending";

    const project = await Project.create({
      name: name.trim(),
      description: description || "",
      status: projectStatus,
      owner: req.user._id,
      members: [req.user._id],
    });

    res.status(201).json(project);
  } catch (error) {
    console.error("Create project error:", error);
    res.status(500).json({ message: "Server error, could not create project" });
  }
};

// Get all projects of the logged-in user
export const getProjects = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const projects = await Project.find({ members: req.user._id });
    res.json(projects);
  } catch (error) {
    console.error("Get projects error:", error);
    res.status(500).json({ message: "Server error, could not fetch projects" });
  }
};

// Update a project (owner only)
export const updateProject = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }

    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Only allow certain fields to be updated
    const allowedUpdates = {};
    if (req.body.name !== undefined) allowedUpdates.name = req.body.name;
    if (req.body.description !== undefined) allowedUpdates.description = req.body.description;
    if (req.body.status !== undefined) {
      // validate status
      const validStatuses = ["pending", "in-progress", "completed"];
      if (!validStatuses.includes(req.body.status)) {
        return res.status(400).json({ message: "Invalid status value" });
      }
      allowedUpdates.status = req.body.status;
    }

    const updated = await Project.findByIdAndUpdate(id, allowedUpdates, { new: true });
    res.json(updated);
  } catch (error) {
    console.error("Update project error:", error);
    res.status(500).json({ message: "Server error, could not update project" });
  }
};

// Delete a project (owner only)
export const deleteProject = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }

    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await project.deleteOne();
    res.json({ message: "Project deleted" });
  } catch (error) {
    console.error("Delete project error:", error);
    res.status(500).json({ message: "Server error, could not delete project" });
  }
};
