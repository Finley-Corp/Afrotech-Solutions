import Image from "next/image";

/** Verified catalogue brands — logos from public/assets/logo/ */
const catalogueBrands = [
  { name: "Grundfos", logoSrc: "/assets/logo/grundfos-logo.webp" },
  { name: "KSB", logoSrc: "/assets/logo/ksb-logo.webp" },
  { name: "Wilo", logoSrc: "/assets/logo/wilo-logo.webp" },
] as const;

export default function CertificationsStrip() {
  return (
    <section
      className="premium-landing-section certifications-strip"
      aria-label="Catalogue partners"
    >
      <div className="certifications-strip__inner">
        <p className="certifications-strip__heading">Catalogue partners</p>
        <ul className="certifications-strip__list">
          {catalogueBrands.map((brand) => (
            <li key={brand.name} className="certifications-strip__item">
              <Image
                src={brand.logoSrc}
                alt={`${brand.name} pumps`}
                width={120}
                height={40}
                className="certifications-strip__logo"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
