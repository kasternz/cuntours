import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "./auth/middleware";

const MAX_BYTES = 8 * 1024 * 1024; // 8 MB

export const uploadImageFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: { filename: string; contentType: string; base64: string }) => data)
  .handler(async ({ data }) => {
    const { getSessionUser } = await import("./auth/verify.server");
    const { isAllowedAdminEmail } = await import("./auth/admin-allowlist.server");
    const user = await getSessionUser();
    if (!isAllowedAdminEmail(user?.email)) {
      return { ok: false as const, reason: "not_authorized" as const };
    }

    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) {
      return { ok: false as const, reason: "missing_token" as const };
    }

    const bytes = Buffer.from(data.base64, "base64");
    if (bytes.byteLength > MAX_BYTES) {
      return { ok: false as const, reason: "too_large" as const };
    }

    try {
      const { put } = await import("@vercel/blob");
      const safeName = data.filename.replace(/[^a-zA-Z0-9.\-_]/g, "-");
      const result = await put(`tours/${Date.now()}-${safeName}`, bytes, {
        access: "public",
        contentType: data.contentType,
        token,
      });
      return { ok: true as const, url: result.url };
    } catch (err) {
      console.error("[upload] Vercel Blob upload failed:", err);
      return { ok: false as const, reason: "upload_failed" as const };
    }
  });
