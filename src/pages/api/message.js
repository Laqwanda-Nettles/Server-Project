import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  try {
    // Get the message from query parameters
    const { message } = req.query;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Store the message in Redis with a unique key
    await redis.rpush("messages", message);

    // Return a success response
    res
      .status(200)
      .json({ success: true, message: "Message stored sucessfully!" });
  } catch (error) {
    console.error("Error storing message: ", error);
    res.status(500).json({ success: false, message: "Error storing message" });
  }
}
