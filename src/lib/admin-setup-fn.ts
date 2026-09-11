import { createServerFn } from "@tanstack/react-start";

/**
 * Creates the admin account — gated by ADMIN_SETUP_CODE so this can't be used
 * as a public sign-up page. Meant to be used exactly once. After creating
 * your account, consider removing/rotating ADMIN_SETUP_CODE in Vercel so the
 * setup form can never be used again.
 */
export const createAdminAccount = createServerFn({ method: "POST" })
  .validator((data: { email: string; password: string; name: string; setupCode: string }) => data)
  .handler(async ({ data }) => {
    const expected = process.env.ADMIN_SETUP_CODE;
    if (!expected) {
      return { ok: false as const, reason: "not_configured" as const };
    }
    if (data.setupCode !== expected) {
      return { ok: false as const, reason: "wrong_code" as const };
    }
    const { auth } = await import("./auth/server");
    try {
      await auth.api.signUpEmail({
        body: { email: data.email, password: data.password, name: data.name },
      });
      return { ok: true as const };
    } catch (err) {
      console.error("[admin-setup] signUpEmail failed:", err);
      return { ok: false as const, reason: "signup_failed" as const };
    }
  });
