import Project from "../models/Project.js";
import Task from "../models/Task.js"; // <-- REQUIRED

// CREATE PROJECT
export const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Not authorized (no user found)" });
    }

    const project = await Project.create({
      name,
      description,
      owner: req.user._id, // REQUIRED
    });

    res.status(201).json(project);
  } catch (error) {
    console.error("Create project error:", error);
    res.status(500).json({ message: error.message });
  }
};

// GET ALL PROJECTS FOR LOGGED-IN USER
export const getProjects = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const projects = await Project.find({ owner: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(projects);
  } catch (error) {
    console.error("Get projects error:", error);
    res.status(500).json({ message: error.message });
  }
};

// GET PROJECT BY ID
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    console.error("Get project error:", error);
    res.status(500).json({ message: error.message });
  }
};

// UPDATE PROJECT (name, description, status + auto task completion)
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Ensure the logged-in user is the owner
    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Save old status
    const previousStatus = project.status;

    // Update fields
    project.name = req.body.name || project.name;
    project.description = req.body.description || project.description;
    project.status = req.body.status || project.status; // <--- VERY IMPORTANT

    const updated = await project.save();

    // AUTO-MOVE ALL TASKS -> completed when project is completed
    if (previousStatus !== "completed" && updated.status === "completed") {
      await Task.updateMany(
        { projectId: project._id },
        { $set: { status: "completed" } }
      );
    }

    res.json(updated);

  } catch (error) {
    console.error("Update project error:", error);
    res.status(500).json({ message: error.message });
  }
};

// DELETE PROJECT
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Ensure the logged-in user is the owner
    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await project.deleteOne();

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Delete project error:", error);
    res.status(500).json({ message: error.message });
  }
};
