import type { ContactFormData } from "@/types/portfolio";

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm(body: unknown): {
  valid: boolean;
  data?: ContactFormData;
  error?: string;
} {
  if (!body || typeof body !== "object") {
    return { valid: false, error: "Invalid request body" };
  }

  const { mailName, mailFrom, mailTxt } = body as Record<string, unknown>;

  if (typeof mailName !== "string" || !mailName.trim()) {
    return { valid: false, error: "Name is required" };
  }
  if (mailName.trim().length > MAX_NAME_LENGTH) {
    return { valid: false, error: "Name is too long" };
  }
  if (typeof mailFrom !== "string" || !mailFrom.trim()) {
    return { valid: false, error: "Email is required" };
  }
  if (mailFrom.trim().length > MAX_EMAIL_LENGTH) {
    return { valid: false, error: "Email is too long" };
  }
  if (!EMAIL_PATTERN.test(mailFrom.trim())) {
    return { valid: false, error: "Invalid email format" };
  }
  if (typeof mailTxt !== "string" || !mailTxt.trim()) {
    return { valid: false, error: "Message is required" };
  }
  if (mailTxt.trim().length > MAX_MESSAGE_LENGTH) {
    return { valid: false, error: "Message is too long" };
  }

  return {
    valid: true,
    data: {
      mailName: mailName.trim(),
      mailFrom: mailFrom.trim(),
      mailTxt: mailTxt.trim(),
    },
  };
}
