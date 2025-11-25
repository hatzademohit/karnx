import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { token, role, permissions } = await req.json();

    const res = NextResponse.json({ ok: true });

    const common = {
      httpOnly: true,
      secure: true,
      sameSite: "lax" as const,
      path: "/",
      // maxAge: 60 * 60, // 1 hour
    };

    if (token) {
      res.cookies.set("karnx_token", token, common);
    }
    if (typeof role === "string") {
      res.cookies.set("karnx_role", role, common);
    }
    res.cookies.set("karnx_permissions", JSON.stringify(Array.isArray(permissions) ? permissions : []), common);

    return res;
  } catch (e) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
