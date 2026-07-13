// routes/user.js
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";
import User from "../models/User.js";

const router = express.Router();

router.post("/avatar/upload", authMiddleware, upload.single("photo"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const user = await User.findByPk(req.user.id);
    user.profileImageUrl = req.file.path;
    await user.save();

    res.json({ message: "Photo updated", profileImageUrl: user.profileImageUrl });
  } catch (err) {
    console.error("Upload avatar error:", err);
    res.status(500).json({ message: "Failed to upload photo" });
  }
});

export default router;