import { getRequest } from "@tanstack/react-start/server";
import { auth } from "./server";

/**
 * Server-side session resolution (server-only). The session cookie is sent
 * with every request to this app's own origin, so we resolve straight from
 * request cookies via `auth.api.getSession` — no client-minted token needed.
 * Never trust a client-supplied user id — only the result of this call.
 */

export type VerifiedUser = { id: string; email: string | null };

export async function getSessionUser(): Promise<VerifiedUser | null> {
  const request = getRequest();
  if (!request) return null;
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.user) return null;
  return { id: session.user.id, email: session.user.email ?? null };
}

/** Thrown by `requireUserId` when the caller has no valid session. */
export class UnauthorizedError extends Error {
  readonly status = 401;
  constructor() {
    super("Unauthorized");
    this.name = "UnauthorizedError";
  }
}

/** Resolve the current user id for a server function, or throw when signed out. */
export async function requireUserId(): Promise<string> {
  const user = await getSessionUser();
  if (!user) throw new UnauthorizedError();
  return user.id;
}
