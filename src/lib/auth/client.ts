import { createAuthClient } from "better-auth/react";

/** Better Auth client for this app — talks to `/api/auth/*` on this same domain. */
export const authClient = createAuthClient();

export async function signOut(redirectTo = "/"): Promise<void> {
  await authClient.signOut();
  if (typeof window !== "undefined") window.location.href = redirectTo;
}
