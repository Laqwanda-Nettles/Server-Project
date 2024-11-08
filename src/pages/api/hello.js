import { Redis } from "@upstash/redis";

// Initialize Redis
const redis = Redis.fromEnv();

export default async function handler(req, res) {
  await redis.set("item", "peaches");

  // Fetch data from Redis
  const result = await redis.get("item");
  res.status(200).json({ result });
}
