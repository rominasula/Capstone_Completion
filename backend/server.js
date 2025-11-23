import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './db.js';

// ROUTES
import projectRoutes from "./routes/project.js";
import taskRoutes from "./routes/taskRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

// Test route
app.get('/', (req, res) => {
  res.json('Hello World! (from server)');
});

// Mount routes
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

// Connect DB & start server
connectDB().then(() => {
  app.listen(port, () => console.log(`Server running on port: ${port}`));
});
