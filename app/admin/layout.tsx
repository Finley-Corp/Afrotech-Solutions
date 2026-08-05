"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "../components/Logo";
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
  const [showPassword, setShowPassword] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("afrotech_admin_auth");
    if (auth === "true") {
      setIsAuthorized(true);
    }
    setAuthChecked(true);

    const onUnauthorized = () => {
      localStorage.removeItem("afrotech_admin_auth");
      setIsAuthorized(false);
    };
    window.addEventListener("afrotech-admin-unauthorized", onUnauthorized);
    return () => window.removeEventListener("afrotech-admin-unauthorized", onUnauthorized);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = password.trim();

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: trimmed }),
      });

      if (res.ok) {
        localStorage.setItem("afrotech_admin_auth", "true");
        setIsAuthorized(true);
        setPassword("");
        return;
      }
      if (res.status === 503) {
        alert("Admin login is not configured. Set ADMIN_PASSWORD in the server environment.");
        return;
      }
    } catch {
      /* network error */
    }

    alert("Invalid password");
  };

  if (!authChecked) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F9FAFB",
        }}
      >
        <Icon icon="lucide:loader-2" className="animate-spin" width="24" />
      </div>
    );
  }

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
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
            <Logo height={44} href={null} />
          </div>
          <h1 style={{ 
            fontFamily: "'Playfair Display', serif", 
            fontSize: "1.5rem", 
            marginBottom: "2rem",
            color: "var(--color-primary)" 
          }}>Admin Portal</h1>
          <form onSubmit={handleLogin}>
            <div style={{ position: "relative", marginBottom: "1.5rem" }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Master Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                style={{
                  width: "100%",
                  padding: "1rem 3rem 1rem 1rem",
                  border: "1px solid var(--color-line)",
                  outline: "none",
                  fontSize: "0.875rem",
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                title={showPassword ? "Hide password" : "Show password"}
                style={{
                  position: "absolute",
                  right: "0.75rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  color: "#6B7280",
                  display: "flex",
                  alignItems: "center",
                  padding: "0.25rem",
                }}
              >
                <Icon icon={showPassword ? "lucide:eye-off" : "lucide:eye"} width={18} />
              </button>
            </div>
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
                cursor: "pointer",
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
          <div style={{ filter: "brightness(0) invert(1)", marginBottom: "0.75rem" }}>
            <Logo height={36} href={null} />
          </div>
          <span style={{ fontSize: "0.625rem", textTransform: "uppercase", opacity: 0.6, letterSpacing: "0.1em" }}>Control Center</span>
        </div>

        <nav style={{ display: "grid", gap: "0.5rem" }}>
          {[
            { label: "Dashboard", href: "/admin", icon: "lucide:layout-dashboard" },
            { label: "Quotations", href: "/admin/quotations", icon: "lucide:file-text" },
            { label: "Service Requests", href: "/admin/service-inquiries", icon: "lucide:wrench" },
            { label: "Inquiries", href: "/admin/contacts", icon: "lucide:mail" },
            { label: "Subscribers", href: "/admin/newsletter", icon: "lucide:users" },
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
            onClick={async () => {
              await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
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
