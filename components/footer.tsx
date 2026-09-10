"use client";

import { Linkedin, Mail, Github } from "lucide-react";

const emailDraftUrl =
  "https://mail.google.com/mail/?view=cm&fs=1&to=hamzapk@gmail.com";

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

export default function Footer() {
  const scrollToSection = (sectionId: string, path: string) => {
    const section = document.getElementById(sectionId);

    if (!section) return;

    const navbarHeight = 64;

    const sectionPosition =
      section.getBoundingClientRect().top + window.scrollY - navbarHeight;

    window.scrollTo({
      top: sectionPosition,
      behavior: "smooth",
    });

    window.history.pushState({ section: sectionId }, "", path);
  };

  return (
    <footer className="fixed bottom-0 left-0 w-full z-40 border-t border-primary/20 bg-background/95 backdrop-blur-md">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-4">
          {/* Copyright */}
          <p className="text-sm text-foreground/60 text-center xl:text-left">
            &copy; {new Date().getFullYear()} Hamza Nabil. All rights reserved.
          </p>

          {/* Navigation Links */}
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-2"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollToSection(link.id, link.path)}
                className="text-sm text-foreground/60 hover:text-primary transition-colors duration-300 cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex items-center justify-center xl:justify-end gap-6 text-foreground/60">
            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/hamza-nabeel"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-primary transition-all duration-300 hover:scale-110 cursor-pointer"
            >
              <Linkedin size={20} />
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/hamza-nabil-2000"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-primary transition-all duration-300 hover:scale-110 cursor-pointer"
            >
              <Github size={20} />
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/923318213810"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="hover:text-primary transition-all duration-300 hover:scale-110 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M20.52 3.48A11.9 11.9 0 0012 0C5.37 0 .02 5.35 0 12c0 2.11.55 4.1 1.51 5.84L0 24l6.33-1.66A11.94 11.94 0 0012 24c6.62 0 12-5.38 12-12 0-3.2-1.24-6.1-3.48-8.52zM12 22a9.96 9.96 0 01-5.2-1.5l-.37-.22-3.76 1 1-3.66-.24-.38A9.97 9.97 0 012 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.56-7.73c-.3-.15-1.77-.88-2.04-.98-.27-.1-.47-.15-.67.15-.2.3-.77.98-.95 1.18-.18.2-.36.23-.66.08-.3-.15-1.27-.47-2.42-1.5-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.38-.02-.53-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.36-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.11 3.22 5.12 4.51.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.08-.12-.3-.2-.63-.35z" />
              </svg>
            </a>

            {/* Email */}
            <a
              href={emailDraftUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Email Me"
              className="hover:text-primary transition-all duration-300 hover:scale-110 cursor-pointer"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
