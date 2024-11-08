import { Redis } from "@upstash/redis";
import { Resend } from "resend";

const API_KEY = process.env.RESEND_API_KEY;

// Initialize Redis and Resend
const redis = Redis.fromEnv();
const resend = new Resend(API_KEY);

export default async function handler(req, res) {
  try {
    // Ensures handler only accepts POST requests
    if (req.method !== "POST") {
      return res
        .status(405)
        .json({ success: false, message: "Method Not Allowed" });
    }

    // Get the message and email from the request body
    const { message, email, subject } = req.body;

    if (!message || !email) {
      return res.status(400).json({ error: "Message and email are required" });
    }

    // Send email with Resend
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: subject || "No Subject",
      text: message,
    });

    // Store the latest message in Redis
    await redis.rpush("messages", message);

    // Send a success response
    res.status(200).json({
      success: true,
      message: "Email sent and message stored!",
    });
  } catch (error) {
    console.error("Error in send-storage endpoint: ", error);
    res.status(500).json({
      success: false,
      message: "Error sending email or storing message",
    });
  }
}
