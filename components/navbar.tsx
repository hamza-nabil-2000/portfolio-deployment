"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/#home", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#education", label: "Education" },
  { href: "/#skills", label: "Skills" },
  { href: "/#certifications", label: "Certifications" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    let frame = 0;
    const updateSection = () => {
      frame = 0;
      setScrolled(window.scrollY > 50);
      const sections = navLinks
        .map((link) => document.getElementById(link.href.split("#")[1]))
        .filter((section): section is HTMLElement => section !== null);
      if (!sections.length) return;

      // Read the section crossing just below the fixed navbar. Gaps, including
      // the About statistics, continue to belong to the preceding section.
      let current = sections[0].id;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= 140) current = section.id;
      }
      // Short final sections may never reach the navbar before the page ends.
      if (window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
        current = sections[sections.length - 1].id;
      }
      setActiveSection(current);
    };
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateSection);
    };
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("hashchange", scheduleUpdate);
    const observer = new ResizeObserver(scheduleUpdate);
    observer.observe(document.body);
    updateSection();
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("hashchange", scheduleUpdate);
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-primary/20 shadow-neon-sm"
          : "bg-background/50 backdrop-blur-sm border-b border-border"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a
              href="/#home"
              onClick={closeMenu}
              className="flex items-center gap-2.5 group"
              aria-label="Home"
            >

              <span className="font-bold text-2xl tracking-wider text-primary group-hover:text-accent transition-colors duration-300">
                HN
              </span>
            </a>
          </div>

          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => {
              const section = link.href.split("#")[1];
              const isActive = activeSection === section;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  aria-current={isActive ? "location" : undefined}
                  className={`relative pb-1 hover:text-primary transition-all duration-300 group ${
                    isActive ? "text-primary" : "text-foreground"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </a>
              );
            })}
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              className="text-foreground hover:text-primary transition-colors cursor-pointer"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div id="mobile-navigation" className="lg:hidden pb-4 space-y-2 animate-slide-down">
            {navLinks.map((link) => {
              const section = link.href.split("#")[1];
              const isActive = activeSection === section;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  aria-current={isActive ? "location" : undefined}
                  className={`block w-full text-left px-4 py-3 rounded-lg transition-all duration-200 border-l-2 ${
                    isActive
                      ? "text-primary bg-primary/10 border-primary font-semibold"
                      : "text-foreground hover:text-primary hover:bg-primary/10 border-transparent"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}
