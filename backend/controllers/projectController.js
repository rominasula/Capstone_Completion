import Project from "../models/Project.js";

export const createProject = async (req, res) => {
  try {
    const project = await Project.create({
      name: req.body.name,
      description: req.body.description,
      owner: req.user._id,
      members: [req.user._id],
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProjects = async (req, res) => {
  const projects = await Project.find({ members: req.user._id });
  res.json(projects);
};

export const updateProject = async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) return res.status(404).json({ message: "Project not found" });

  if (project.owner.toString() !== req.user._id.toString())
    return res.status(403).json({ message: "Unauthorized" });

  const updated = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(updated);
};

export const deleteProject = async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) return res.status(404).json({ message: "Project not found" });

  if (project.owner.toString() !== req.user._id.toString())
    return res.status(403).json({ message: "Unauthorized" });

  await project.deleteOne();
  res.json({ message: "Project deleted" });
};
