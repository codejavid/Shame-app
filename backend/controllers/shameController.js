// controllers/shameController.js
import Shame from '../models/Shame.js';

// POST /api/shame
export const createShame = async (req, res) => {
  try {
    const { text, tags, isAnonymous } = req.body;
    const newShame = await Shame.create({ text, tags, isAnonymous });
    res.status(201).json(newShame);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET /api/shame
export const getAllShames = async (req, res) => {
  try {
    const shames = await Shame.find().sort({ createdAt: -1 });
    res.json(shames);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteShame = async (req, res) => {
  try {
    const { id } = req.params;
    const removed = await Shame.findByIdAndDelete(id);
    if (!removed) return res.status(404).json({ message: "Not found" });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
