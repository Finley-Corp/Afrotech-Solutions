import { Resend } from "resend";

export function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key?.trim()) return null;
  return new Resend(key);
}

/** Verified sender in Resend (default works for testing with onboarding@resend.dev) */
export function getFromEmail(): string {
  return process.env.RESEND_FROM_EMAIL?.trim() || "Afrotech <onboarding@resend.dev>";
}

/** Primary owner / ops inbox(es) for form leads — comma- or semicolon-separated for multiple. */
export function getOwnerNotifyEmails(): string[] {
  const owner =
    process.env.RESEND_OWNER_EMAIL?.trim() || process.env.RESEND_NOTIFY_EMAIL?.trim() || "";
  const fallback = "sales@afrotech-solutions.com";
  const raw = owner || fallback;
  return raw
    .split(/[,;]+/)
    .map((e) => e.trim())
    .filter(Boolean);
}

/** @deprecated use getOwnerNotifyEmails — kept for callers expecting one string */
export function getNotifyEmail(): string {
  const list = getOwnerNotifyEmails();
  return list[0] ?? "sales@afrotech-solutions.com";
}

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Human-readable message from Resend SDK error objects (for logs / API responses). */
export function resendErrorMessage(err: unknown): string {
  if (err == null) return "unknown error";
  if (typeof err === "string") return err;
  if (typeof err === "object") {
    const o = err as Record<string, unknown>;
    if (typeof o.message === "string") return o.message;
    if (typeof o.error === "string") return o.error;
  }
  try {
    return JSON.stringify(err);
  } catch {
    return String(err);
  }
}
