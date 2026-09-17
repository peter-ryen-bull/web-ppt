export const AUTH_COOKIE = "ppt-session";
export const AUTH_USER = "peterbull";
export const AUTH_PASSWORD = "raxsa3-burgeh-jiKkyv";
export const AUTH_TOKEN = "ppt-session-v2-peterbull";

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "::1", "0.0.0.0"]);

export function isLocalHostname(hostname: string): boolean {
  return LOCAL_HOSTS.has(hostname.toLowerCase());
}

export function isSafeRedirectPath(path: string): boolean {
  return path.startsWith("/") && !path.startsWith("//") && !path.includes("\\");
}

function bytesEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export function credentialsMatch(username: string, password: string): boolean {
  return bytesEqual(username, AUTH_USER) && bytesEqual(password, AUTH_PASSWORD);
}

export function sessionCookieOptions(secure: boolean) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  };
}
