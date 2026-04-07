"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const auth = localStorage.getItem("afrotech_admin_auth");
    if (auth === "true") {
      setIsAuthorized(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple master password for now as requested for the initial setup
    if (password === "afrotech2026") {
      localStorage.setItem("afrotech_admin_auth", "true");
      setIsAuthorized(true);
    } else {
      alert("Invalid password");
    }
  };

  if (!isClient) return null;

  if (!isAuthorized) {
    return (
      <div style={{ 
        minHeight: "100vh", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        backgroundColor: "var(--color-background)",
        padding: "2rem"
      }}>
        <div style={{ 
          maxWidth: "400px", 
          width: "100%", 
          padding: "3rem", 
          backgroundColor: "white", 
          border: "1px solid var(--color-line)",
          borderRadius: "2px",
          textAlign: "center"
        }}>
          <h1 style={{ 
            fontFamily: "'Playfair Display', serif", 
            fontSize: "1.5rem", 
            marginBottom: "2rem",
            color: "var(--color-primary)" 
          }}>Admin Portal</h1>
          <form onSubmit={handleLogin}>
            <input 
              type="password" 
              placeholder="Master Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ 
                width: "100%", 
                padding: "1rem", 
                marginBottom: "1.5rem", 
                border: "1px solid var(--color-line)",
                outline: "none",
                fontSize: "0.875rem"
              }}
            />
            <button 
              type="submit" 
              style={{ 
                width: "100%", 
                padding: "1rem", 
                backgroundColor: "var(--color-primary)", 
                color: "white", 
                border: "none",
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              Enter Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#F9FAFB" }}>
      {/* Sidebar */}
      <aside style={{ 
        width: "280px", 
        backgroundColor: "var(--color-primary)", 
        color: "white",
        padding: "2.5rem 1.5rem",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        height: "100vh"
      }}>
        <div style={{ marginBottom: "4rem" }}>
          <h2 style={{ 
            fontFamily: "'Playfair Display', serif", 
            fontSize: "1.5rem", 
            letterSpacing: "-0.02em" 
          }}>AFROTECH</h2>
          <span style={{ fontSize: "0.625rem", textTransform: "uppercase", opacity: 0.6, letterSpacing: "0.1em" }}>Control Center</span>
        </div>

        <nav style={{ display: "grid", gap: "0.5rem" }}>
          {[
            { label: "Dashboard", href: "/admin", icon: "lucide:layout-dashboard" },
            { label: "Quotations", href: "/admin/quotations", icon: "lucide:file-text" },
            { label: "Inquiries", href: "/admin/contacts", icon: "lucide:mail" },
            { label: "Subscribers", href: "/admin/newsletter", icon: "lucide:users" },
            { label: "Products", href: "/admin/products", icon: "lucide:package" },
          ].map((item) => (
            <Link 
              key={item.href}
              href={item.href}
              style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "1rem", 
                padding: "1rem", 
                borderRadius: "4px",
                textDecoration: "none",
                color: "white",
                fontSize: "0.875rem",
                fontWeight: pathname === item.href ? 500 : 300,
                backgroundColor: pathname === item.href ? "rgba(255,255,255,0.1)" : "transparent",
                transition: "background-color 0.2s"
              }}
            >
              <Icon icon={item.icon} width="18" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div style={{ marginTop: "auto" }}>
          <button 
            onClick={() => {
              localStorage.removeItem("afrotech_admin_auth");
              setIsAuthorized(false);
            }}
            style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "1rem", 
              padding: "1rem", 
              color: "rgba(255,255,255,0.6)", 
              background: "none", 
              border: "none", 
              cursor: "pointer",
              fontSize: "0.875rem"
            }}
          >
            <Icon icon="lucide:log-out" width="18" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, marginLeft: "280px", padding: "3rem" }}>
        {children}
      </main>
    </div>
  );
}
