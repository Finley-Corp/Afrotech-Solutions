import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import GSAPAnimations from "@/app/components/GSAPAnimations";
import type { ServiceItem } from "@/app/data/services";
import { featuredProjects } from "@/app/data/projects";
import ServiceInquiryForm from "./ServiceInquiryForm";

// TODO: pump-selection-sizing is the intended home for the interactive sizing calculator (separate spec).

type Props = {
  service: ServiceItem;
};

export default function ServicePageShell({ service }: Props) {
  const relatedProjects = (service.relatedProjectIds ?? [])
    .map((id) => featuredProjects.find((p) => p.id === id))
    .filter(Boolean);

  const isPlanned = service.status === "planned";

  return (
    <main className="svc-page">
      <Navbar />

      <section className="svc-hero">
        <Image
          src="/assets/images/afrotech-7.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="svc-hero__bg"
        />
        <div className="svc-hero__overlay" />
        <div className="svc-hero__inner">
          <nav className="svc-breadcrumb" aria-label="Breadcrumb">
            <Link href="/services">Services</Link>
            <span aria-hidden>/</span>
            <span>{service.title}</span>
          </nav>
          {isPlanned && <span className="svc-badge svc-badge--planned">In development</span>}
          <div className="svc-hero__icon">
            <Icon icon={service.icon} width={28} />
          </div>
          <h1>{service.title}</h1>
          <p>{service.description}</p>
        </div>
      </section>

      <div className="svc-layout">
        <div className="svc-main">
          {service.highlights && (
            <ul className="svc-highlights">
              {service.highlights.map((h) => (
                <li key={h}>
                  <Icon icon="solar:check-circle-linear" width={18} />
                  {h}
                </li>
              ))}
            </ul>
          )}

          {service.sections.map((section) => (
            <section key={section.heading} className="svc-section">
              <h2>{section.heading}</h2>
              {section.paragraphs.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </section>
          ))}

          {relatedProjects.length > 0 && (
            <section className="svc-section svc-projects">
              <h2>Related projects</h2>
              <div className="svc-projects__grid">
                {relatedProjects.map((project) => (
                  <Link key={project!.id} href={`/projects/${project!.slug}`} className="svc-projects__card">
                    <div className="svc-projects__media">
                      <Image src={project!.img} alt={project!.title} fill sizes="300px" />
                    </div>
                    <div className="svc-projects__body">
                      <span className="svc-projects__cat">{project!.category}</span>
                      <h3>{project!.title}</h3>
                      <p>{project!.metric}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="svc-aside">
          <div className="svc-form-card">
            <h2>{service.form.submitLabel}</h2>
            <ServiceInquiryForm service={service} />
          </div>
        </aside>
      </div>

      <div className="svc-back">
        <Link href="/services">
          <Icon icon="solar:arrow-left-linear" width={16} />
          All services
        </Link>
      </div>

      <Footer />
      <GSAPAnimations />
    </main>
  );
}
