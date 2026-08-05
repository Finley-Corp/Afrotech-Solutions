import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE = "afrotech_admin_session";

export function getAdminPassword(): string | null {
  const value = process.env.ADMIN_PASSWORD?.trim();
  return value || null;
}

export function getAdminSessionSecret(): string | null {
  const value =
    process.env.ADMIN_SESSION_SECRET?.trim() || process.env.ADMIN_PASSWORD?.trim();
  return value || null;
}

function sessionToken(): string {
  const secret = getAdminSessionSecret();
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET or ADMIN_PASSWORD is not configured");
  }
  return createHmac("sha256", secret).update("afrotech-admin-v1").digest("hex");
}

export function createAdminSessionCookie(): { name: string; value: string; options: Record<string, unknown> } {
  return {
    name: ADMIN_SESSION_COOKIE,
    value: sessionToken(),
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    },
  };
}

export async function isAdminAuthenticated(): Promise<boolean> {
  if (!getAdminSessionSecret()) return false;

  const cookieStore = await cookies();
  const value = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!value) return false;

  try {
    const expected = sessionToken();
    const a = Buffer.from(value);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}
