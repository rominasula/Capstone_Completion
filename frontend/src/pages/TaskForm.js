import { useState } from "react";
import api from "../api/axiosConfig";
import { useParams, useNavigate } from "react-router-dom";

export default function TaskForm() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "todo",
  });

  const submit = async (e) => {
    e.preventDefault();
    await api.post(`/projects/${projectId}/tasks`, form);
    navigate(`/projects/${projectId}`);
  };

  return (
    <div className="form-page">
      <h2>New Task</h2>

      <form onSubmit={submit}>
        <input
          placeholder="Task Title"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          placeholder="Description"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <select
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
        >
          <option value="low">Low</option>
          <option value="medium" selected>
            Medium
          </option>
          <option value="high">High</option>
        </select>

        <button>Create Task</button>
      </form>
    </div>
  );
}
