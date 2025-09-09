import express from "express";
import cors from "cors";
import shameRoutes from "./routes/shameRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

const app = express();

/* ---------- CORS ---------- */
const allowed = new Set([
  "http://localhost:5173",
  "https://shameaiapp.netlify.app",
  "https://your-custom-domain.com",
]);

const corsOptions = {
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);          // server-to-server, curl, health checks
    if (allowed.has(origin)) return cb(null, true);
    return cb(null, false);                       // silent deny so preflight doesn't error
  },
  methods: ["GET","HEAD","PUT","PATCH","POST","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"],
  credentials: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
/* -------------------------- */

app.use(express.json());

// Routes
app.use("/api/shame", shameRoutes);
app.use("/api/ai", aiRoutes);

// Root
app.get("/", (_req, res) => {
  res.send("ShameApp API is running...");
});

export default app;
