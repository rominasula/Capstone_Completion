import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [newProj, setNewProj] = useState({ name: "", description: "", status: "pending" });
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/projects").then((res) => setProjects(res.data)).catch(err => {
      setError(err.response?.data?.message || "Failed to load projects");
    });
  }, []);

  const createProject = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/projects", newProj);
      setProjects([...projects, res.data]);
      setNewProj({ name: "", description: "", status: "pending" });
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create project");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/projects/${id}`);
      setProjects(projects.filter((p) => p._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete project");
    }
  };

  const handleUpdate = async (id, updates) => {
    // updates is an object with fields to update (e.g. { name, status })
    try {
      const res = await api.put(`/projects/${id}`, updates);
      setProjects(projects.map((p) => (p._id === id ? res.data : p)));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update project");
    }
  };

  return (
    <div className="page">
      <h2>Your Projects</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form className="create-form" onSubmit={createProject}>
        <input
          placeholder="Project Name"
          value={newProj.name}
          onChange={(e) => setNewProj({ ...newProj, name: e.target.value })}
        />
        <input
          placeholder="Description"
          value={newProj.description}
          onChange={(e) =>
            setNewProj({ ...newProj, description: e.target.value })
          }
        />

        <select
          value={newProj.status}
          onChange={(e) => setNewProj({ ...newProj, status: e.target.value })}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <button>Create</button>
      </form>

      <div className="project-grid">
        {projects.map((p) => (
          <ProjectCard
            key={p._id}
            project={p}
            onDelete={() => handleDelete(p._id)}
            onUpdate={(updates) => handleUpdate(p._id, updates)}
          />
        ))}
      </div>
    </div>
  );
}
