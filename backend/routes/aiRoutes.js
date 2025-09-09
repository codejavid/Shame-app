import { Router } from "express";
import { suggestAI } from "../controllers/aiController.js";

const router = Router();

router.post("/suggest", suggestAI);

export default router;
