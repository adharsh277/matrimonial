import nodemailer from "nodemailer";
import { env } from "../config/env.js";

const hasSmtp = Boolean(env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS);

const transporter = hasSmtp
  ? nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_PORT === 465,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
    })
  : null;

export async function sendMail(message: { to: string; subject: string; text: string; html?: string }) {
  if (!transporter) {
    console.info("Mail skipped: SMTP not configured", message.subject);
    return;
  }

  await transporter.sendMail({
    from: env.SMTP_FROM,
    ...message,
  });
}
