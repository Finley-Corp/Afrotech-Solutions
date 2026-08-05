import Link from "next/link";

export default function FinalCTASection() {
  return (
    <section className="premium-landing-section final-cta-section" aria-label="Get help selecting a pump">
      <div className="final-cta-section__inner reveal-fade">
        <p className="final-cta-section__eyebrow">Engineering support · East Africa</p>
        <h2 className="final-cta-section__title">Need help selecting the right pump?</h2>
        <p className="final-cta-section__text">
          Share your flow, head, and application details — our engineers will recommend the right
          equipment and support you through delivery and commissioning.
        </p>
        <div className="final-cta-section__actions">
          <Link href="/quote" className="hero-cta-btn">
            Get a Quote
          </Link>
          <Link href="/contact" className="final-cta-section__secondary">
            Talk to an Engineer
          </Link>
        </div>
      </div>
    </section>
  );
}
