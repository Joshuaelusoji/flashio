// src/config/mailer.js
import dotenv from "dotenv";
dotenv.config();

import sgMail from "@sendgrid/mail";

// Validate API key early
if (!process.env.SENDGRID_API_KEY) {
  console.error("❌ SENDGRID_API_KEY is missing in environment variables");
} else {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  console.log("✅ SendGrid initialized");
}

// Validate sender email
if (!process.env.EMAIL_FROM) {
  console.error("❌ EMAIL_FROM is not set in environment variables");
}

/**
 * Send Email Utility
 */
export const sendEmail = async ({ to, subject, html }) => {
  try {
    console.log("🚀 Preparing to send email...");
    console.log("📨 To:", to);
    console.log("📤 From:", process.env.EMAIL_FROM);

    const msg = {
      to,
      from: process.env.EMAIL_FROM, // DO NOT fallback to gmail silently
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