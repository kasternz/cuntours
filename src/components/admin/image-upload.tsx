import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { uploadImageFn } from "@/lib/upload-fn";

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1] ?? "");
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

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
    if (file.size > 8 * 1024 * 1024) {
      setError("La foto pesa más de 8 MB — usa una más chica.");
      return;
    }
    setUploading(true);
    try {
      const base64 = await fileToBase64(file);
      const result = await uploadImageFn({
        data: { filename: file.name, contentType: file.type, base64 },
      });
      if (!result.ok) {
        setError(
          result.reason === "missing_token"
            ? "Falta configurar el almacenamiento de fotos (BLOB_READ_WRITE_TOKEN)."
            : "No se pudo subir la foto. Intenta de nuevo.",
        );
        return;
      }
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
