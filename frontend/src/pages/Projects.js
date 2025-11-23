import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import ProjectCard from "../components/ProjectCard";
import "../styles.css";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [newProj, setNewProj] = useState({
    name: "",
    description: "",
    status: "pending",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await api.get("/projects");
        setProjects(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load projects");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const createProject = async (e) => {
    e.preventDefault();
    try {
      setError("");
      const res = await api.post("/projects", newProj);
      setProjects((prev) => [res.data, ...prev]);
      setNewProj({ name: "", description: "", status: "pending" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create project");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/projects/${id}`);
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete project");
    }
  };

  const handleUpdate = async (id, updates) => {
    try {
      const res = await api.put(`/projects/${id}`, updates);
      setProjects((prev) => prev.map((p) => (p._id === id ? res.data : p)));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update project");
    }
  };

  return (
    <div className="jira-shell">
      <header className="page-header">
        <h1>Your Projects</h1>
        <p className="muted">Organize work with custom project statuses and simple collaboration.</p>
      </header>

      <section className="create-area card">
        <form className="create-form" onSubmit={createProject}>
          <div className="form-row">
            <input
              className="input"
              placeholder="Project name"
              value={newProj.name}
              onChange={(e) => setNewProj({ ...newProj, name: e.target.value })}
              required
            />
            <select
              className="select-small"
              value={newProj.status}
              onChange={(e) => setNewProj({ ...newProj, status: e.target.value })}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="form-row">
            <input
              className="input"
              placeholder="Short description"
              value={newProj.description}
              onChange={(e) => setNewProj({ ...newProj, description: e.target.value })}
            />
            <button className="btn primary">Create</button>
          </div>
        </form>

        {error && <p className="error">{error}</p>}
      </section>

      <main>
        {loading ? (
          <div className="grid-skeleton">
            <div className="skeleton-card" />
            <div className="skeleton-card" />
            <div className="skeleton-card" />
          </div>
        ) : (
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
        )}
      </main>
    </div>
  );
}
