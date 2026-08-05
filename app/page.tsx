import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import PumpFinderBar from "./components/PumpFinderBar";
import TrustStatsStrip from "./components/TrustStatsStrip";
import CertificationsStrip from "./components/CertificationsStrip";
import HowWeWorkSection from "./components/HowWeWorkSection";
import ServicesSection from "./components/ServicesSection";
import IndustriesSection from "./components/IndustriesSection";
import ProjectsSection from "./components/ProjectsSection";
import BrandsPartnersSection from "./components/BrandsPartnersSection";
import TestimonialsSection from "./components/TestimonialsSection";
import FinalCTASection from "./components/FinalCTASection";
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
      <PumpFinderBar />
      <TrustStatsStrip />
      <CertificationsStrip />
      <HowWeWorkSection />
      <ServicesSection />
      <IndustriesSection />
      <ProjectsSection />
      <BrandsPartnersSection />
      <TestimonialsSection />
      <FinalCTASection />
      <Footer />
      <GSAPAnimations />
    </main>
  );
}
