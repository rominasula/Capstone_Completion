import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [newProj, setNewProj] = useState({ name: "", description: "" });

  useEffect(() => {
    api.get("/projects").then((res) => setProjects(res.data));
  }, []);

  const createProject = async (e) => {
    e.preventDefault();
    const res = await api.post("/projects", newProj);
    setProjects([...projects, res.data]);
  };

  return (
    <div className="page">
      <h2>Your Projects</h2>

      <form className="create-form" onSubmit={createProject}>
        <input
          placeholder="Project Name"
          onChange={(e) => setNewProj({ ...newProj, name: e.target.value })}
        />
        <input
          placeholder="Description"
          onChange={(e) =>
            setNewProj({ ...newProj, description: e.target.value })
          }
        />
        <button>Create</button>
      </form>

      <div className="project-grid">
        {projects.map((p) => (
          <ProjectCard key={p._id} project={p} />
        ))}
      </div>
    </div>
  );
}
