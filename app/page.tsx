import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import PhilosophySection from "./components/PhilosophySection";
import SectionDivider from "./components/SectionDivider";
import NeighbourhoodSection from "./components/NeighbourhoodSection";
import AmenitiesSection from "./components/AmenitiesSection";
import FeaturedResidences from "./components/FeaturedResidences";
import TestimonialsSection from "./components/TestimonialsSection";
import EditorialBreak from "./components/EditorialBreak";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import GSAPAnimations from "./components/GSAPAnimations";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <PhilosophySection />
      <SectionDivider label="Next — Neighbourhood" />
      <NeighbourhoodSection />
      <AmenitiesSection />
      <FeaturedResidences />
      <TestimonialsSection />
      <EditorialBreak />
      <CTASection />
      <Footer />
      {/* GSAP runs client-side only */}
      <GSAPAnimations />
    </main>
  );
}
