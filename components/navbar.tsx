"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";

const navLinks = [
  { path: "/home", id: "home", label: "Home" },
  { path: "/about", id: "about", label: "About" },
  { path: "/experience", id: "experience", label: "Experience" },
  { path: "/education", id: "education", label: "Education" },
  { path: "/skills", id: "skills", label: "Skills" },
  {
    path: "/certifications",
    id: "certifications",
    label: "Certifications",
  },
  { path: "/contact", id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const scrollToSection = (
    sectionId: string,
    path: string,
    addToHistory = true,
  ) => {
    const section = document.getElementById(sectionId);

    if (!section) return;

    const navbarHeight = 64;

    const sectionPosition =
      section.getBoundingClientRect().top + window.scrollY - navbarHeight;

    window.scrollTo({
      top: sectionPosition,
      behavior: "smooth",
    });

    setActiveSection(sectionId);
    setIsMenuOpen(false);

    if (addToHistory) {
      window.history.pushState({ section: sectionId }, "", path);
    } else {
      window.history.replaceState({ section: sectionId }, "", path);
    }
  };

  // Handle direct URLs and browser Back / Forward
  useEffect(() => {
    const handlePathNavigation = () => {
      const currentPath = window.location.pathname;

      const matchedLink =
        navLinks.find((link) => link.path === currentPath) ?? navLinks[0];

      const scrollToCurrentSection = () => {
        const section = document.getElementById(matchedLink.id);

        if (!section) return;

        const navbarHeight = 64;

        const sectionPosition =
          section.getBoundingClientRect().top + window.scrollY - navbarHeight;

        window.scrollTo({
          top: sectionPosition,
          behavior: "auto",
        });

        setActiveSection(matchedLink.id);
      };

      requestAnimationFrame(scrollToCurrentSection);
    };

    // If user enters just /
    if (window.location.pathname === "/") {
      window.history.replaceState({ section: "home" }, "", "/home");
    }

    handlePathNavigation();

    window.addEventListener("popstate", handlePathNavigation);

    return () => {
      window.removeEventListener("popstate", handlePathNavigation);
    };
  }, []);

  // Detect active section while scrolling
  useEffect(() => {
    let frame = 0;

    const updateSection = () => {
      frame = 0;

      setScrolled(window.scrollY > 50);

      const sections = navLinks
        .map((link) => ({
          ...link,
          element: document.getElementById(link.id),
        }))
        .filter(
          (
            item,
          ): item is typeof item & {
            element: HTMLElement;
          } => item.element !== null,
        );

      if (!sections.length) return;

      let current = sections[0];

      for (const section of sections) {
        if (section.element.getBoundingClientRect().top <= 140) {
          current = section;
        }
      }

      // Ensure Contact becomes active at bottom
      if (
        window.scrollY > 0 &&
        window.scrollY + window.innerHeight >=
          document.documentElement.scrollHeight - 2
      ) {
        current = sections[sections.length - 1];
      }

      setActiveSection(current.id);

      // Update URL while manually scrolling.
      // replaceState prevents creating hundreds of history entries.
      if (window.location.pathname !== current.path) {
        window.history.replaceState({ section: current.id }, "", current.path);
      }
    };

    const scheduleUpdate = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(updateSection);
      }
    };

    window.addEventListener("scroll", scheduleUpdate, {
      passive: true,
    });

    window.addEventListener("resize", scheduleUpdate);

    const observer = new ResizeObserver(scheduleUpdate);

    observer.observe(document.body);

    updateSection();

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);

      window.removeEventListener("resize", scheduleUpdate);

      observer.disconnect();

      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-primary/20 shadow-neon-sm"
          : "bg-background/50 backdrop-blur-sm border-b border-border"
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              type="button"
              onClick={() => scrollToSection("home", "/home")}
              className="flex items-center gap-2.5 group cursor-pointer"
              aria-label="Home"
            >
              <span className="font-bold text-2xl tracking-wider text-primary group-hover:text-accent transition-colors duration-300">
                HN
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center whitespace-nowrap gap-4 xl:gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;

              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => scrollToSection(link.id, link.path)}
                  aria-current={isActive ? "location" : undefined}
                  className={`relative pb-1 cursor-pointer hover:text-primary transition-all duration-300 group ${
                    isActive ? "text-primary" : "text-foreground"
                  }`}
                >
                  {link.label}

                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Theme Toggle + Mobile Menu */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            <div className="lg:hidden">
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-navigation"
                className="flex h-11 w-11 items-center justify-center text-foreground hover:text-primary transition-colors cursor-pointer"
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div
            id="mobile-navigation"
            className="lg:hidden max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain pb-4 space-y-2 animate-slide-down"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;

              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => scrollToSection(link.id, link.path)}
                  aria-current={isActive ? "location" : undefined}
                  className={`block w-full text-left px-4 py-3 rounded-lg transition-all duration-200 border-l-2 cursor-pointer ${
                    isActive
                      ? "text-primary bg-primary/10 border-primary font-semibold"
                      : "text-foreground hover:text-primary hover:bg-primary/10 border-transparent"
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}
