/**
 * Mounts Better Auth's own HTTP handler at /api/auth/* — sign-in, sign-up,
 * sign-out, get-session, etc. all live under this one path. Without this,
 * the client (`authClient`, `useSession()`) has nothing to talk to: every
 * call 404s even though server-side calls like `auth.api.signUpEmail`
 * (used by the one-time admin setup) still work, since those never go
 * through HTTP at all.
 *
 * Registered as global h3 middleware because vite.config.ts sets
 * `serverDir: "./server"` (see server/middleware/grok-pwa.ts for the same
 * pattern) — Nitro auto-scans this directory.
 */
import { auth } from "../../src/lib/auth/server";

interface AuthMiddlewareEvent {
  url: URL;
  req: Request;
}

export default async function authApiMiddleware(
  event: AuthMiddlewareEvent,
  next: () => unknown | Promise<unknown>,
): Promise<unknown> {
  if (!event.url.pathname.startsWith("/api/auth/")) return next();
  return auth.handler(event.req);
}
