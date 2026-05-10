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

  const normalizedEmail = email.toLowerCase();

  try {
    const existingUser = await User.findOne({ where: { email: normalizedEmail } });

    if (existingUser) {
      if (existingUser.verified) {
        return res.status(400).json({ message: "User already exists" });
      } else {
        await existingUser.destroy();
      }
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

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

    const verificationLink = process.env.NODE_ENV === "production"
      ? `${process.env.BACKEND_URL}/api/auth/verify-email?token=${rawToken}`
      : `http://localhost:${process.env.PORT || 5000}/api/auth/verify-email?token=${rawToken}`;

    try {
      await sendEmail({
        to: user.email,
        subject: "Verify your Flashio account",
        html: `<p>Verify your account: ${verificationLink}</p>`,
      });
    } catch (emailErr) {
      console.error("EMAIL SEND FAILED:", emailErr);
      return res.status(201).json({
        message:
          "Account created, but email failed. Please try again or contact support.",
      });
    }

    return res.status(201).json({
      message: "Signup successful! Please check your email to verify your account.",
    });

  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return res.status(500).json({ message: "Something went wrong. Please try again." });
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
    const user = await User.findOne({ where: { emailToken: token } });

    if (!user) {
      return res.status(404).json({ message: "Invalid or used link." });
    }

    if (user.verified) {
      return res.status(200).json({ message: "Email already verified." });
    }

    if (!user.emailTokenExpiry || new Date() > new Date(user.emailTokenExpiry)) {
      return res.status(410).json({ message: "Link expired." });
    }

    user.verified = true;
    user.emailToken = null;
    user.emailTokenExpiry = null;
    await user.save();

    return res.status(200).json({ message: "Email verified successfully" });

  } catch (err) {
    console.error("VERIFY ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

/* ============================
   LOGIN (COOKIE-BASED JWT)
============================ */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const user = await User.findOne({
      where: { email: email.toLowerCase() },
      attributes: { include: ["passwordHash"] }
    });

    if (!user)
      return res.status(404).json({ message: "User not found" });

    if (!user.verified)
      return res.status(403).json({ message: "Please verify your email first" });

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ STORE TOKEN IN HTTPONLY COOKIE
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      message: "Login successful",
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
    return res.status(500).json({ message: "Something went wrong. Please try again." });
  }
});

/* ============================
   LOGOUT (NEW)
============================ */
router.post("/logout", (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    return res.json({ message: "Logged out successfully" });

  } catch (err) {
    console.error("LOGOUT ERROR:", err);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;