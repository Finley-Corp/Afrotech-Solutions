import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@iconify/react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import GSAPAnimations from "../../components/GSAPAnimations";
import { getIndustryById, industries } from "../../data/industries";

type IndustryPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return industries.map((industry) => ({
    id: industry.id,
  }));
}

export default async function IndustryDetailsPage({ params }: IndustryPageProps) {
  const { id } = await params;
  const industry = getIndustryById(id);

  if (!industry) {
    notFound();
  }

  return (
    <main style={{ backgroundColor: "var(--color-background)" }}>
      <Navbar />

      <section
        style={{
          position: "relative",
          width: "100%",
          height: "68vh",
          minHeight: "560px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#003366",
          overflow: "hidden",
        }}
      >
        <img
          src={industry.image}
          alt={industry.title}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 1,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.12) 50%, rgba(0,0,0,0.08) 100%)",
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 10,
            textAlign: "center",
            padding: "0 2rem",
            maxWidth: "58rem",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.8)",
              marginBottom: "1.2rem",
            }}
          >
            <Icon icon={industry.icon} width="18" />
            Industry Capability
          </span>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.3rem, 5vw, 4rem)",
              color: "white",
              fontWeight: 300,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: "1.2rem",
            }}
          >
            {industry.title}
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.72)",
              fontSize: "1.05rem",
              fontWeight: 300,
              maxWidth: "40rem",
              margin: "0 auto",
              lineHeight: 1.65,
            }}
          >
            {industry.description}
          </p>
        </div>
      </section>

      <section style={{ padding: "6rem 0 2rem" }}>
        <div
          style={{
            maxWidth: "1120px",
            margin: "0 auto",
            padding: "0 2rem",
            display: "grid",
            gap: "2rem",
          }}
        >
          <Link
            href="/industries"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              textDecoration: "none",
              color: "var(--color-primary)",
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              fontWeight: 600,
            }}
          >
            <Icon icon="lucide:arrow-left" width="16" />
            Back to all industries
          </Link>

          <p
            style={{
              margin: 0,
              color: "var(--color-secondary)",
              fontSize: "1.05rem",
              lineHeight: 1.75,
              maxWidth: "48rem",
              fontWeight: 300,
            }}
          >
            {industry.overview}
          </p>
        </div>
      </section>

      <section style={{ padding: "1rem 0 3rem" }}>
        <div
          style={{
            maxWidth: "1120px",
            margin: "0 auto",
            padding: "0 2rem",
            display: "grid",
            gap: "1.5rem",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
              fontWeight: 300,
              color: "var(--color-primary)",
            }}
          >
            How we approach {industry.title.toLowerCase()}
          </h2>
          {industry.deepDive.split("\n\n").map((paragraph) => (
            <p
              key={paragraph}
              style={{
                margin: 0,
                color: "var(--color-secondary)",
                fontSize: "1.03rem",
                lineHeight: 1.8,
                fontWeight: 300,
                maxWidth: "70rem",
              }}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section style={{ padding: "0 0 2rem" }}>
        <div
          style={{
            maxWidth: "1120px",
            margin: "0 auto",
            padding: "0 2rem",
            border: "1px solid var(--color-line)",
            backgroundColor: "white",
          }}
        >
          <div style={{ padding: "2rem" }}>
            <h2
              style={{
                margin: "0 0 1rem 0",
                fontFamily: "'Playfair Display', serif",
                fontSize: "2rem",
                fontWeight: 300,
                color: "var(--color-primary)",
              }}
            >
              Typical Project Scopes
            </h2>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "0.8rem" }}>
              {industry.projectExamples.map((item) => (
                <li key={item} style={{ display: "flex", gap: "0.65rem", alignItems: "flex-start" }}>
                  <Icon icon="lucide:circle-dot" width="16" style={{ marginTop: "0.2rem", color: "var(--color-accent)" }} />
                  <span style={{ color: "var(--color-secondary)", lineHeight: 1.6 }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section style={{ padding: "2.5rem 0 6.5rem" }}>
        <div
          style={{
            maxWidth: "1120px",
            margin: "0 auto",
            padding: "0 2rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.25rem",
          }}
        >
          <div
            style={{
              border: "1px solid var(--color-line)",
              backgroundColor: "white",
              padding: "1.75rem",
            }}
          >
            <h2
              style={{
                margin: "0 0 1.2rem 0",
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.8rem",
                fontWeight: 300,
                color: "var(--color-primary)",
              }}
            >
              Key Challenges
            </h2>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "0.9rem" }}>
              {industry.challenges.map((item) => (
                <li
                  key={item}
                  style={{ display: "flex", gap: "0.7rem", alignItems: "flex-start", color: "var(--color-secondary)" }}
                >
                  <Icon icon="lucide:alert-triangle" width="16" style={{ marginTop: "0.2rem", color: "#b45309" }} />
                  <span style={{ lineHeight: 1.55, fontSize: "0.96rem" }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            style={{
              border: "1px solid var(--color-line)",
              backgroundColor: "white",
              padding: "1.75rem",
            }}
          >
            <h2
              style={{
                margin: "0 0 1.2rem 0",
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.8rem",
                fontWeight: 300,
                color: "var(--color-primary)",
              }}
            >
              Solution Focus
            </h2>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "0.9rem" }}>
              {industry.solutions.map((item) => (
                <li
                  key={item}
                  style={{ display: "flex", gap: "0.7rem", alignItems: "flex-start", color: "var(--color-secondary)" }}
                >
                  <Icon icon="lucide:wrench" width="16" style={{ marginTop: "0.2rem", color: "var(--color-accent)" }} />
                  <span style={{ lineHeight: 1.55, fontSize: "0.96rem" }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            style={{
              border: "1px solid var(--color-line)",
              backgroundColor: "white",
              padding: "1.75rem",
            }}
          >
            <h2
              style={{
                margin: "0 0 1.2rem 0",
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.8rem",
                fontWeight: 300,
                color: "var(--color-primary)",
              }}
            >
              Operational Benefits
            </h2>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "0.9rem" }}>
              {industry.benefits.map((item) => (
                <li
                  key={item}
                  style={{ display: "flex", gap: "0.7rem", alignItems: "flex-start", color: "var(--color-secondary)" }}
                >
                  <Icon icon="lucide:check-circle-2" width="16" style={{ marginTop: "0.2rem", color: "#15803d" }} />
                  <span style={{ lineHeight: 1.55, fontSize: "0.96rem" }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section style={{ padding: "6rem 0", backgroundColor: "#003366" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto", padding: "0 2rem", textAlign: "center" }}>
          <h2
            style={{
              margin: "0 0 1.25rem 0",
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 5vw, 3.3rem)",
              fontWeight: 300,
              lineHeight: 1.15,
              color: "white",
            }}
          >
            Ready to scope your project?
          </h2>
          <p
            style={{
              margin: "0 0 2rem 0",
              color: "rgba(255,255,255,0.72)",
              fontSize: "1.05rem",
              fontWeight: 300,
              lineHeight: 1.65,
            }}
          >
            Speak with our team for a recommendation matched to your site conditions and performance targets.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href={industry.productsLink}
              style={{
                padding: "1rem 2rem",
                textDecoration: "none",
                backgroundColor: "var(--color-accent)",
                color: "white",
                fontSize: "0.68rem",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                fontWeight: 600,
              }}
            >
              View Relevant Products
            </Link>
            <Link
              href="/contact"
              style={{
                padding: "1rem 2rem",
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.4)",
                color: "white",
                fontSize: "0.68rem",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                fontWeight: 600,
              }}
            >
              Contact Engineering Team
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <GSAPAnimations />
    </main>
  );
}
