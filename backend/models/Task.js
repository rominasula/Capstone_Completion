import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, default: "todo" },
  priority: String,
  dueDate: Date,
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
});

export default mongoose.model("Task", taskSchema);
