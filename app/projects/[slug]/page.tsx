import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@iconify/react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import GSAPAnimations from "../../components/GSAPAnimations";
import {
  featuredProjects,
  getProjectBySlug,
  getRelatedProjects,
} from "@/app/data/projects";
import { SITE_NAME } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return featuredProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project" };
  return {
    title: `${project.title} | ${SITE_NAME}`,
    description: project.desc,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const related = getRelatedProjects(project);

  return (
    <main className="project-detail">
      <Navbar />

      <section className="project-detail__hero">
        <Image
          src={project.img}
          alt=""
          fill
          priority
          sizes="100vw"
          className="project-detail__hero-bg"
        />
        <div className="project-detail__hero-overlay" />
        <div className="project-detail__hero-inner">
          <nav className="project-detail__breadcrumb" aria-label="Breadcrumb">
            <Link href="/projects">Projects</Link>
            <span aria-hidden>/</span>
            <span>{project.title}</span>
          </nav>
          <div className="project-detail__tags">
            <span className="project-detail__category">{project.category}</span>
            <span className="project-detail__year">{project.date}</span>
          </div>
          <h1>{project.title}</h1>
          <p className="project-detail__location">
            <Icon icon="solar:map-point-linear" width={16} />
            {project.location}
          </p>
          <p className="project-detail__metric">{project.metric}</p>
        </div>
      </section>

      <div className="project-detail__layout">
        <article className="project-detail__main">
          {project.client && (
            <div className="project-detail__client">
              {project.client.logoSrc && (
                <Image
                  src={project.client.logoSrc}
                  alt=""
                  width={120}
                  height={40}
                  className="project-detail__client-logo"
                />
              )}
              <div>
                <span className="project-detail__client-label">Client</span>
                <p className="project-detail__client-name">{project.client.name}</p>
              </div>
              <Link href="/partners#trusted-by" className="project-detail__client-link">
                Partners &amp; customers
                <Icon icon="solar:arrow-right-up-linear" width={14} />
              </Link>
            </div>
          )}

          <section className="project-detail__section">
            <h2>Challenge</h2>
            <p>{project.challenge}</p>
          </section>

          <section className="project-detail__section">
            <h2>Approach</h2>
            <p>{project.approach}</p>
          </section>

          <section className="project-detail__section">
            <h2>Outcome</h2>
            <p>{project.outcome}</p>
          </section>

          {project.equipment.length > 0 && (
            <section className="project-detail__section">
              <h2>Equipment &amp; scope</h2>
              <ul className="project-detail__list">
                {project.equipment.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {project.gallery.length > 1 && (
            <section className="project-detail__section">
              <h2>Project photos</h2>
              <div className="project-detail__gallery">
                {project.gallery.map((src) => (
                  <div key={src} className="project-detail__gallery-item">
                    <Image src={src} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" />
                  </div>
                ))}
              </div>
            </section>
          )}
        </article>

        <aside className="project-detail__aside">
          <div className="project-detail__aside-card">
            <h2>Related products</h2>
            <ul className="project-detail__product-links">
              {project.relatedProducts.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    {item.label}
                    <Icon icon="solar:arrow-right-up-linear" width={14} />
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/quote" className="schedule-btn project-detail__cta">
              Start a similar project
            </Link>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="project-detail__related">
          <div className="project-detail__related-inner">
            <h2>Similar projects</h2>
            <div className="project-detail__related-grid">
              {related.map((p) => (
                <Link key={p.id} href={`/projects/${p.slug}`} className="projects-card projects-card--compact">
                  <div className="projects-card__media">
                    <img src={p.img} alt="" className="projects-card__img" />
                    <div className="projects-card__overlay" />
                    <span className="projects-card__category">{p.category}</span>
                  </div>
                  <div className="projects-card__body">
                    <h3 className="projects-card__title">{p.title}</h3>
                    <p className="projects-card__metric">{p.metric}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="project-detail__back">
        <Link href="/projects">
          <Icon icon="solar:arrow-left-linear" width={16} />
          All projects
        </Link>
      </div>

      <Footer />
      <GSAPAnimations />
    </main>
  );
}
