import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AmenitiesSection from "./components/AmenitiesSection";
import TestimonialsSection from "./components/TestimonialsSection";
import LandingContentSections from "./components/LandingContentSections";
import Footer from "./components/Footer";
import GSAPAnimations from "./components/GSAPAnimations";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <AmenitiesSection />
      <LandingContentSections />
      <TestimonialsSection />
      <Footer />
      {/* GSAP runs client-side only */}
      <GSAPAnimations />
    </main>
  );
}
