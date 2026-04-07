"use client";

export default function FooterForm() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      style={{ width: "100%", position: "relative", marginBottom: "2rem" }}
    >
      <input
        type="email"
        placeholder="Email Address"
        className="email-input"
      />
      <button 
        type="submit" 
        className="send-btn"
        style={{ color: "var(--color-accent)" }}
      >
        Send
      </button>
    </form>
  );
}
