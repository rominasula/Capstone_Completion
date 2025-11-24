import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../api/axiosConfig";
import TaskForm from "./TaskForm";

const ProjectDetails = () => {
  const { id } = useParams();

  // Hooks MUST be at the top — NO conditions above this point
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [invalidProject, setInvalidProject] = useState(false);

  const loadData = async () => {
    // If the ID is literally "new", it's NOT a real project
    if (id === "new") {
      setInvalidProject(true);
      setLoading(false);
      return;
    }

    try {
      const projectRes = await axios.get(`/projects/${id}`);
      const tasksRes = await axios.get(`/projects/${id}/tasks`);

      setProject(projectRes.data);
      setTasks(tasksRes.data);
    } catch (error) {
      console.error("Failed loading project or tasks:", error);
      setInvalidProject(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  // Loading state
  if (loading) return <p>Loading...</p>;

  // Invalid or missing project
  if (invalidProject || !project) {
    return (
      <p style={{ color: "red" }}>
        Project not found. <Link to="/projects">Go back</Link>
      </p>
    );
  }

  return (
    <div className="jira-shell">
      <div className="page-header small">
        <h2>{project.name}</h2>
        <p className="muted">{project.description}</p>
      </div>

      <TaskForm projectId={id} onTaskCreated={(t) => setTasks([t, ...tasks])} />

      <h3>Tasks</h3>

      {tasks.length === 0 ? (
        <p className="muted">No tasks yet.</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task._id} className="card task-card">
              <div className="row-between">
                <strong>{task.title}</strong>
                <span className={`status-badge ${task.status}`}>
                  {task.status}
                </span>
              </div>
              <p>{task.description}</p>
              <p className="muted">Priority: {task.priority}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProjectDetails;
