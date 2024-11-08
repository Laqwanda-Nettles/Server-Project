import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  try {
    // Increment the counter in Redis
    const count = await redis.incr("counter");

    // Return the updated count as JSON
    res.status(200).json({ count });
  } catch (error) {
    console.error("Error incrementing counter: ", error);
    res.status(500).json({ message: "Error incrementing counter" });
  }
}
