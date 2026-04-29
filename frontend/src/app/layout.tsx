import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Flora the Flower",
  description: "Created by Pannnomaly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
