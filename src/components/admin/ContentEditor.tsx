import { Plus, Trash2 } from "lucide-react";
import { MediaInput } from "./MediaInput";

type Json = unknown;

function humanize(key: string) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/[-_]/g, " ")
    .replace(/\burl\b/i, "")
    .trim()
    .replace(/^./, (c) => c.toUpperCase());
}

function mediaKind(key: string): "image" | "video" | null {
  if (/video/i.test(key)) return "video";
  if (/image|logo|photo|picture/i.test(key)) return "image";
  return null;
}

function isPlainObject(value: unknown): value is Record<string, Json> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function emptyLike(sample: Json): Json {
  if (Array.isArray(sample)) return [];
  if (isPlainObject(sample)) {
    const out: Record<string, Json> = {};
    for (const [k, v] of Object.entries(sample)) out[k] = emptyLike(v);
    return out;
  }
  if (typeof sample === "number") return 0;
  if (typeof sample === "boolean") return false;
  return "";
}

export function ContentEditor({
  value,
  onChange,
}: {
  value: Record<string, Json>;
  onChange: (next: Record<string, Json>) => void;
}) {
  function setAt(path: (string | number)[], next: Json) {
    const clone = structuredClone(value) as Record<string, Json>;
    let cursor: Record<string | number, Json> = clone as never;
    for (let i = 0; i < path.length - 1; i += 1) {
      cursor = cursor[path[i]!] as Record<string | number, Json>;
    }
    cursor[path[path.length - 1]!] = next;
    onChange(clone);
  }

  function renderNode(node: Json, path: (string | number)[], key: string): React.ReactNode {
    const label = humanize(key);

    if (typeof node === "boolean") {
      return (
        <label key={path.join(".")} className="flex items-center gap-2 text-sm text-foreground">
          <input
            type="checkbox"
            checked={node}
            onChange={(e) => setAt(path, e.target.checked)}
            className="h-4 w-4 rounded border-border"
          />
          {label}
        </label>
      );
    }

    if (typeof node === "string") {
      const kind = mediaKind(key);
      if (kind) {
        return (
          <MediaInput
            key={path.join(".")}
            label={label}
            kind={kind}
            value={node}
            onChange={(next) => setAt(path, next)}
          />
        );
      }
      const long = node.length > 70;
      return (
        <label key={path.join(".")} className="block">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {label}
          </span>
          {long ? (
            <textarea
              rows={3}
              value={node}
              onChange={(e) => setAt(path, e.target.value)}
              className="mt-1.5 w-full resize-y rounded-xl border border-border bg-background/70 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          ) : (
            <input
              value={node}
              onChange={(e) => setAt(path, e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-border bg-background/70 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          )}
        </label>
      );
    }

    if (Array.isArray(node)) {
      return (
        <div key={path.join(".")} className="rounded-2xl border border-border/70 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">{label}</p>
            <button
              type="button"
              onClick={() => setAt(path, [...node, emptyLike(node[0] ?? "")])}
              className="inline-flex items-center gap-1.5 rounded-xl bg-brand-soft px-3 py-1.5 text-xs font-semibold text-primary"
            >
              <Plus className="h-3.5 w-3.5" />
              Add item
            </button>
          </div>

          <div className="mt-4 space-y-4">
            {node.map((item, index) => (
              <div key={index} className="rounded-2xl bg-muted/40 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">
                    {label} {index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => setAt(path, node.filter((_, i) => i !== index))}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-border px-2.5 py-1.5 text-xs text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Remove
                  </button>
                </div>
                {isPlainObject(item) ? (
                  <div className="space-y-4">
                    {Object.entries(item).map(([childKey, childValue]) =>
                      renderNode(childValue, [...path, index, childKey], childKey),
                    )}
                  </div>
                ) : (
                  renderNode(item, [...path, index], key)
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (isPlainObject(node)) {
      return (
        <div key={path.join(".")} className="rounded-2xl border border-border/70 p-4">
          <p className="text-sm font-semibold text-foreground">{label}</p>
          <div className="mt-4 space-y-4">
            {Object.entries(node).map(([childKey, childValue]) =>
              renderNode(childValue, [...path, childKey], childKey),
            )}
          </div>
        </div>
      );
    }

    return null;
  }

  return (
    <div className="space-y-8">
      {Object.entries(value).map(([sectionKey, sectionValue]) => (
        <section key={sectionKey} className="glass-card rounded-3xl p-5 sm:p-7">
          <h2 className="font-display text-xl text-foreground">{humanize(sectionKey)}</h2>
          <div className="mt-5 space-y-5">
            {isPlainObject(sectionValue)
              ? Object.entries(sectionValue).map(([childKey, childValue]) =>
                  renderNode(childValue, [sectionKey, childKey], childKey),
                )
              : renderNode(sectionValue, [sectionKey], sectionKey)}
          </div>
        </section>
      ))}
    </div>
  );
}
