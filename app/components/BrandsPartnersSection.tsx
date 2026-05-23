import Image from "next/image";
import Link from "next/link";
import { brandPartners } from "@/app/data/brands";

const label = "#6f675f";
const muted = "#5f5851";

function BrandLogo({ name, logoSrc, href }: (typeof brandPartners)[number]) {
  const img = logoSrc ? (
    <Image src={logoSrc} alt={name} width={180} height={56} className="brands-marquee__img" />
  ) : (
    <span className="brands-marquee__wordmark">{name}</span>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="brands-marquee__logo"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={name}
      >
        {img}
      </Link>
    );
  }

  return <div className="brands-marquee__logo">{img}</div>;
}

function BrandMarqueeGroup({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div className="brands-marquee__group" aria-hidden={ariaHidden || undefined}>
      {brandPartners.map((brand) => (
        <div key={`${ariaHidden ? "dup-" : ""}${brand.name}`} className="brands-marquee__item">
          <BrandLogo {...brand} />
        </div>
      ))}
    </div>
  );
}

export default function BrandsPartnersSection() {
  return (
    <section
      className="premium-landing-section brands-partners-section"
      style={{
        position: "relative",
        backgroundColor: "var(--color-surface)",
        borderBottom: "1px solid var(--color-line)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at top right, rgba(0,51,102,0.05) 0%, transparent 28%), radial-gradient(circle at bottom left, rgba(214,28,44,0.03) 0%, transparent 22%)",
        }}
      />

      <div
        style={{
          position: "relative",
          maxWidth: "1380px",
          margin: "0 auto",
          padding: "clamp(3.5rem, 7vw, 6rem) clamp(1.5rem, 4vw, 3.5rem)",
        }}
      >
        <div className="reveal-fade brands-partners__header">
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.65rem",
              fontSize: "0.68rem",
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: label,
              marginBottom: "1.25rem",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: "var(--color-accent)",
              }}
            />
            Brands &amp; Partnerships
          </div>
          <h2 className="brands-partners__title">
            <span className="brands-partners__title-line">Industrial water solutions meet</span>
            <span className="brands-partners__title-line">trusted global partners.</span>
          </h2>
          <p style={{ margin: "1.25rem auto 0", maxWidth: "32rem", fontSize: "0.875rem", lineHeight: 1.75, color: muted }}>
            Manufacturers and suppliers we work with across East Africa.
          </p>
        </div>

        <div className="brands-marquee reveal-fade" aria-label="Partner brands">
          <div className="brands-marquee__track">
            <BrandMarqueeGroup />
            <BrandMarqueeGroup ariaHidden />
          </div>
        </div>
      </div>
    </section>
  );
}
