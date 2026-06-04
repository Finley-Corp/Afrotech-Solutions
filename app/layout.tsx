import type { Metadata } from "next";
import { COMPANY_LOGO_SRC, COMPANY_NAME, FAVICON_SRC } from "@/lib/company";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/app/components/JsonLd";
import { getSiteUrl, SITE_NAME, SITE_NAME_LEGAL } from "@/lib/site";
import "./globals.css";

const siteUrl = getSiteUrl();
const defaultTitle = `${SITE_NAME} | Industrial Water & Pump Solutions`;
const defaultDescription =
  "Afrotech Solutions — industrial water pumps, borehole systems, Grundfos, KSB & Wilo supply, and engineering support across Kenya and Eastern Africa.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${SITE_NAME}`,
  },
  description: defaultDescription,
  keywords: [
    "Afrotech Solutions",
    "afrotech solutions",
    "Afrotech Engineering Solutions",
    "water pumps Kenya",
    "industrial pumps Nairobi",
    "borehole pumps",
    "Grundfos Kenya",
    "KSB pumps",
    "Wilo pumps",
    "pump supplier East Africa",
  ],
  authors: [{ name: SITE_NAME_LEGAL }],
  creator: SITE_NAME_LEGAL,
  publisher: SITE_NAME_LEGAL,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: FAVICON_SRC, type: "image/png" }],
    apple: [{ url: FAVICON_SRC, type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: siteUrl,
    siteName: SITE_NAME,
    title: defaultTitle,
    description: defaultDescription,
    images: [{ url: COMPANY_LOGO_SRC, alt: COMPANY_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [COMPANY_LOGO_SRC],
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
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
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Geist:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        {children}
      </body>
    </html>
  );
}
