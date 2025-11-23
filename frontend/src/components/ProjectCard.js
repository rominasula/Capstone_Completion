import React, { useState } from "react";
import "../styles.css";
import { Link } from "react-router-dom";

export default function ProjectCard({ project, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: project.name || "",
    description: project.description || "",
    status: project.status || "pending",
  });

  const toggleEdit = () => {
    setEditing((v) => !v);
    setForm({
      name: project.name || "",
      description: project.description || "",
      status: project.status || "pending",
    });
  };

  const save = () => {
    const updates = {};
    if (form.name !== project.name) updates.name = form.name;
    if (form.description !== project.description) updates.description = form.description;
    if (form.status !== project.status) updates.status = form.status;

    if (Object.keys(updates).length > 0) {
      onUpdate(updates);
    }
    setEditing(false);
  };

  // map status to color class
  const pillClass = {
    pending: "pill-yellow",
    "in-progress": "pill-blue",
    completed: "pill-green",
  }[project.status] || "pill-gray";

  return (
    <article className="project-card card">
      <div className={`accent ${project.status}`} />

      <div className="card-body">
        {editing ? (
          <>
            <input
              className="input"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <textarea
              className="textarea"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
            <div className="row-between">
              <select
                className="select"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>

              <div>
                <button className="btn" onClick={save}>
                  Save
                </button>
                <button className="btn ghost" onClick={toggleEdit} style={{ marginLeft: 8 }}>
                  Cancel
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="card-header">
              <h3 className="project-title">{project.name}</h3>
              <div className={`status-pill ${pillClass}`}>{project.status}</div>
            </div>

            <p className="muted">{project.description}</p>

            <div className="card-actions">
              <Link to={`/projects/${project._id}`} className="link-btn">Open</Link>
              <button className="btn" onClick={toggleEdit}>Edit</button>
              <button className="btn danger" onClick={onDelete}>Delete</button>
            </div>
          </>
        )}
      </div>
    </article>
  );
}
