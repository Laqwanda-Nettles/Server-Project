import { Redis } from "@upstash/redis";
import { randomUUID } from "crypto";

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { token } = req.query;
  if (!token) {
    return res.status(400).json({ error: "Token is required" });
  }

  try {
    const email = await redis.get(`magic_token:${token}`);

    if (!email) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    const sessionToken = randomUUID();
    await redis.set(`session:${email}`, sessionToken, { ex: 3600 });

    await redis.del(`magic_token:${email}`);

    res.status(200).json({ success: true, sessionToken });
  } catch (error) {
    console.error("Error validating token: ", error);
    res.status(500).json({ error: "Error validating token" });
  }
}
