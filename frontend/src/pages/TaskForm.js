import React, { useState } from "react";
import axios from "../api/axiosConfig";

const TaskForm = ({ projectId, onTaskCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [status, setStatus] = useState("pending");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(`/projects/${projectId}/tasks`, {
        title,
        description,
        priority,
        status,
      });

      onTaskCreated(res.data);

      setTitle("");
      setDescription("");
      setPriority("medium");
      setStatus("pending");
    } catch (err) {
      console.error("Create task error:", err);
      setError("Failed to create task.");
    }
  };

  return (
    <div className="card create-task form">
      <h3>Create Task</h3>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit} className="create-form">
        <div className="form-row">
          <input
            className="input"
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <select
            className="select-small"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <select
            className="select-small"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <textarea
          className="textarea"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit" className="btn primary">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
