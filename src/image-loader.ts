import type { ImageLoaderProps } from "next/image";

// Unsplash's CDN (imgix) resizes and converts on its own via ?w=&q=&auto=format,
// so images skip Vercel Image Optimization entirely — no billable transformations.
// Anything else is served as-is.
export default function imageLoader({ src, width, quality }: ImageLoaderProps): string {
  if (!src.startsWith("https://images.unsplash.com/")) return src;
  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 75));
  url.searchParams.set("auto", "format");
  return url.href;
}
