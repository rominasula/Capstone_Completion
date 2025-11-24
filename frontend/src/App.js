import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Projects from "./pages/Projects";
import CreateProject from "./pages/CreateProject";
import ProjectDetails from "./pages/ProjectDetails";
import EditProject from "./pages/EditProject"; // if exists

import Navbar from "./components/Navbar";

import "./styles.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />

        <Routes>
          {/* Home → your Projects page */}
          <Route path="/" element={<Projects />} />

          {/* Correct routes */}
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/new" element={<CreateProject />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/projects/:id/edit" element={<EditProject />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Old route alias (optional) */}
          <Route path="/create-project" element={<CreateProject />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
