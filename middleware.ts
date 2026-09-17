import { NextResponse, type NextRequest } from "next/server";
import {
  AUTH_COOKIE,
  AUTH_TOKEN,
  isLocalHostname,
  isSafeRedirectPath,
} from "./lib/auth";

const PUBLIC_PATHS = new Set(["/login", "/api/login"]);

export function middleware(request: NextRequest) {
  if (isLocalHostname(request.nextUrl.hostname)) return NextResponse.next();

  const { pathname, search } = request.nextUrl;
  const hasSession = request.cookies.get(AUTH_COOKIE)?.value === AUTH_TOKEN;

  if (pathname === "/login") {
    if (!hasSession) return NextResponse.next();
    const from = request.nextUrl.searchParams.get("from");
    const dest = from && isSafeRedirectPath(from) ? from : "/";
    return NextResponse.redirect(new URL(dest, request.url));
  }

  if (PUBLIC_PATHS.has(pathname) || hasSession) return NextResponse.next();

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Ikke innlogget." }, { status: 401 });
  }

  const login = new URL("/login", request.url);
  const from = `${pathname}${search}`;
  if (from !== "/") login.searchParams.set("from", from);
  return NextResponse.redirect(login);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
