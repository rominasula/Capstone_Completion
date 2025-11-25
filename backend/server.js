import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";
import taskRoutes from "./routes/taskRoutes.js";

import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/project.js";

dotenv.config();
connectDB();

const app = express();

// FIXED CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
