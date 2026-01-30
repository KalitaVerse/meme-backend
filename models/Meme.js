import mongoose from "mongoose";

const memeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    },
    likes: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export default mongoose.model("Meme", memeSchema);
