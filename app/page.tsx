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

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <AmenitiesSection />
      <LandingContentSections />
      <ProjectsSection />
      <ServicesSection />
      <BrandsPartnersSection />
      <TestimonialsSection />
      <Footer />
      {/* GSAP runs client-side only */}
      <GSAPAnimations />
    </main>
  );
}
