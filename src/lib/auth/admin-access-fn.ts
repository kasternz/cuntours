import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "./middleware";

/** Whether the signed-in caller is on the admin allowlist. Shared by every
 * admin sub-page so the check lives in exactly one place. */
export const checkAdminAccessFn = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async () => {
    const { getSessionUser } = await import("./verify.server");
    const { isAllowedAdminEmail } = await import("./admin-allowlist.server");
    const user = await getSessionUser();
    return { authorized: isAllowedAdminEmail(user?.email) };
  });
