// routes/shameRoutes.js
import express from 'express';
import { createShame, getAllShames, deleteShame } from "../controllers/shameController.js";


const router = express.Router();

router.post("/", createShame);
router.get("/", getAllShames);
router.delete("/:id", deleteShame); // <-- add this

export default router;




