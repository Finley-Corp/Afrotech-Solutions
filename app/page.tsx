import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AmenitiesSection from "./components/AmenitiesSection";
import TestimonialsSection from "./components/TestimonialsSection";
import LandingContentSections from "./components/LandingContentSections";
import ProjectsSection from "./components/ProjectsSection";
import ServicesSection from "./components/ServicesSection";
import BrandsPartnersSection from "./components/BrandsPartnersSection";
import Footer from "./components/Footer";
import GSAPAnimations from "./components/GSAPAnimations";
import { JsonLd } from "./components/JsonLd";
import { getSiteUrl, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `${SITE_NAME} — Industrial Water & Pumping Systems in Kenya`,
  description:
    "Afrotech Solutions delivers industrial water pumps, solar borehole systems, and trusted brands Grundfos, KSB & Wilo across Kenya and Eastern Africa. Request a quote today.",
  alternates: { canonical: "/" },
  openGraph: {
    title: `${SITE_NAME} — Industrial Water & Pumping Systems in Kenya`,
    url: getSiteUrl(),
  },
};

export default function Home() {
  const siteUrl = getSiteUrl();

  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: `${SITE_NAME} — Home`,
          url: siteUrl,
          description:
            "Afrotech Solutions — industrial water pumps and engineering across Kenya and Eastern Africa.",
          isPartOf: { "@type": "WebSite", url: siteUrl, name: SITE_NAME },
        }}
      />
      <Navbar />
      <HeroSection />
      <AmenitiesSection />
      <LandingContentSections />
      <ProjectsSection />
      <ServicesSection />
      <BrandsPartnersSection />
      <TestimonialsSection />
      <Footer />
      <GSAPAnimations />
    </main>
  );
}
