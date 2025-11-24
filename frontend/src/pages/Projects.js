import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/projects");
        setProjects(res.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load projects");
      }
    };
    load();
  }, []);

  const openDeleteModal = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await api.delete(`/projects/${selectedProject._id}`);
      setProjects(projects.filter((p) => p._id !== selectedProject._id));
      setModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to delete project");
    }
  };

  return (
    <div className="jira-shell">
      <header className="page-header">
        <h1>Your Projects</h1>
        <p className="muted">Organize work with custom project statuses and simple collaboration.</p>
      </header>

      <section className="create-area card">
        <div className="row-between">
          <Link to="/projects/new" className="btn primary">Create Project</Link>
        </div>
      </section>

      {error && <div className="error">{error}</div>}

      <section className="project-grid" style={{ marginTop: 18 }}>
        {projects.map((p) => (
          <div key={p._id} className="project-card card">
            <div className={`accent ${p.status || "pending"}`} />

            <div className="card-body">
              <div className="card-header">
                <h3 className="project-title">{p.name}</h3>
                <div className={`status-badge ${p.status || "pending"}`}>{p.status}</div>
              </div>

              <p className="muted">{p.description}</p>

              <div className="card-actions">
                <Link className="link-btn" to={`/projects/${p._id}`}>Open</Link>
                <Link className="link-btn" to={`/projects/${p._id}/edit`}>Edit</Link>

                <Link className="add-task-btn" to={`/projects/${p._id}/tasks/new`}>
                  Add Task
                </Link>

                <button className="delete-btn" onClick={() => openDeleteModal(p)}>
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
