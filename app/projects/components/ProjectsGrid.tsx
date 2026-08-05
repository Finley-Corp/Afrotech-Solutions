"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import {
  featuredProjects,
  PROJECT_CATEGORIES,
  type ProjectCategory,
} from "@/app/data/projects";

export default function ProjectsGrid() {
  const [activeCategory, setActiveCategory] = useState<"all" | ProjectCategory>("all");

  const filtered = useMemo(() => {
    if (activeCategory === "all") return featuredProjects;
    return featuredProjects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="projects-grid-wrap">
      <div className="projects-filters" role="tablist" aria-label="Filter by sector">
        <button
          type="button"
          role="tab"
          aria-selected={activeCategory === "all"}
          className={`projects-filters__tab${activeCategory === "all" ? " is-active" : ""}`}
          onClick={() => setActiveCategory("all")}
        >
          All
          <span className="projects-filters__count">{featuredProjects.length}</span>
        </button>
        {PROJECT_CATEGORIES.map((cat) => {
          const count = featuredProjects.filter((p) => p.category === cat).length;
          return (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={activeCategory === cat}
              className={`projects-filters__tab${activeCategory === cat ? " is-active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
              <span className="projects-filters__count">{count}</span>
            </button>
          );
        })}
      </div>

      <p className="projects-grid-note">
        Featured case studies below — additional projects available on request.
      </p>

      {filtered.length === 0 ? (
        <p className="projects-grid-empty">No projects in this sector yet.</p>
      ) : (
        <div className="projects-card-grid">
          {filtered.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="projects-card"
            >
              <div className="projects-card__media">
                <img src={project.img} alt="" className="projects-card__img" />
                <div className="projects-card__overlay" />
                <div className="projects-card__top">
                  <span className="projects-card__category">{project.category}</span>
                  <span className="projects-card__date">{project.date}</span>
                </div>
              </div>
              <div className="projects-card__body">
                <h3 className="projects-card__title">{project.title}</h3>
                {project.client && (
                  <p className="projects-card__client">{project.client.name}</p>
                )}
                <div className="projects-card__metric-row">
                  <span className="projects-card__metric-label">Success metric</span>
                  <span className="projects-card__metric">{project.metric}</span>
                </div>
                <div className="projects-card__meta">
                  <span>{project.location}</span>
                  <span className="projects-card__link">
                    View case study
                    <Icon icon="solar:arrow-right-up-linear" width={14} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
