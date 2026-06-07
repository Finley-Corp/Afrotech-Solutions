import { NextResponse } from "next/server";
import { createAdminSessionCookie } from "@/lib/admin-auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const submitted = String(body?.password ?? "").trim();
    const expected = (process.env.ADMIN_PASSWORD ?? "afrotech2026").trim();

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
