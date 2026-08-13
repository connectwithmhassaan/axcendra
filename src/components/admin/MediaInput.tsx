import { useRef, useState } from "react";
import { Upload, Loader2, X } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { uploadSiteMedia } from "@/lib/content.functions";

function fileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result ?? "");
      resolve(result.slice(result.indexOf(",") + 1));
    };
    reader.onerror = () => reject(new Error("Could not read that file"));
    reader.readAsDataURL(file);
  });
}

export function MediaInput({
  label,
  kind,
  value,
  onChange,
}: {
  label: string;
  kind: "image" | "video";
  value: string;
  onChange: (next: string) => void;
}) {
  const upload = useServerFn(uploadSiteMedia);
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onPick(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      const base64 = await fileToBase64(file);
      const res = await upload({
        data: { fileName: file.name, contentType: file.type, base64 },
      });
      onChange(res.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Paste ${kind} URL or upload`}
          className="min-w-0 flex-1 rounded-xl border border-border bg-background/70 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground disabled:opacity-60"
        >
          {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
          Upload
        </button>
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="inline-flex items-center gap-1 rounded-xl border border-border px-3 py-2 text-xs text-muted-foreground"
          >
            <X className="h-3.5 w-3.5" />
            Clear
          </button>
        )}
        <input
          ref={inputRef}
          type="file"
          accept={kind === "image" ? "image/*" : "video/*"}
          className="hidden"
          onChange={(e) => onPick(e.target.files?.[0])}
        />
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
      {value && kind === "image" && (
        <img src={value} alt="" className="max-h-32 rounded-xl border border-border" />
      )}
      {value && kind === "video" && (
        <video src={value} controls className="max-h-40 rounded-xl border border-border" />
      )}
    </div>
  );
}
