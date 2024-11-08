import { Redis } from "@upstash/redis";
import { Resend } from "resend";

const API_KEY = process.env.RESEND_API_KEY;

// Initialize Redis and Resend
const redis = Redis.fromEnv();
const resend = new Resend(API_KEY);

export default async function handler(req, res) {
  try {
    const { message, email } = req.query;

    if (!message || !email) {
      return res.status(400).json({ error: "Message and email are required" });
    }

    // Send email with Resend
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "New Message Recieved",
      text: `You recieved a new message: ${message}`,
    });

    // Store the latest message in Redis
    await redis.set("latest_message", message);

    // Send a success response
    res
      .status(200)
      .json({
        success: true,
        message: "Email sent and latest message stored!",
      });
  } catch (error) {
    console.error("Error in send-storage endpoint: ", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error sending email or storing message",
      });
  }
}
