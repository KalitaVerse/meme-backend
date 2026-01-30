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


// POST MEME
router.post("/", async (req, res) => {
  try {
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


export default router;
