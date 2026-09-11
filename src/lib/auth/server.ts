/**
 * Self-hosted Better Auth for Cuntours (server-only).
 *
 * Simple, standalone email/password auth for the one admin account — no
 * OAuth broker, no live-preview modes, no dynamic origin guessing. This app
 * always runs at one real domain, so it always uses real Postgres (via
 * DATABASE_URL) and a fixed BETTER_AUTH_URL.
 *
 * Required env vars in production:
 *   DATABASE_URL       — Postgres connection string (Neon or similar)
 *   BETTER_AUTH_URL     — e.g. https://www.cuntours.com
 *   BETTER_AUTH_SECRET  — a long random string (openssl rand -hex 32)
 *
 * NEVER import this from client code — it pulls in `pg` and server-only
 * Better Auth internals. The client uses `@/lib/auth/client`; components
 * read the user via `@/lib/auth/use-current-user`; server functions get a
 * verified id via `@/lib/auth/middleware`.
 */
import { betterAuth } from "better-auth";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { Pool } from "pg";
import { ensureDbReady, getPglite } from "../db";
import { pgliteDialect } from "./pglite-dialect";

// Kick (and share) PGLite bootstrap as soon as the auth server module loads.
void ensureDbReady();

const env = (key: string): string | undefined => {
  const value = process.env[key]?.trim();
  return value ? value : undefined;
};

const databaseUrl = env("DATABASE_URL");

/** Real Postgres when deployed, local embedded PGLite for `npm run dev`
 * without a DATABASE_URL. Both use the schema in migrations/0001_auth.sql. */
const database = databaseUrl
  ? new Pool({ connectionString: databaseUrl })
  : { dialect: pgliteDialect(() => getPglite()), type: "postgres" as const };

const LOCAL_DEV_ORIGINS = ["http://localhost:8080", "http://127.0.0.1:8080"];

// In production this MUST be the real deployed URL — Better Auth rejects
// credentialed requests (sign-in/sign-up) from origins not in this list.
const baseURL = env("BETTER_AUTH_URL") ?? "http://localhost:8080";
const trustedOrigins = [baseURL, "https://cuntours.com", "https://www.cuntours.com", ...LOCAL_DEV_ORIGINS];

// A stable secret is required so sessions survive serverless cold starts —
// generate one with `openssl rand -hex 32` and set BETTER_AUTH_SECRET in
// Vercel. The fallback below is ONLY for local dev without one configured.
const secret = env("BETTER_AUTH_SECRET") ?? "dev-only-insecure-secret-change-me";
if (databaseUrl && !env("BETTER_AUTH_SECRET")) {
  console.error(
    "[auth] DATABASE_URL is set but BETTER_AUTH_SECRET is not — sessions will " +
      "invalidate on every cold start. Set BETTER_AUTH_SECRET in Vercel.",
  );
}

export const auth = betterAuth({
  baseURL,
  secret,
  database,
  trustedOrigins,
  emailAndPassword: { enabled: true },
  session: { cookieCache: { enabled: true, maxAge: 300 } },
  plugins: [tanstackStartCookies()],
});
