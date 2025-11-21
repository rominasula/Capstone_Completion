import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axiosConfig";
import TaskCard from "../components/TaskCard";

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState({});
  const [tasks, setTasks] = useState([]);

  const fetchData = async () => {
    const proj = await api.get(`/projects/${id}`);
    const t = await api.get(`/projects/${id}/tasks`);
    setProject(proj.data);
    setTasks(t.data);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const updateStatus = async (taskId, newStatus) => {
    await api.put(`/tasks/update/${taskId}`, { status: newStatus });
    fetchData();
  };

  return (
    <div className="kanban-page">
      <h2>{project.name}</h2>

      <Link to={`/projects/${id}/new-task`} className="btn">
        + New Task
      </Link>

      <div className="kanban">
        {["todo", "in-progress", "done"].map((status) => (
          <div key={status} className="column">
            <h3>{status.toUpperCase()}</h3>

            {tasks
              .filter((t) => t.status === status)
              .map((t) => (
                <div key={t._id}>
                  <TaskCard task={t} />
                  <select
                    value={t.status}
                    onChange={(e) => updateStatus(t._id, e.target.value)}
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
    </div>
  );
}
