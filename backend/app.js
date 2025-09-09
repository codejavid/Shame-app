// app.js
import express from 'express';
import cors from 'cors';
import shameRoutes from './routes/shameRoutes.js';
import aiRoutes from "./routes/aiRoutes.js";

const app = express();

// Middleware
const allowed = [
  "http://localhost:5173",
  "https://shameaiapp.netlify.app/",
  "https://your-custom-domain.com"
];

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowed.includes(origin)) return cb(null, true);
    cb(new Error("Not allowed by CORS"));
  }
}));

app.use(express.json());

// Routes
app.use('/api/shame', shameRoutes);
app.use("/api/ai", aiRoutes);

// Root
app.get('/', (req, res) => {
  res.send('ShameApp API is running...');
});

export default app;
