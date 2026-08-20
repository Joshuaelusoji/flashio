// src/config/mailer.js
import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);
const EMAIL_FROM = process.env.EMAIL_FROM;

// Validate environment variables
if (!process.env.RESEND_API_KEY) {
  console.error("❌ RESEND_API_KEY is missing in environment variables");
} else {
  console.log("✅ Resend initialized");
}

if (!EMAIL_FROM) {
  console.error("❌ EMAIL_FROM is not set in environment variables");
}

/**
 * Send Email Utility
 */
export const sendEmail = async ({ to, subject, html }) => {
  try {
    console.log("🚀 Preparing to send email...");
    console.log("📨 To:", to);
    console.log("📤 From:", EMAIL_FROM);

    const { data, error } = await resend.emails.send({
      from: EMAIL_FROM,
      to,
      subject,
      html,
    });

    if (error) {
      console.error("❌ Resend error:", error);
      throw new Error(error.message);
    }

    console.log("✅ Email sent successfully");
    console.log("📦 Resend response:", data);

    return data;
  } catch (error) {
    console.error("❌ Email failed:", error);
    throw error;
  }
};