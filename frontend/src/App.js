import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Projects from "./pages/Projects";
import CreateProject from "./pages/CreateProject";
import EditProject from "./pages/EditProject";
import ProjectDetails from "./pages/ProjectDetails";
import AddTask from "./pages/AddTask";

import Navbar from "./components/Navbar";
import "./styles.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />

        <Routes>
          {/* Home */}
          <Route path="/" element={<Projects />} />

          {/* Projects */}
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/new" element={<CreateProject />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/projects/:id/edit" element={<EditProject />} />

          {/* Tasks */}
          <Route path="/projects/:id/tasks/new" element={<AddTask />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
