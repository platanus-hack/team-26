import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Constellation Hub",
  description: "A hub for all academic articles and papers",
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
