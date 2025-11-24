import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

export default function CreateProject() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/projects", {
        name,
        description,
      });

      // redirect to the new project details page
      navigate(`/projects/${res.data._id}`);
    } catch (error) {
      console.error("Create project error:", error);
      alert("Failed to create project.");
    }
  };

  return (
    <div className="jira-shell">
      <h2>Create Project</h2>

      <form className="create-area" onSubmit={handleSubmit}>
        <input
          className="input"
          placeholder="Project name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          className="textarea"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button className="btn primary">Create</button>
      </form>
    </div>
  );
}
