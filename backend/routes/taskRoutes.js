import express from "express";
import {
  createTask,
  getTasksByProject,
  updateTask,
  deleteTask
} from "../controllers/taskController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createTask);
router.get("/:projectId", protect, getTasksByProject);

router
  .route("/task/:id")
  .put(protect, updateTask)
  .delete(protect, deleteTask);

export default router;
