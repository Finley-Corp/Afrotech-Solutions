"use client";

import { useEffect } from "react";

export default function GSAPAnimations() {
  useEffect(() => {
    // Dynamically load GSAP to avoid SSR issues
    const loadGSAP = async () => {
      // @ts-ignore
      const { gsap } = await import("gsap");
      // @ts-ignore
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      // 1. HERO TIMELINE
      const tl = gsap.timeline();
      tl.to('[data-anim="hero-eyebrow"]', {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.15,
      })
        .to(
          '[data-anim="hero-line"]',
          { y: "0%", opacity: 1, duration: 0.9, stagger: 0.12, ease: "power4.out" },
          "-=0.2"
        )
        .to(
          '[data-anim="hero-p"]',
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.4"
        )
        .to(
          '[data-anim="hero-search"]',
          { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: "power3.out" },
          "-=0.6"
        )
        .to(
          '[data-anim="hero-search-item"]',
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: "power3.out" },
          "-=0.7"
        );

      // 2. SCROLL REVEALS
      gsap.utils.toArray<HTMLElement>('.reveal-fade, [data-anim="fade-delayed"]').forEach((el) => {
        const isDelayed = el.getAttribute("data-anim") === "fade-delayed";
        gsap.to(el, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: isDelayed ? 0.2 : 0,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-anim='stagger']").forEach((container) => {
        gsap.to(Array.from(container.children) as HTMLElement[], {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: container, start: "top 85%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>(".reveal-line-group").forEach((group) => {
        const lines = group.querySelectorAll<HTMLElement>(".reveal-line");
        gsap.to(lines, {
          y: "0%",
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power4.out",
          scrollTrigger: { trigger: group, start: "top 85%", once: true },
        });
      });

      // 3. PARALLAX & SCRUB EFFECTS

      // Scale scrub for cards
      gsap.utils.toArray<HTMLElement>('[data-anim="scale-scrub"]').forEach((inner) => {
        gsap.fromTo(
          inner,
          { scale: 1.04 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: inner.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      // Editorial image scale
      gsap.utils.toArray<HTMLElement>('[data-anim="scale-scrub-editorial"]').forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 1.04 },
          {
            scale: 1.08,
            ease: "none",
            scrollTrigger: {
              trigger: img.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      // Y parallax for inner images
      gsap.utils.toArray<HTMLElement>('[data-anim="parallax-y"]').forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: img.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      // 4. NAVBAR TRANSITION
      const nav = document.getElementById("navbar");
      ScrollTrigger.create({
        start: "top -50",
        onToggle: (self) => {
          if (!nav) return;
          if (self.isActive) {
            gsap.to(nav, {
              backgroundColor: "rgba(255,255,255,0.85)",
              boxShadow: "0 6px 24px rgba(0,0,0,0.03)",
              duration: 0.35,
              ease: "power3.out",
              overwrite: "auto",
            });
          } else {
            gsap.to(nav, {
              backgroundColor: "rgba(255,255,255,0.60)",
              boxShadow: "none",
              duration: 0.35,
              ease: "power3.out",
              overwrite: "auto",
            });
          }
        },
      });
    };

    loadGSAP();
  }, []);

  return null;
}
