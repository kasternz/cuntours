/**
 * Handles Vercel Blob CLIENT uploads: the browser gets a short-lived token
 * from here, then uploads the file bytes directly to Vercel Blob — never
 * through our own serverless function. This is required for any file over
 * ~4.5 MB, since Vercel functions reject larger request bodies outright
 * (FUNCTION_PAYLOAD_TOO_LARGE), and phone photos routinely exceed that.
 */
import { handleUpload } from "@vercel/blob/client";
import { auth } from "../../src/lib/auth/server";
import { isAllowedAdminEmail } from "../../src/lib/auth/admin-allowlist.server";

interface BlobUploadEvent {
  url: URL;
  req: Request;
}

export default async function blobUploadMiddleware(
  event: BlobUploadEvent,
  next: () => unknown | Promise<unknown>,
): Promise<unknown> {
  if (event.url.pathname !== "/api/blob-upload") return next();

  const session = await auth.api.getSession({ headers: event.req.headers });
  if (!isAllowedAdminEmail(session?.user?.email)) {
    return new Response(JSON.stringify({ error: "Not authorized" }), {
      status: 403,
      headers: { "content-type": "application/json" },
    });
  }

  const body = (await event.req.json()) as Parameters<typeof handleUpload>[0]["body"];
  try {
    const result = await handleUpload({
      request: event.req,
      body,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
        maximumSizeInBytes: 5 * 1024 * 1024,
        addRandomSuffix: true,
      }),
    });
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (err) {
    console.error("[blob-upload] failed:", err);
    return new Response(JSON.stringify({ error: "Upload failed" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }
}
