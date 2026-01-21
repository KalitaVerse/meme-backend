import mongoose from "mongoose";

const memeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  }
});

export default mongoose.model("Meme", memeSchema);
