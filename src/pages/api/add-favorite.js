import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { email, favorite, token } = req.body;
  if (!email || !favorite || !token) {
    return res
      .status(400)
      .json({ error: "Email, favorite, and token are required" });
  }

  try {
    const storedToken = await redis.get(`session:${email}`);
    if (storedToken !== token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    await redis.rpush(`favorites:${email}`, favorite);

    res.status(200).json({ success: true, message: "Favorite added" });
  } catch (error) {
    console.error("Error adding favorite: ", error);
    res.status(500).json({ error: "Error adding favorite" });
  }
}
