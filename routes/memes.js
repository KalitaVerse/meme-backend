import express from "express";
import Meme from "../models/Meme.js";

const router = express.Router();

// GET memes
router.get("/", async (req, res) => {
  try {
    const memes = await Meme.find().sort({ _id: -1 }); 
    res.json(memes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET meme by ID
router.get("/:id", async (req, res) => {
  try {
    const meme = await Meme.findById(req.params.id);

    if (!meme) {
      return res.status(404).json({ message: "Meme not found" });
    }

    res.json(meme);
  } catch (err) {
    res.status(400).json({ error: "Invalid meme ID" });
  }
});



// POST MEME
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.imageUrl) {
      return res.status(400).json({
        error: "Title and imageUrl are required"
      });
    }

    const meme = new Meme({
      title: req.body.title,
      imageUrl: req.body.imageUrl
    });

    const savedMeme = await meme.save();
    res.status(201).json(savedMeme);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// DELETE memes
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Meme.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Meme not found" });
    }

    res.json({ message: "Meme deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: "Invalid meme ID" });
  }
});

// LIKE / UPVOTE meme
router.patch("/:id/like", async (req, res) => {
  try {
    const meme = await Meme.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!meme) {
      return res.status(404).json({ message: "Meme not found" });
    }

    res.json(meme);
  } catch (err) {
    res.status(400).json({ error: "Invalid meme ID" });
  }
});



export default router;
