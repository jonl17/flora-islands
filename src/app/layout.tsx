import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FLÓRA ÍSLANDS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="is">
      <body>{children}</body>
    </html>
  );
}
