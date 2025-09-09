// routes/aiRoutes.js
import express from "express";
import { suggestAI } from "../controllers/aiController.js";
const router = express.Router();

router.post("/suggest", suggestAI);

export default router;
