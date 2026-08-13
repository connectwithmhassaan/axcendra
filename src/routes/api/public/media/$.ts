import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/media/$")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const path = params._splat ?? "";
        if (!path || path.includes("..")) {
          return new Response("Not found", { status: 404 });
        }
        const { readMedia } = await import("@/lib/content.server");
        const file = await readMedia(path);
        if (!file) return new Response("Not found", { status: 404 });

        return new Response(file, {
          headers: {
            "Content-Type": file.type || "application/octet-stream",
            "Cache-Control": "public, max-age=31536000, immutable",
          },
        });
      },
    },
  },
});
