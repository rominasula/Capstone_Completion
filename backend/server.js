import 'dotenv/config'; // must be first
import express from 'express';
import cors from 'cors';
import connectDB from './db.js';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json('Hello World! (from server)');
});

// Connect to DB first, then start server
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
}).catch((err) => {
  console.error('Failed to connect to DB:', err);
});
