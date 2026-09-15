"use client";
import { useEffect } from "react";
export default function Reveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    document
      .querySelectorAll(".section-heading, .card, .experience-row")
      .forEach((el) => {
        if (el.getBoundingClientRect().top > window.innerHeight) {
          el.classList.add("will-reveal");
          observer.observe(el);
        }
      });
    return () => {
      observer.disconnect();
      document
        .querySelectorAll(".will-reveal")
        .forEach((el) => el.classList.remove("will-reveal"));
    };
  }, []);
  return null;
}
