import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "./auth/middleware";
import type { Tour } from "./tours";

/** Public — every route that shows tours calls this via its loader. */
export const getToursFn = createServerFn({ method: "GET" }).handler(async () => {
  const { listToursDb } = await import("./tours.server");
  return listToursDb();
});

async function requireAdmin() {
  const { getSessionUser } = await import("./auth/verify.server");
  const { isAllowedAdminEmail } = await import("./auth/admin-allowlist.server");
  const user = await getSessionUser();
  if (!isAllowedAdminEmail(user?.email)) {
    throw new Error("Not authorized");
  }
}

export const adminSaveTourFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: { tour: Tour; sortOrder?: number }) => data)
  .handler(async ({ data }) => {
    await requireAdmin();
    const { upsertTourDb, nextSortOrder } = await import("./tours.server");
    const sortOrder = data.sortOrder ?? (await nextSortOrder());
    await upsertTourDb(data.tour, sortOrder);
    return { ok: true as const };
  });

export const adminDeleteTourFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    await requireAdmin();
    const { deleteTourDb } = await import("./tours.server");
    await deleteTourDb(data.slug);
    return { ok: true as const };
  });
