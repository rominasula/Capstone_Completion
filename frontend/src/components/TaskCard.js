import { Link } from "react-router-dom";

export default function TaskCard({ task }) {
  return (
    <div className="task-card">
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <small>Priority: {task.priority}</small>

      <Link
        to={`/projects/${task.projectId}/new-task?edit=${task._id}`}
        className="small-btn"
      >
        Edit
      </Link>
    </div>
  );
}
