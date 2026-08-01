import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://ucspantnagar.vercel.app/"), // Replace with your actual domain

  title: {
    default: "University Cultural Society (UCS) | GBPUAT Pantnagar",
    template: "%s | UCS GBPUAT",
  },

  description:
    "Official website of the University Cultural Society (UCS), Govind Ballabh Pant University of Agriculture and Technology (GBPUAT), Pantnagar. Explore cultural events, competitions, performances, galleries, announcements, and student activities.",

  keywords: [
    "University Cultural Society",
    "UCS",
    "UCS Pantnagar",
    "University Cultural Society Pantnagar",
    "University Cultural Society GBPUAT",
    "GBPUAT",
    "GBPUAT Pantnagar",
    "GB Pant University",
    "Govind Ballabh Pant University",
    "Govind Ballabh Pant University of Agriculture and Technology",
    "Pantnagar University",
    "Pantnagar",
    "Uttarakhand",
    "GBPUAT Cultural Society",
    "Pantnagar Cultural Society",
    "University Events",
    "College Events",
    "Campus Events",
    "Student Activities",
    "Student Clubs",
    "Cultural Events",
    "Cultural Programs",
    "Dance Competition",
    "Music Competition",
    "Singing Competition",
    "Drama",
    "Fine Arts",
    "Photography",
    "Fashion Show",
    "Talent Show",
    "Freshers",
    "Farewell",
    "Youth Festival",
    "Art and Culture",
    "Indian Culture",
    "Student Community",
    "GBPUAT Student Activities",
    "Pantnagar Events",
  ],

  authors: [
    {
      name: "University Cultural Society, GBPUAT",
    },
  ],

  creator: "University Cultural Society",
  publisher: "University Cultural Society, GBPUAT",

  applicationName: "University Cultural Society",

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://ucspantnagar.vercel.app/",
    siteName: "University Cultural Society (UCS)",
    title: "University Cultural Society (UCS) | GBPUAT Pantnagar",
    description:
      "Official website of the University Cultural Society (UCS), GBPUAT Pantnagar. Discover cultural events, competitions, performances, student clubs, galleries, and campus activities.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "University Cultural Society (UCS), GBPUAT Pantnagar",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "University Cultural Society (UCS) | GBPUAT Pantnagar",
    description:
      "Official website of the University Cultural Society (UCS), GBPUAT Pantnagar.",
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  category: "Education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}