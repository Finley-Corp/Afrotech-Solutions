"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GSAPAnimations from "../components/GSAPAnimations";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { services } from "../data/services";

export default function ServicesPage() {
  return (
    <main className="svc-page">
      <Navbar />

      <section className="svc-hero svc-hero--overview">
        <Image
          src="/assets/images/afrotech-7.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="svc-hero__bg"
        />
        <div className="svc-hero__overlay" />
        <div className="svc-hero__inner svc-hero__inner--center">
          <span className="svc-hero__eyebrow">Engineering Support</span>
          <h1>Services</h1>
          <p>
            End-to-end water system support — from pump selection and system design through
            installation, maintenance, and upcoming remote monitoring capability.
          </p>
        </div>
      </section>

      <section className="svc-overview">
        <div className="svc-overview__inner">
          <div className="svc-overview__grid">
            {services.map((service) => (
              <article key={service.slug} className="svc-overview__card">
                <div className="svc-overview__icon">
                  <Icon icon={service.icon} width={22} />
                </div>
                {service.status === "planned" && (
                  <span className="svc-badge svc-badge--planned svc-badge--sm">Planned</span>
                )}
                <h2>{service.title}</h2>
                <p>{service.summary}</p>
                <Link href={service.path} className="svc-overview__link">
                  Learn more
                  <Icon icon="solar:arrow-right-up-linear" width={16} />
                </Link>
              </article>
            ))}
          </div>

          <div className="svc-overview__fallback">
            <p>Not sure which service you need?</p>
            <div className="svc-overview__fallback-links">
              <Link href="/quote" className="schedule-btn">
                Request a quote
              </Link>
              <Link href="/contact" className="svc-overview__contact-link">
                Talk to us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <GSAPAnimations />
    </main>
  );
}
