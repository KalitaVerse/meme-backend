import mongoose from "mongoose";

const memeSchema = new mongoose.Schema({
  title: String,
  imageUrl: String,
  category: String,
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Meme", memeSchema);
