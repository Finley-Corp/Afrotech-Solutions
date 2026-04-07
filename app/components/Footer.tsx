import Link from "next/link";
import FooterForm from "./FooterForm";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--color-line)",
        paddingTop: "3.5rem",
        paddingBottom: "3.5rem",
        paddingLeft: "3rem",
        paddingRight: "3rem",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "3rem 5rem",
          }}
        >
          {/* Brand */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.875rem",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                color: "var(--color-primary)",
                marginBottom: "2rem",
              }}
            >
              AFROTECH
            </h3>
            <p
              style={{
                color: "var(--color-secondary)",
                fontSize: "0.875rem",
                fontWeight: 300,
                lineHeight: 1.75,
                maxWidth: "200px",
              }}
            >
              Industrial water pump solutions for agriculture, construction,
              and municipal applications across East Africa.
            </p>
          </div>

          {/* Explore */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <span
              style={{
                display: "block",
                fontSize: "0.625rem",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "rgba(87,83,78,0.5)",
                marginBottom: "2rem",
              }}
            >
              Explore
            </span>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                { label: "Our Products", href: "/products" },
                { label: "Our Projects", href: "/projects" },
                { label: "About Us", href: "/about" },
                { label: "Get A Quote", href: "/quote" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    style={{
                      color: "var(--color-primary)",
                      textDecoration: "none",
                      fontSize: "0.875rem",
                      fontWeight: 300,
                      transition: "color 0.3s",
                    }}
                    className="footer-link"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Visit */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <span
              style={{
                display: "block",
                fontSize: "0.625rem",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "rgba(87,83,78,0.5)",
                marginBottom: "2rem",
              }}
            >
              Visit
            </span>
            <p
              style={{
                fontSize: "0.875rem",
                fontWeight: 300,
                color: "var(--color-primary)",
                lineHeight: 1.75,
                marginBottom: "2rem",
              }}
            >
              Afrotech
              <br />
              NML Towers
              <br />
              Tsavo Road, South B
              <br />
              Nairobi
              <br />
              Kenya
            </p>
            <span
              style={{
                display: "block",
                fontSize: "0.625rem",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "rgba(87,83,78,0.5)",
                marginBottom: "0.5rem",
              }}
            >
              Technical Support
            </span>
            <p
              style={{
                fontSize: "0.875rem",
                fontWeight: 300,
                color: "var(--color-secondary)",
                lineHeight: 1.75,
              }}
            >
              Mon–Sat — 10:00–18:00
              <br />
              By appointment Sunday
            </p>
          </div>

          {/* Inquiries */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <span
              style={{
                display: "block",
                fontSize: "0.625rem",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "rgba(87,83,78,0.5)",
                marginBottom: "2rem",
              }}
            >
              Inquiries
            </span>
            <p
              style={{
                fontSize: "0.875rem",
                fontWeight: 300,
                color: "var(--color-secondary)",
                marginBottom: "1.5rem",
                lineHeight: 1.75,
                maxWidth: "240px",
              }}
            >
              Personal response within 24 hours.
            </p>
            <FooterForm />
            <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <a
                href="mailto:support@afrotech-solutions.com"
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 300,
                  color: "var(--color-primary)",
                  textDecoration: "none",
                  transition: "color 0.3s",
                }}
                className="footer-link"
              >
                support@afrotech-solutions.com
              </a>
              <a
                href="tel:+254712345678"
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 300,
                  color: "var(--color-secondary)",
                  textDecoration: "none",
                  transition: "color 0.3s",
                }}
                className="footer-link"
              >
                +254 712 345 678
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: "1px solid var(--color-line)",
            marginTop: "5rem",
            paddingTop: "2.5rem",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: "2rem",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <span
              style={{
                fontSize: "0.625rem",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "rgba(87,83,78,0.4)",
              }}
            >
              Built with intention.
            </span>
            <p
              style={{
                fontSize: "0.625rem",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "rgba(87,83,78,0.6)",
              }}
            >
              © Afrotech. All rights reserved.
            </p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "2rem 2.5rem" }}>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              {["Privacy", "Terms"].map((t) => (
                <a
                  key={t}
                  href="#"
                  style={{
                    fontSize: "0.625rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    color: "rgba(87,83,78,0.6)",
                    textDecoration: "none",
                    transition: "color 0.3s",
                  }}
                  className="footer-link"
                >
                  {t}
                </a>
              ))}
            </div>
            <div style={{ display: "flex", gap: "1.25rem", color: "rgba(87,83,78,0.5)" }}>
              {/* Instagram */}
              <a
                href="#"
                style={{ color: "inherit", transition: "color 0.3s", textDecoration: "none" }}
                className="footer-link"
                aria-label="Instagram"
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
              </a>
              {/* Facebook */}
              <a
                href="#"
                style={{ color: "inherit", transition: "color 0.3s", textDecoration: "none" }}
                className="footer-link"
                aria-label="Facebook"
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}
