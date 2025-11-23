import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axiosConfig";
import TaskCard from "../components/TaskCard";
import "../styles.css";

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState({});
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const proj = await api.get(`/projects/${id}`);
      const t = await api.get(`/projects/${id}/tasks`);
      setProject(proj.data);
      setTasks(t.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const updateStatus = async (taskId, newStatus) => {
    await api.put(`/tasks/update/${taskId}`, { status: newStatus });
    fetchData();
  };

  return (
    <div className="jira-shell">
      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        <>
          <header className="page-header small">
            <h2>{project.name}</h2>
            <p className="muted">{project.description}</p>
            <p>
              Project Status: <strong>{project.status}</strong>
            </p>
            <Link to={`/projects/${id}/new-task`} className="btn primary">+ New Task</Link>
          </header>

          <div className="kanban">
            {["todo", "in-progress", "done"].map((status) => (
              <div key={status} className="column">
                <h4 className="column-title">{status.toUpperCase()}</h4>

                {tasks
                  .filter((t) => t.status === status)
                  .map((t) => (
                    <div key={t._id} className="task-wrap">
                      <TaskCard task={t} />
                      <select
                        value={t.status}
                        onChange={(e) => updateStatus(t._id, e.target.value)}
                        className="select-small"
                      >
                        <option value="todo">To-Do</option>
                        <option value="in-progress">In Progress</option>
                        <option value="done">Done</option>
                      </select>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
