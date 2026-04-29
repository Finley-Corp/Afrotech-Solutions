import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AmenitiesSection from "./components/AmenitiesSection";
import TestimonialsSection from "./components/TestimonialsSection";
import LandingContentSections from "./components/LandingContentSections";
import ServicesSection from "./components/ServicesSection";
import Footer from "./components/Footer";
import GSAPAnimations from "./components/GSAPAnimations";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <AmenitiesSection />
      <LandingContentSections />
      <ServicesSection />
      <TestimonialsSection />
      <Footer />
      {/* GSAP runs client-side only */}
      <GSAPAnimations />
    </main>
  );
}
