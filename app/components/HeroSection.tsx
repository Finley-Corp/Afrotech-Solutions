import Link from "next/link";

const heroImages = [
  {
    src: "/assets/images/hero-section-3.jpg",
    alt: "Industrial water infrastructure",
    className: "hero-bento__lead",
  },
  {
    src: "/assets/images/hero-section-1.jpg",
    alt: "Water engineering project",
    className: "hero-bento__cell",
  },
  {
    src: "/assets/images/hero-section-2.jpg",
    alt: "Field operations and support",
    className: "hero-bento__cell",
  },
];

export default function HeroSection() {
  return (
    <header className="hero-header premium-landing-section">
      <div
        className="hero-header__ambient"
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at top left, rgba(0,51,102,0.06) 0%, transparent 34%), radial-gradient(circle at bottom right, rgba(214,28,44,0.04) 0%, transparent 28%)",
        }}
      />

      <div className="hero-inner">
        <div className="hero-copy">
          <span data-anim="hero-eyebrow" className="hero-eyebrow">
            Afrotech Water Solutions — East Africa
          </span>

          <h1 className="hero-title">
            <span className="line-mask">
              <span className="reveal-line" data-anim="hero-line">
                High purity water
              </span>
            </span>
            <span className="line-mask">
              <span className="reveal-line" data-anim="hero-line">
                <span style={{ color: "var(--color-accent)", fontStyle: "italic" }}>solutions.</span>
              </span>
            </span>
          </h1>

          <p data-anim="hero-p" className="hero-description">
            Reliable treatment-ready pumping systems and technical support for industrial,
            municipal, and agricultural applications across East Africa.
          </p>

          <div data-anim="hero-search" className="hero-actions">
            <Link href="/quote" className="hero-cta-btn">
              Get a Quote
            </Link>
            <Link
              href="/products"
              style={{
                display: "inline-block",
                fontSize: "0.68rem",
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: "var(--color-primary)",
                textDecoration: "none",
                fontWeight: 600,
                borderBottom: "1px solid var(--color-line)",
                paddingBottom: "0.2rem",
              }}
            >
              View products
            </Link>
          </div>
        </div>

        <div className="hero-bento">
          {heroImages.map((img) => (
            <div
              key={img.src}
              className={`hero-bento__item ${img.className}`}
              data-anim="hero-bento-item"
            >
              <img src={img.src} alt={img.alt} className="hero-bento__img" />
              <span className="hero-bento__frame" aria-hidden />
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
