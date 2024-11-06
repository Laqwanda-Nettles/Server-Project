import { Resend } from "resend";

const API_KEY = process.env.RESEND_API_KEY;
const resend = new Resend(API_KEY);

export default async function handler(req, res) {
  try {
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["delivered@resend.dev"],
      subject: "Hello, does this work?",
      html: "<p>Yay it is working!</p>",
    });
    res.status(200).json({ mesage: "Email sent!" });
  } catch (error) {
    console.error("Error sending email: ", error);
    res.status(500).json({ message: "Error sending email!" });
  }
}
