import React, { useState } from "react";

export default function ProjectCard({ project, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: project.name || "",
    description: project.description || "",
    status: project.status || "pending",
  });

  const toggleEdit = () => {
    setEditing(!editing);
    // reset form when opening edit
    setForm({
      name: project.name || "",
      description: project.description || "",
      status: project.status || "pending",
    });
  };

  const save = () => {
    // validate minimal
    const updates = {};
    if (form.name !== project.name) updates.name = form.name;
    if (form.description !== project.description) updates.description = form.description;
    if (form.status !== project.status) updates.status = form.status;

    if (Object.keys(updates).length === 0) {
      setEditing(false);
      return;
    }

    onUpdate(updates);
    setEditing(false);
  };

  return (
    <div className="project-card">
      {editing ? (
        <div>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <div style={{ marginTop: 8 }}>
            <button onClick={save}>Save</button>
            <button onClick={toggleEdit} style={{ marginLeft: 8 }}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <p>
            Status: <strong>{project.status}</strong>
          </p>

          <div style={{ marginTop: 8 }}>
            <button onClick={toggleEdit}>Edit</button>
            <button onClick={onDelete} style={{ marginLeft: 8 }}>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
