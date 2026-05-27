// src/config/mailer.js
import dotenv from "dotenv";
dotenv.config();

import sgMail from "@sendgrid/mail";

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const EMAIL_FROM = process.env.EMAIL_FROM;

// Validate API key early
if (!SENDGRID_API_KEY) {
  console.error("❌ SENDGRID_API_KEY is missing in environment variables");
} else {
  sgMail.setApiKey(SENDGRID_API_KEY);
  console.log("✅ SendGrid initialized");
}

// Validate sender email
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

    const msg = {
      to,
      from: EMAIL_FROM, // DO NOT fallback to gmail silently
      subject,
      html,
    };

    const response = await sgMail.send(msg);

    console.log("✅ Email sent successfully");
    console.log("📦 SendGrid response:", response[0]?.statusCode);

    return response;
  } catch (error) {
    console.error("❌ Email failed:");

    if (error.response) {
      console.error("📛 Status Code:", error.response.statusCode);
      console.error("📛 Body:", error.response.body);
    } else {
      console.error(error);
    }

    throw error;
  }
};