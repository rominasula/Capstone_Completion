import express from "express";
import Project from "../models/Project.js";

const router = express.Router();

// Get all projects
router.get("/", async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

// Create new
router.post("/", async (req, res) => {
  const project = await Project.create(req.body);
  res.json(project);
});

// Get by ID
router.get("/:id", async (req, res) => {
  const project = await Project.findById(req.params.id);
  res.json(project);
});

// Update
router.put("/:id", async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body);
  res.json(project);
});

export default router;
