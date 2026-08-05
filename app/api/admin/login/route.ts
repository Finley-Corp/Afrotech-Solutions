import { NextResponse } from "next/server";
import { createAdminSessionCookie, getAdminPassword } from "@/lib/admin-auth";

export async function POST(request: Request) {
  try {
    const expected = getAdminPassword();
    if (!expected) {
      console.error("[admin/login] ADMIN_PASSWORD is not configured");
      return NextResponse.json({ error: "Admin login is not configured" }, { status: 503 });
    }

    const body = await request.json();
    const submitted = String(body?.password ?? "").trim();

    if (!submitted || submitted !== expected) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const res = NextResponse.json({ ok: true });
    const session = createAdminSessionCookie();
    res.cookies.set(session.name, session.value, session.options);
    return res;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
