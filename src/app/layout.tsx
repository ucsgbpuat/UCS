import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "University Cultural Society",
  description: "Celebrating the spirit of Indian culture through dance, music, and art.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
