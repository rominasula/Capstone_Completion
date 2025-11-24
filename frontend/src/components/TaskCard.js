import React from "react";

export default function TaskCard({ task }) {
  if (!task) return null;

  return (
    <div className="card" style={{ padding: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
        <div>
          <h4 style={{ margin: 0 }}>{task.title}</h4>
          <p className="muted" style={{ marginTop: 6 }}>{task.description}</p>
        </div>

        <div style={{ textAlign: "right" }}>
          <div className={`status-badge ${task.status}`} style={{ marginBottom: 6 }}>
            {task.status}
          </div>
          <div className={`priority-badge ${task.priority}`}>
            {task.priority}
          </div>
        </div>
      </div>
    </div>
  );
}
