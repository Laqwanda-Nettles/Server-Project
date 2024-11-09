import { Redis } from "@upstash/redis";
import { Resend } from "resend";
import { randomUUID } from "crypto";

const redis = Redis.fromEnv();
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const token = randomUUID();
    await redis.set(`magic_token:${token}`, email, { ex: 900 });

    const loginUrl = `http://localhost:3000/login?token=${token}`;
    await resend.emails.send({
      from: "YourApp <noreply@yourapp.com>",
      to: email,
      subject: "Your Magic Login Link",
      text: `Click the link to log in: ${loginUrl}`,
    });

    res.status(200).json({ success: true, message: "Magic link sent" });
  } catch (error) {
    console.error("Error sending magic link: ", error);
    res.status(500).json({ error: "Error sending magic link" });
  }
}
