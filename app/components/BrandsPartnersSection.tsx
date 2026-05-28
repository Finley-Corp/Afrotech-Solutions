"use client";

import { useEffect, useMemo, useState } from "react";
import { brandPartners } from "@/app/data/brands";
import SphereImageGrid, { type ImageData } from "@/app/components/SphereImageGrid";

function getSphereSize(width: number) {
  if (width < 480) return Math.min(300, width - 32);
  if (width < 900) return 360;
  return 440;
}

export default function BrandsPartnersSection() {
  const [containerSize, setContainerSize] = useState(420);

  useEffect(() => {
    const update = () => setContainerSize(getSphereSize(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const sphereImages = useMemo<ImageData[]>(
    () =>
      brandPartners
        .filter((b) => b.logoSrc)
        .map((b) => ({
          id: b.name,
          src: b.logoSrc!,
          alt: `${b.name} logo`,
          title: b.name,
          href: b.href,
        })),
    [],
  );

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
        className="brands-partners-section__bg"
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
            Brands &amp; Partnerships
          </div>
          <h2 className="brands-partners__title">
            <span className="brands-partners__title-line">Industrial water solutions meet</span>
            <span className="brands-partners__title-line">trusted global partners.</span>
          </h2>
          <p className="brands-partners__lead">
            Drag the sphere to explore manufacturers and suppliers we work with across East Africa.
          </p>
        </div>

        <div className="brands-partners-sphere reveal-fade" style={{ ["--sphere-size" as string]: `${containerSize}px` }}>
          <SphereImageGrid
            images={sphereImages}
            containerSize={containerSize}
            sphereRadius={containerSize * 0.42}
            dragSensitivity={0.55}
            momentumDecay={0.95}
            maxRotationSpeed={5}
            baseImageScale={0.14}
            autoRotate
            autoRotateSpeed={0.3}
          />
        </div>
      </div>
    </section>
  );
}
