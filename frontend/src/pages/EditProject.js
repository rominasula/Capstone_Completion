import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

export default function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const load = async () => {
      const res = await api.get(`/projects/${id}`);
      setName(res.data.name);
      setDescription(res.data.description);
    };
    load();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.put(`/projects/${id}`, { name, description });
    navigate("/projects");
  };

  return (
    <div className="form-container">
      <h2>Edit Project</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Project Name"
          required
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Project Description"
        />

        <button className="btn primary">Save Changes</button>
      </form>
    </div>
  );
}
