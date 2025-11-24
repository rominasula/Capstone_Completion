import express from "express";
import {
  createProject,
  getProjects,
  getProjectById,
  deleteProject           // <-- added this
} from "../controllers/projectController.js";

import {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} from "../controllers/taskController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// PROJECT ROUTES
router.post("/", protect, createProject);
router.get("/", protect, getProjects);
router.get("/:id", protect, getProjectById);
router.delete("/:id", protect, deleteProject);   // <-- NEW DELETE ROUTE

// TASK ROUTES (NESTED)
router.post("/:id/tasks", protect, createTask);
router.get("/:id/tasks", protect, getTasks);

// UPDATE / DELETE A TASK
router.put("/tasks/:taskId", protect, updateTask);
router.delete("/tasks/:taskId", protect, deleteTask);

export default router;
