"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function FooterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("submitting");

    const { error } = await supabase
      .from("newsletter_subscriptions")
      .insert([{ email }]);

    if (error) {
      console.error("Newsletter Error:", error);
      setStatus("error");
    } else {
      try {
        const res = await fetch("/api/email/newsletter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        if (!res.ok) console.error("Newsletter email notify failed:", await res.text());
      } catch (err) {
        console.error("Newsletter email notify error:", err);
      }
      setStatus("success");
      setEmail("");
    }
  };

  return (
    <div style={{ width: "100%", position: "relative", marginBottom: "2rem" }}>
      <form
        onSubmit={handleSubmit}
        style={{ width: "100%", position: "relative" }}
      >
        <input
          type="email"
          placeholder={status === "success" ? "Thank you!" : "Email Address"}
          className="email-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "submitting" || status === "success"}
          required
        />
        <button 
          type="submit" 
          className="send-btn"
          disabled={status === "submitting" || status === "success"}
          style={{ 
            color: "var(--color-accent)",
            opacity: (status === "submitting" || status === "success") ? 0.5 : 1
          }}
        >
          {status === "submitting" ? "..." : "Send"}
        </button>
      </form>
      {status === "error" && (
        <p style={{ position: "absolute", bottom: "-1.5rem", left: 0, fontSize: "0.625rem", color: "var(--color-accent)" }}>
          Failed to subscribe. Please try again.
        </p>
      )}
    </div>
  );
}
