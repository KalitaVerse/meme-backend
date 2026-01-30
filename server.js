import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import memeRoutes from "./routes/memes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/memes", memeRoutes);

// BOOM BOOM
app.get("/", (req, res) => {
  res.send("Meme API is running 🚀");
});

//IMPORTANT: connect with timeout + fail fast
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("MongoDB connected");

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  }
}

startServer();
