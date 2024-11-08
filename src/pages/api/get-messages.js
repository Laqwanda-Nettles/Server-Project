import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const messages = await redis.lrange("messages", 0, -1);
    res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error("Error fetching messages: ", error);
    res.status(500).json({ success: false, error: "Error fetching messages" });
  }
}
