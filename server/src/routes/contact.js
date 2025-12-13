import { Router } from "express";
import { z } from "zod";
import { sendViaZeptoMail } from "../mail/zeptomail.js";

const router = Router();

const ContactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  message: z.string().trim().min(2).max(1000),

  // optional honeypot (spam trap)
  website: z.string().optional(),
});

router.post("/", async (req, res) => {
  const parsed = ContactSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      ok: false,
      error: "Invalid input",
      details: parsed.error.flatten(),
    });
  }

  const { name, email, message, website } = parsed.data;

  // Honeypot: if filled, treat as bot and pretend success
  if (website && website.trim().length > 0) {
    return res.json({ ok: true });
  }

  try {
    await sendViaZeptoMail({ name, email, message });
    return res.json({ ok: true });
  } catch (e) {
    console.error("ZeptoMail send error:", e?.message || e);
    return res.status(502).json({
      ok: false,
      error: "Failed to send message",
    });
  }
});

export default router;
