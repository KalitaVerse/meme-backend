import express from "express";
import Meme from "../models/Meme.js";

const router = express.Router();

/* =====================================================
   GET TRENDING MEMES  (🔥 MUST BE FIRST — before /:id)
   ===================================================== */
router.get("/trending", async (req, res) => {
  try {
    const memes = await Meme.find()
      .sort({ likes: -1, createdAt: -1 })
      .limit(20);

    res.json(memes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch trending memes" });
  }
});

/* =====================================================
   IMAGES ONLY
   ===================================================== */
router.get("/images", async (req, res) => {
  try {
    const memes = await Meme.find({ type: "image" }).sort({ createdAt: -1 });
    res.json(memes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch images" });
  }
});

/* =====================================================
   VIDEOS ONLY
   ===================================================== */
router.get("/videos", async (req, res) => {
  try {
    const memes = await Meme.find({ type: "video" }).sort({ createdAt: -1 });
    res.json(memes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch videos" });
  }
});

/* =====================================================
   TEMPLATES ONLY
   ===================================================== */
router.get("/templates", async (req, res) => {
  try {
    const memes = await Meme.find({ type: "template" }).sort({ createdAt: -1 });
    res.json(memes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch templates" });
  }
});

/* =====================================================
   SOUNDS ONLY
   ===================================================== */
router.get("/sounds", async (req, res) => {
  try {
    const memes = await Meme.find({ type: "sound" }).sort({ createdAt: -1 });
    res.json(memes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch sounds" });
  }
});

/* =====================================================
   GET ALL MEMES 
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
   type defaults to "image" if not provided
   ===================================================== */
router.post("/", async (req, res) => {
  try {
    const { title, imageUrl, type } = req.body;

    if (!title || !imageUrl) {
      return res.status(400).json({
        error: "title and imageUrl are required"
      });
    }

    const validTypes = ["image", "video", "template", "sound"];
    const resolvedType = validTypes.includes(type) ? type : "image";

    const meme = new Meme({
      title,
      imageUrl,
      type: resolvedType,
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
   GET SINGLE MEME  ( MUST BE LAST — after all named routes)
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
