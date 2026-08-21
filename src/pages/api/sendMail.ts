import type { NextApiRequest, NextApiResponse } from "next";
import { createTransport } from "nodemailer";
import { validateContactForm } from "@/lib/contactValidation";

type ResponseData = { success: boolean; error?: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  const validation = validateContactForm(req.body);
  if (!validation.valid || !validation.data) {
    return res
      .status(400)
      .json({ success: false, error: validation.error ?? "Invalid input" });
  }

  const { mailName, mailFrom, mailTxt } = validation.data;

  if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
    return res
      .status(500)
      .json({ success: false, error: "Mail service is not configured" });
  }

  try {
    const transporter = createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.MAIL_FROM ?? process.env.MAIL_USER,
      to: process.env.MAIL_TO,
      replyTo: mailFrom,
      subject: `${mailName}様（${mailFrom}）からお問い合わせ`,
      text: mailTxt,
    });

    return res.status(200).json({ success: true });
  } catch {
    return res
      .status(500)
      .json({ success: false, error: "Failed to send email" });
  }
}
