"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/education", label: "Education" },
  { href: "/skills", label: "Skills" },
  { href: "/certifications", label: "Certifications" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const activeSection = pathname === "/" ? "home" : pathname.slice(1);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-primary/20 shadow-neon-sm"
          : "bg-background/50 backdrop-blur-sm border-b border-border"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary shadow-neon-sm hover:shadow-neon-lg transition-all duration-300 block"
              aria-label="Home"
            >
              <Image
                src="/pfp.jpeg"
                alt="Hamza Nabil"
                width={40}
                height={40}
                className="object-cover w-full h-full"
              />
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => {
              const section = link.href === "/" ? "home" : link.href.slice(1);
              const isActive = activeSection === section;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative pb-1 text-foreground hover:text-primary transition-all duration-300 group ${
                    isActive ? "text-primary" : ""
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </Link>
              );
            })}
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground hover:text-primary transition-colors cursor-pointer"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden pb-4 space-y-2 animate-slide-down">
            {navLinks.map((link) => {
              const section = link.href === "/" ? "home" : link.href.slice(1);
              const isActive = activeSection === section;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block w-full text-left px-4 py-3 rounded-lg transition-all duration-200 border-l-2 ${
                    isActive
                      ? "text-primary bg-primary/10 border-primary font-semibold"
                      : "text-foreground hover:text-primary hover:bg-primary/10 border-transparent"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}
