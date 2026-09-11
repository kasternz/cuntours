import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { upload } from "@vercel/blob/client";

export function ImageUpload({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(file: File) {
    setError("");
    if (file.size > 5 * 1024 * 1024) {
      setError("La foto pesa más de 5 MB — usa una más chica.");
      return;
    }
    setUploading(true);
    try {
      // Uploads straight from the browser to Vercel Blob — never through our
      // own server — so there's no ~4.5 MB serverless body-size limit here.
      const result = await upload(`tours/${Date.now()}-${file.name}`, file, {
        access: "public",
        handleUploadUrl: "/api/blob-upload",
      });
      onChange(result.url);
    } catch {
      setError("No se pudo subir la foto. Intenta de nuevo.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      {value ? (
        <img src={value} alt="" className="mb-2 h-36 w-full rounded-[var(--radius-md)] object-cover" />
      ) : null}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void handleFile(file);
        }}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="flex h-11 w-full items-center justify-center gap-2 rounded-[var(--radius-md)] bg-surface text-sm font-medium text-ink-soft disabled:opacity-60"
      >
        <Upload size={16} />
        {uploading ? "Subiendo…" : value ? "Cambiar foto" : "Subir foto"}
      </button>
      {error ? <p className="mt-1.5 text-xs text-warn">{error}</p> : null}
    </div>
  );
}
