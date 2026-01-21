import express from "express";
import Meme from "../models/Meme.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const memes = await Meme.find().sort({ createdAt: -1 });
  res.json(memes);
});

router.post("/like/:id", async (req, res) => {
  const meme = await Meme.findById(req.params.id);
  meme.likes++;
  await meme.save();
  res.json(meme);
});

router.post("/view/:id", async (req, res) => {
  const meme = await Meme.findById(req.params.id);
  meme.views++;
  await meme.save();
  res.json(meme);
});

export default router;
