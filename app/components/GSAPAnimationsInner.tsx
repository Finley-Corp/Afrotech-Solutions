"use client";

import { useEffect } from "react";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
export default function GSAPAnimationsInner() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

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
        "-=0.2",
      )
      .to(
        '[data-anim="hero-p"]',
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.4",
      )
      .to(
        '[data-anim="hero-search"]',
        { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: "power3.out" },
        "-=0.6",
      )
      .to(
        '[data-anim="hero-bento-item"]',
        { y: 0, opacity: 1, scale: 1, duration: 0.85, stagger: 0.1, ease: "power3.out" },
        "-=0.55",
      )
      .to(
        '[data-anim="hero-search-item"]',
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: "power3.out" },
        "-=0.7",
      );

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
        },
      );
    });

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
        },
      );
    });

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
        },
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      tl.kill();
    };
  }, []);

  return null;
}
