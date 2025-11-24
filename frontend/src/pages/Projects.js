import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";

const STATUS_LABEL = {
  pending: "Pending",
  "in-progress": "In-Progress",
  completed: "Completed",
};

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to load projects");
    }
  };

  const openDeleteModal = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await api.delete(`/projects/${selectedProject._id}`);
      setProjects((prev) => prev.filter((p) => p._id !== selectedProject._id));
      setModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to delete project");
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await api.put(`/projects/${id}`, { status: newStatus });
      setProjects((prev) => prev.map((p) => (p._id === id ? res.data : p)));
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Failed to update status");
    }
  };

  const filtered = projects.filter((p) =>
    filterStatus === "all" ? true : p.status === filterStatus
  );

  return (
    <div className="jira-shell">
      <header className="page-header">
        <h1>Your Projects</h1>
        <p className="muted">Organize work with custom project statuses and simple collaboration.</p>
      </header>

      <section className="create-area card">
        <div className="row-between" style={{ alignItems: "center" }}>
          <Link to="/projects/new" className="btn primary">Create Project</Link>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <label className="muted">Filter:</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="select-small"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In-Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </section>

      {error && <div className="error">{error}</div>}

      <section className="project-grid" style={{ marginTop: 18 }}>
        {filtered.map((p) => (
          <div key={p._id} className="project-card card">
            <div className={`accent ${p.status || "pending"}`} />

            <div className="card-body">
              <div className="card-header" style={{ alignItems: "center" }}>
                <div>
                  <h3 className="project-title">{p.name}</h3>
                  <p className="muted" style={{ marginTop: 6 }}>{p.description}</p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                  <div className={`status-badge ${p.status || "pending"}`} style={{ marginBottom: 8 }}>
                    {STATUS_LABEL[p.status] || "Pending"}
                  </div>

                  <select
                    className="status-dropdown select-small"
                    value={p.status}
                    onChange={(e) => updateStatus(p._id, e.target.value)}
                    aria-label={`Change status for ${p.name}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In-Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="card-actions" style={{ marginTop: 12 }}>
                <Link className="link-btn" to={`/projects/${p._id}`}>Open</Link>
                <Link className="link-btn" to={`/projects/${p._id}/edit`}>Edit</Link>

                <Link className="add-task-btn" to={`/projects/${p._id}/tasks/new`}>
                  Add Task
                </Link>

                <button
                  className="delete-btn"
                  onClick={() => openDeleteModal(p)}
                  aria-label={`Delete ${p.name}`}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      <Modal
        open={modalOpen}
        message={`Are you sure you want to delete "${selectedProject?.name}"?`}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
