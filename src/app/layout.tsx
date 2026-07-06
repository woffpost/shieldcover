import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ShieldCover — Insurance",
  description: "Demo landing page — ShieldCover — Insurance",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
