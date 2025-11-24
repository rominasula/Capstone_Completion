import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

export default function AddTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post(`/projects/${id}/tasks`, {
      title,
      description,
      priority: "medium",
      status: "pending"
    });

    navigate(`/projects/${id}`);
  };

  return (
    <div className="form-container">
      <h2>Add Task</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button className="btn primary">Create Task</button>
      </form>
    </div>
  );
}
