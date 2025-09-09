// app.js
import express from 'express';
import cors from 'cors';
import shameRoutes from './routes/shameRoutes.js';
import aiRoutes from "./routes/aiRoutes.js";

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Routes
app.use('/api/shame', shameRoutes);
app.use("/api/ai", aiRoutes);

// Root
app.get('/', (req, res) => {
  res.send('ShameApp API is running...');
});

export default app;
