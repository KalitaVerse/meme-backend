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
    type: {
      type: String,
      enum: ["image", "video", "template", "sound"],
      default: "image"    
    },
    likes: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Meme", memeSchema);
