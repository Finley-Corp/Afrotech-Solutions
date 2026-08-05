import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GSAPAnimations from "../components/GSAPAnimations";
import { customerLogos, supplierLogos, type BrandLogo } from "@/app/data/brands";
import { featuredProjects } from "@/app/data/projects";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `Partners & Customers | ${SITE_NAME}`,
  description:
    "Manufacturer brands Afrotech supplies — Grundfos, KSB, and Wilo — and organizations that trust us for water system delivery across East Africa.",
};

function logoHref(brand: BrandLogo): string | null {
  if (brand.catalogueBrandId) return `/products?brand=${brand.catalogueBrandId}`;
  if (brand.projectId) {
    const project = featuredProjects.find((p) => p.id === brand.projectId || p.slug === brand.projectId);
    if (project) return `/projects/${project.slug}`;
  }
  return null;
}

function PartnerCard({ brand, kind }: { brand: BrandLogo; kind: "supplier" | "customer" }) {
  const href = logoHref(brand);
  const body = (
    <>
      <div className="partners-card__logo">
        <Image src={brand.logoSrc} alt="" width={200} height={64} className="partners-card__img" />
      </div>
      <h3 className="partners-card__name">{brand.name}</h3>
      {kind === "supplier" && brand.catalogueBrandId && (
        <span className="partners-card__action">
          View catalogue
          <Icon icon="solar:arrow-right-up-linear" width={14} />
        </span>
      )}
      {kind === "customer" && brand.projectId && (
        <span className="partners-card__action">
          See project
          <Icon icon="solar:arrow-right-up-linear" width={14} />
        </span>
      )}
      {kind === "customer" && !brand.projectId && (
        <span className="partners-card__meta">Client organization</span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className="partners-card partners-card--link">
        {body}
      </Link>
    );
  }

  return <div className="partners-card">{body}</div>;
}

export default function PartnersPage() {
  return (
    <main className="partners-page">
      <Navbar />

      <section className="partners-hero">
        <Image
          src="/assets/images/afrotech-14.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="partners-hero__bg"
        />
        <div className="partners-hero__overlay" />
        <div className="partners-hero__inner">
          <span className="partners-hero__eyebrow">Partners &amp; Customers</span>
          <h1>Brands we supply. Organizations who trust us.</h1>
          <p>
            Afrotech works with leading pump manufacturers and delivers systems for energy,
            drilling, and industrial clients across East Africa.
          </p>
        </div>
      </section>

      <section className="partners-section" id="brands-we-supply">
        <div className="partners-section__inner">
          <div className="partners-section__intro">
            <h2>Brands We Supply</h2>
            <p>
              Authorized distributor relationships for manufacturers in our product catalogue.
              Browse each brand to see available pumps and technical data.
            </p>
          </div>
          <div className="partners-grid">
            {supplierLogos.map((brand) => (
              <PartnerCard key={brand.name} brand={brand} kind="supplier" />
            ))}
          </div>
          <p className="partners-section__caption">
            Authorized distributor for leading pump manufacturers
          </p>
        </div>
      </section>

      <section className="partners-section partners-section--alt" id="trusted-by">
        <div className="partners-section__inner">
          <div className="partners-section__intro">
            <h2>Trusted By</h2>
            <p>
              Organizations we have served across energy, drilling, and industrial sectors.
              Project links appear here only when a matching record exists in our published
              projects.
            </p>
          </div>
          <div className="partners-grid">
            {customerLogos.map((brand) => (
              <PartnerCard key={brand.name} brand={brand} kind="customer" />
            ))}
          </div>
          <p className="partners-section__caption">
            Trusted by organizations across energy, drilling, and industrial sectors
          </p>
          <div className="partners-section__cta">
            <Link href="/projects" className="schedule-btn">
              View our projects
            </Link>
            <Link href="/quote" className="partners-section__secondary">
              Request a quote
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <GSAPAnimations />
    </main>
  );
}
