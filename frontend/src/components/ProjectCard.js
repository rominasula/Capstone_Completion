import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <h3>{project.name}</h3>
      <p>{project.description}</p>

      <Link to={`/projects/${project._id}`} className="btn">
        Open Project
      </Link>
    </div>
  );
}
