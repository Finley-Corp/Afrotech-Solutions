import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AFROTECH | Industrial Water Solutions",
  description:
    "Industrial-grade water pump solutions for agriculture, construction, and municipal applications across East Africa.",
  keywords: "water pumps, industrial pumping, solar pumps, borehole pumps, Nairobi, Kenya, Afrotech",
  openGraph: {
    title: "AFROTECH | Industrial Water Solutions",
    description:
      "Industrial-grade water pump solutions for agriculture, construction, and municipal applications across East Africa.",
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
