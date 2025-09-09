// app.js
import express from "express";
import cors from "cors";
import shameRoutes from "./routes/shameRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

const app = express();

/* ---------- CORS (fixed) ---------- */
const allowed = new Set([
  "http://localhost:5173",
  "https://shameaiapp.netlify.app", // <-- no trailing slash
  "https://your-custom-domain.com",
]);

const corsOptions = {
  origin: (origin, cb) => {
    // allow server-to-server / curl / health checks (no Origin header)
    if (!origin) return cb(null, true);
    if (allowed.has(origin)) return cb(null, true);
    // silently deny (no error) so preflight just doesn't get ACAO
    return cb(null, false);
  },
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false, // set true only if you actually use cookies/auth
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
// handle preflight globally
app.options("*", cors(corsOptions));
/* ---------------------------------- */

app.use(express.json());

// Routes
app.use("/api/shame", shameRoutes);
app.use("/api/ai", aiRoutes);

// Root
app.get("/", (req, res) => {
  res.send("ShameApp API is running...");
});

export default app;
