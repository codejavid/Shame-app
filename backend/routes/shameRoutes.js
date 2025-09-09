import { Router } from "express";
import { createShame, getAllShames, deleteShame } from "../controllers/shameController.js";

const router = Router();

router.post("/", createShame);
router.get("/", getAllShames);
router.delete("/:id", deleteShame);

export default router;
