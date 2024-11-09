import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { email } = req.query;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    // Retrieve the favorite list for the user
    const favorites = await redis.lrange(`favorites:${email}`, 0, -1);
    res.status(200).json({ success: true, favorites });
  } catch (error) {
    console.error("Error retrieving favorites:", error);
    res.status(500).json({ error: "Error retrieving favorites" });
  }
}
