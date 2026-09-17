import { NextResponse } from "next/server";
import {
  AUTH_COOKIE,
  AUTH_TOKEN,
  credentialsMatch,
  isSafeRedirectPath,
  sessionCookieOptions,
} from "@/lib/auth";

export const dynamic = "force-dynamic";

type Body = {
  username?: unknown;
  password?: unknown;
  from?: unknown;
};

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Ugyldig JSON." }, { status: 400 });
  }

  const username = typeof body.username === "string" ? body.username : "";
  const password = typeof body.password === "string" ? body.password : "";
  if (!credentialsMatch(username, password)) {
    return NextResponse.json(
      { error: "Feil brukernavn eller passord." },
      { status: 401 }
    );
  }

  const from = typeof body.from === "string" ? body.from : "/";
  const dest = isSafeRedirectPath(from) ? from : "/";
  const secure =
    req.headers.get("x-forwarded-proto") === "https" ||
    new URL(req.url).protocol === "https:";

  const res = NextResponse.json({ ok: true, from: dest });
  res.cookies.set(AUTH_COOKIE, AUTH_TOKEN, sessionCookieOptions(secure));
  return res;
}
