"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GSAPAnimations from "../components/GSAPAnimations";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { industries } from "../data/industries";

export default function IndustriesPage() {
  return (
    <main className="industries-index">
      <Navbar />

      <section className="industries-index__hero">
        <div className="industries-index__hero-inner">
          <span className="industries-index__eyebrow">Industries</span>
          <h1>Water solutions by industry</h1>
          <p>
            Whether your application is large or specialized, we engineer reliable pumping systems
            around your operating conditions, quality requirements, and uptime targets.
          </p>
        </div>
      </section>

      <section className="industries-index__grid-section">
        <div className="industries-index__grid-inner">
          <div className="industries-index__grid">
            {industries.map((industry) => (
              <Link
                key={industry.id}
                href={`/industries/${industry.id}`}
                className="industries-index__card reveal-fade"
              >
                <div className="industries-index__card-media">
                  <img src={industry.image} alt="" className="industries-index__card-img" />
                  <div className="industries-index__card-overlay" />
                </div>
                <div className="industries-index__card-body">
                  <div className="industries-index__card-icon">
                    <Icon icon={industry.icon} width={18} />
                  </div>
                  <h2>{industry.title}</h2>
                  <p>{industry.description}</p>
                  <span className="industries-index__card-link">
                    Explore sector
                    <Icon icon="solar:arrow-right-up-linear" width={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="industries-index__cta">
        <div className="industries-index__cta-inner">
          <h2>Technical expertise for your specific sector.</h2>
          <p>
            Need a site assessment or system design recommendation? Share your operating profile
            and our engineering team will map the right approach.
          </p>
          <div className="industries-index__cta-actions">
            <Link
              href="/quote?service=system-design-integration"
              className="industries-index__cta-primary"
            >
              Request Site Visit
            </Link>
            <Link href="/contact" className="industries-index__cta-secondary">
              Contact engineering
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <GSAPAnimations />
    </main>
  );
}
