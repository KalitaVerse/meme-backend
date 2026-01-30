import express from "express";
import Meme from "../models/Meme.js";

const router = express.Router();

/* =====================================================
   GET TRENDING MEMES  (🔥 MUST BE FIRST)
   ===================================================== */
router.get("/trending", async (req, res) => {
  try {
    const memes = await Meme.find()
      .sort({ likes: -1, createdAt: -1 }) // most liked first
      .limit(20);

    res.json(memes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch trending memes" });
  }
});

/* =====================================================
   GET ALL MEMES (HOME)
   ===================================================== */
router.get("/", async (req, res) => {
  try {
    const memes = await Meme.find().sort({ createdAt: -1 });
    res.json(memes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =====================================================
   POST NEW MEME
   ===================================================== */
router.post("/", async (req, res) => {
  try {
    const { title, imageUrl } = req.body;

    if (!title || !imageUrl) {
      return res.status(400).json({
        error: "Title and imageUrl are required"
      });
    }

    const meme = new Meme({
      title,
      imageUrl,
      likes: 0
    });

    const savedMeme = await meme.save();
    res.status(201).json(savedMeme);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* =====================================================
   LIKE A MEME
   ===================================================== */
router.patch("/:id/like", async (req, res) => {
  try {
    const meme = await Meme.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!meme) {
      return res.status(404).json({ error: "Meme not found" });
    }

    res.json(meme);
  } catch (err) {
    res.status(400).json({ error: "Invalid meme ID" });
  }
});

/* =====================================================
   DELETE A MEME
   ===================================================== */
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Meme.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Meme not found" });
    }

    res.json({ message: "Meme deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: "Invalid meme ID" });
  }
});

/* =====================================================
   GET SINGLE MEME (⚠ MUST BE LAST)
   ===================================================== */
router.get("/:id", async (req, res) => {
  try {
    const meme = await Meme.findById(req.params.id);

    if (!meme) {
      return res.status(404).json({ error: "Meme not found" });
    }

    res.json(meme);
  } catch (err) {
    res.status(400).json({ error: "Invalid meme ID" });
  }
});

export default router;
