import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { customerLogos, supplierLogos, type BrandLogo } from "@/app/data/brands";
import { featuredProjects } from "@/app/data/projects";

function logoHref(brand: BrandLogo): string | null {
  if (brand.catalogueBrandId) {
    return `/products?brand=${brand.catalogueBrandId}`;
  }
  if (brand.projectId) {
    const project = featuredProjects.find((p) => p.id === brand.projectId || p.slug === brand.projectId);
    if (project) return `/projects/${project.slug}`;
  }
  return null;
}

function BrandLogoItem({ brand }: { brand: BrandLogo }) {
  const href = logoHref(brand);
  const img = (
    <Image
      src={brand.logoSrc}
      alt={brand.name}
      width={180}
      height={56}
      className="brands-marquee__img"
    />
  );

  if (href) {
    const isInternal = href.startsWith("/");
    const label =
      brand.catalogueBrandId
        ? `View ${brand.name} pumps in catalogue`
        : brand.projectId
          ? `See ${brand.name} project`
          : brand.name;

    if (isInternal) {
      return (
        <Link href={href} className="brands-marquee__logo" aria-label={label}>
          {img}
        </Link>
      );
    }

    return (
      <a
        href={href}
        className="brands-marquee__logo"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
      >
        {img}
      </a>
    );
  }

  return (
    <div className="brands-marquee__logo" role="img" aria-label={brand.name}>
      {img}
    </div>
  );
}

function LogoRow({
  logos,
  ariaLabel,
}: {
  logos: BrandLogo[];
  ariaLabel: string;
}) {
  // Duplicate only when enough logos for a continuous marquee; otherwise a static row.
  const useMarquee = logos.length >= 4;

  if (!useMarquee) {
    return (
      <div className="brands-logo-row brands-logo-row--static" aria-label={ariaLabel}>
        {logos.map((brand) => (
          <div key={brand.name} className="brands-marquee__item">
            <BrandLogoItem brand={brand} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="brands-marquee" aria-label={ariaLabel}>
      <div className="brands-marquee__track">
        {[false, true].map((dup) => (
          <div
            key={dup ? "dup" : "main"}
            className="brands-marquee__group"
            aria-hidden={dup || undefined}
          >
            {logos.map((brand) => (
              <div key={`${dup ? "dup-" : ""}${brand.name}`} className="brands-marquee__item">
                <BrandLogoItem brand={brand} />
              </div>
            ))}
          </div>
        ))}
      </div>
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

      <div className="brands-partners-section__inner">
        <div className="reveal-fade brands-partners__header">
          <div className="brands-partners__eyebrow">
            <span className="brands-partners__eyebrow-dot" />
            Partners &amp; Customers
          </div>
          <h2 className="brands-partners__title">
            <span className="brands-partners__title-line">Brands we supply.</span>
            <span className="brands-partners__title-line">Organizations who trust us.</span>
          </h2>
          <p className="brands-partners__lead">
            Manufacturer partners from our catalogue, and clients we serve across energy, drilling,
            and industry.
          </p>
          <Link href="/partners" className="brands-partners__page-link">
            View partners &amp; customers
            <Icon icon="solar:arrow-right-up-linear" width={16} />
          </Link>
        </div>

        <div className="brands-partners__blocks reveal-fade">
          <div className="brands-partners__block">
            <h3 className="brands-partners__block-label">Brands We Supply</h3>
            <LogoRow logos={supplierLogos} ariaLabel="Authorized manufacturer partners" />
            <p className="brands-partners__block-caption">
              Authorized distributor for leading pump manufacturers
            </p>
          </div>

          <div className="brands-partners__block">
            <h3 className="brands-partners__block-label">Trusted By</h3>
            <LogoRow logos={customerLogos} ariaLabel="Organizations we have served" />
            <p className="brands-partners__block-caption">
              Trusted by organizations across energy, drilling, and industrial sectors
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
