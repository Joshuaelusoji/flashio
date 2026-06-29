import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import dotenv from "dotenv";
import User from "../models/User.js";
import { sendEmail } from "../config/mailer.js";

dotenv.config();

const router = express.Router();

/* ============================
   REGISTER
============================ */
router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password, phone } = req.body;

  if (!firstName || !lastName || !email || !password || !phone) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: "Password must be at least 8 characters" });
  }

  try {
    const normalizedEmail = email.toLowerCase();

    const existingUser = await User.findOne({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      if (existingUser.verified) {
        return res.status(400).json({ message: "User already exists" });
      }

      await existingUser.destroy();
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const rawToken = crypto.randomBytes(32).toString("hex");
    const emailTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const user = await User.create({
      firstName,
      lastName,
      email: normalizedEmail,
      phone,
      passwordHash,
      verified: false,
      emailToken: rawToken,
      emailTokenExpiry,
    });

    const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${rawToken}`;

    await sendEmail({
      to: user.email,
      subject: "Verify your Flashio account",
      html: `
        <div style="font-family: Arial">
          <h2>Verify your account</h2>
          <p>Click the button below to verify your email:</p>
          <a href="${verificationLink}"
             style="display:inline-block;padding:10px 16px;background:#FF4500;color:#fff;text-decoration:none;border-radius:6px;">
            Verify Email
          </a>
        </div>
      `,
    });

    return res.status(201).json({
      message: "Signup successful! Check your email/spam to verify your account.",
    });

  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return res.status(500).json({
      message: "Something went wrong. Please try again.",
    });
  }
});

/* ============================
   VERIFY EMAIL
============================ */
router.get("/verify-email", async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ message: "Invalid verification link." });
  }

  try {
    const user = await User.findOne({
      where: { emailToken: token },
    });

    if (!user) {
      return res.status(404).json({ message: "Invalid or used link." });
    }

    if (user.verified) {
      return res.status(200).json({ message: "Email already verified." });
    }

    if (new Date() > new Date(user.emailTokenExpiry)) {
      return res.status(410).json({ message: "Verification link expired." });
    }

    user.verified = true;
    user.emailToken = null;
    user.emailTokenExpiry = null;

    await user.save();

    return res.status(200).json({
      message: "Email verified successfully",
    });

  } catch (err) {
    console.error("VERIFY ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

/* ============================
   LOGIN
============================ */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required for Sign in" });
  }

  try {
    const user = await User.unscoped().findOne({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    if (!user.verified) {
      return res.status(403).json({ message: "Please verify your email first" });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      message: "Signin successful ✅",
      token,                  // ← sent in body, saved to localStorage on frontend
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

/* ============================
   ME
============================ */
router.get("/me", async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1]; // expects "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.id, {
      attributes: ["id", "firstName", "lastName", "email", "phone", "role"],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({ user });

  } catch (err) {
    console.error("ME ERROR:", err);
    return res.status(401).json({ message: "Invalid or expired session" });
  }
});

/* ============================
   LOGOUT
============================ */
router.post("/logout", (req, res) => {
  // With localStorage, logout is handled entirely on the frontend
  // by removing the token. This endpoint is kept for a clean API.
  return res.json({ message: "Logged out successfully" });
});

export default router;