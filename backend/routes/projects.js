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



export default router;
