import dotenv from "dotenv";
dotenv.config();
import express from "express";
import ImageKit from "imagekit";
import cors from "cors";
import mongoose from "mongoose";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

const port = process.env.PORT || 3000;
const app = express();

app.use(cors({ origin: process.env.CLIENT_URL ,credentials:true,}));
app.use(express.json());

// Connect to MongoDB
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
};

// Chat schema
const chatSchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Chat = mongoose.model("Chat", chatSchema);

// ImageKit setup
const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGE_KIT_ENDPOINT, 
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
});

// ImageKit auth route
app.get("/api/upload", (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
});

app.get("/api/test",ClerkExpressRequireAuth(),(req,res)=>{
  res.send("sucess")
})
// Save chat to MongoDB
app.post("/api/chats",
  ClerkExpressRequireAuth(),
   async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Text is required" });

  try {
    const newChat = new Chat({ text });
    await newChat.save();
    res.status(201).json({ message: "Chat saved", chat: newChat });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save chat" });
  }
});

app.listen(port, () => {
  connect();
  console.log(`Server is running on port ${port}`);
});
