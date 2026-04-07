import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AFROTECH | Architectural Living",
  description:
    "A curated collection of residences shaped by light, proportion, and quiet intention. Afrotech — Architectural Living.",
  keywords: "luxury residences, architectural living, Toronto, waterfront, Afrotech",
  openGraph: {
    title: "AFROTECH | Architectural Living",
    description:
      "A curated collection of residences shaped by light, proportion, and quiet intention.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
