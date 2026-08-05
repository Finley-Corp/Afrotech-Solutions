import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { featuredProjects } from "@/app/data/projects";

const label = "#6f675f";
const muted = "#5f5851";

function ProjectCard({ project }: { project: (typeof featuredProjects)[number] }) {
  return (
    <Link href={`/projects/${project.slug}`} className="projects-marquee__card">
      <div className="projects-marquee__media">
        <Image
          src={project.img}
          alt={project.title}
          fill
          sizes="(max-width: 767px) 80vw, 380px"
          className="projects-marquee__img"
        />
        <span className="projects-marquee__frame" aria-hidden />
        <div className="projects-marquee__overlay" />
        <div className="projects-marquee__top">
          <span className="projects-marquee__category">{project.category}</span>
          <span className="projects-marquee__date">{project.date}</span>
        </div>
      </div>
      <div className="projects-marquee__body">
        <h3 className="projects-marquee__title">{project.title}</h3>
        <p className="projects-marquee__metric">{project.metric}</p>
        <p className="projects-marquee__location">{project.location}</p>
      </div>
    </Link>
  );
}

function ProjectMarqueeGroup({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div className="projects-marquee__group" aria-hidden={ariaHidden || undefined}>
      {featuredProjects.map((project) => (
        <ProjectCard key={`${ariaHidden ? "dup-" : ""}${project.id}`} project={project} />
      ))}
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <section
      className="premium-landing-section projects-section"
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
            "radial-gradient(circle at top right, rgba(0,51,102,0.05) 0%, transparent 28%), radial-gradient(circle at bottom left, rgba(24,21,18,0.03) 0%, transparent 24%)",
        }}
      />

      <div className="projects-section__inner">
        <div
          className="reveal-fade projects-section__header"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "2rem 3rem",
            alignItems: "end",
            marginBottom: "clamp(2rem, 4vw, 2.75rem)",
            padding: "0 clamp(1.5rem, 4vw, 3.5rem)",
            maxWidth: "1380px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.65rem",
                fontSize: "0.68rem",
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: label,
                marginBottom: "1rem",
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
              Projects
            </div>
            <p style={{ maxWidth: "16rem", fontSize: "0.8125rem", lineHeight: 1.75, color: muted, margin: 0 }}>
              Field deployments across agriculture, industry, and municipal water networks.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "1rem" }}>
            <h2
              style={{
                color: "var(--color-primary)",
                letterSpacing: "-0.035em",
                lineHeight: 1.02,
                fontSize: "clamp(1.85rem, 4vw, 3.2rem)",
                margin: 0,
                maxWidth: "16ch",
                fontWeight: 500,
              }}
            >
              Proven outcomes in the{" "}
              <span style={{ color: "var(--color-accent)", fontStyle: "italic" }}>field.</span>
            </h2>
            <Link
              href="/projects"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                fontSize: "0.68rem",
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                fontWeight: 600,
                color: "var(--color-primary)",
                textDecoration: "none",
              }}
            >
              View all projects
              <Icon icon="solar:arrow-right-up-linear" width={16} />
            </Link>
          </div>
        </div>

        <div className="projects-marquee reveal-fade" aria-label="Featured projects">
          <div className="projects-marquee__track">
            <ProjectMarqueeGroup />
            <ProjectMarqueeGroup ariaHidden />
          </div>
        </div>
      </div>
    </section>
  );
}
