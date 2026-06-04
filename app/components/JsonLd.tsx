import { COMPANY_ADDRESS_ONE_LINE, COMPANY_NAME } from "@/lib/company";
import { getSiteUrl, SITE_NAME } from "@/lib/site";

type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  const siteUrl = getSiteUrl();

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SITE_NAME,
        legalName: COMPANY_NAME,
        url: siteUrl,
        logo: `${siteUrl}/assets/logo/afrotech%20logo.png`,
        email: "contact@afrotechsolutions.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: "NML Towers, Tsavo Road, South B, 2nd Floor, Suite 212",
          addressLocality: "Nairobi",
          addressCountry: "KE",
        },
        areaServed: ["Kenya", "Tanzania", "East Africa"],
        description:
          "Afrotech Solutions supplies industrial water pumps, borehole systems, and pumping engineering across Kenya and Eastern Africa.",
        sameAs: [],
      }}
    />
  );
}

export function WebSiteJsonLd() {
  const siteUrl = getSiteUrl();

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE_NAME,
        url: siteUrl,
      }}
    />
  );
}
