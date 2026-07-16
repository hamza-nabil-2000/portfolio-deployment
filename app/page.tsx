/**
 * Portfolio Page Component
 * ------------------------
 * A single-page portfolio with scroll-triggered animations,
 * evidence-based skill scoring, and a responsive navigation.
 *
 * Theme: Cyan/Blue neon glow derived from the profile picture (#14b4fa).
 */
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Menu,
  X,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Code2,
  TestTube,
  Layers,
  Award,
  Sparkles,
  ChevronRight,
  Terminal,
  Shield,
  Zap,
  Star,
  ArrowUp,
  GraduationCap,
  Wrench,
} from "lucide-react";

// ── Experience Calculation ──
const EXPERIENCE_START = new Date(2024, 9, 22); // Oct 22, 2024
function calcYearsOfExperience(): number {
  const now = new Date();
  const diffMs = now.getTime() - EXPERIENCE_START.getTime();
  const years = diffMs / (1000 * 60 * 60 * 24 * 365.25);
  return Math.round(years * 10) / 10; // round to 1 decimal
}

// ── Content arrays (single source of truth — edit these to update the whole site) ──
const experienceHighlights = [
  "Performed functional and regression testing for CHARMS and Prev Health systems to ensure product stability.",
  "Developed robust automation scripts using Playwright and TypeScript, significantly improving testing efficiency.",
  "Designed, executed, and maintained comprehensive manual test cases based on evolving business requirements",
  "Identified and documented high-quality defect reports with precise reproduction steps, facilitating faster resolution.",
  "Collaborated cross-functional development and QA teams to maintain high standards of product quality.",
];

const projectCards = [
  {
    icon: TestTube,
    title: "Healthcare Testing",
    items: ["Prev Health Testing", "CHARMS Testing"],
  },
  {
    icon: Code2,
    title: "Automation Work",
    items: [
      "Playwright scripts",
      "TypeScript-based tests",
      "UI workflow checks",
    ],
  },
  {
    icon: Layers,
    title: "Academic Project",
    items: [
      "DICOM Viewer & Annotator using ReactJS",
      "SQL Server database integration",
      "Medical imaging workflow",
    ],
  },
];

const certifications = [
  { title: "Software Testing / QA", provider: "LinkedIn Learning" },
  { title: "Selenium Essential Training", provider: "LinkedIn Learning" },
  { title: "React Full-Stack Site Development", provider: "LinkedIn Learning" },
  {
    title: "Angular: Creating and Hosting a Full-Stack Site",
    provider: "LinkedIn Learning",
  },
];

// Hero description text (included in evidence scanning)
const heroText =
  "Quality Assurance Engineer manual automation testing Playwright TypeScript test case design defect reporting healthcare application testing analytical problem-solving skills";

// Badge text
const badgeText = "QA Engineer Manual Automation";

// Full about paragraphs
const aboutTexts = [
  "Quality Assurance Engineer focused on improving software quality through structured Manual Testing and Practical Automation. Possess strong analytical and problem-solving skills, with hands-on experience in healthcare applications. Experience includes Playwright with TypeScript, Functional and Regression testing, Test Case Design, and Defect Reporting.",
  "BS in Information Technology from PMAS Arid Agriculture University. Working knowledge of HTML5, CSS3, PHP, Angular, ReactJS/NextJS, and SQL Server.",
];

// ── Evidence-based Skill Scoring ──
// Scans content arrays to derive skill levels dynamically.
// No hard-coded maxLevel — the score is computed from real mentions.
interface SkillDef {
  name: string;
  keywords: string[]; // searched in experience, projects, hero, about
  certKeywords: string[]; // searched in certification titles
}

function computeSkillLevel(def: SkillDef): number {
  const hasMatch = (text: string) =>
    def.keywords.some((kw) => new RegExp(kw, "i").test(text));

  const hasCertMatch = (text: string) =>
    def.certKeywords.some((kw) => new RegExp(kw, "i").test(text));

  // Count how many experience highlights mention this skill
  const expMatches = experienceHighlights.filter(hasMatch).length;

  // Project evidence: how many projects mention this skill
  const projMatches = projectCards.filter((p) => p.items.some(hasMatch)).length;

  // Certification evidence
  const certMatch = certifications.some((c) => hasCertMatch(c.title));

  // About / hero / badge presence
  const inAbout = aboutTexts.some(hasMatch);
  const inHero = hasMatch(heroText);
  const inBadge = hasMatch(badgeText);

  // ── Score calculation (max ≈ 95) ──────────────────────────────────────
  // Experience is the strongest signal (you use it professionally)
  let score = 0;
  if (expMatches >= 1) score += 70;
  if (expMatches >= 2) score += 10; // mentioned across multiple duties

  // Supporting evidence
  if (inBadge) score += 5;
  if (inHero) score += 8;
  if (projMatches >= 1) score += 7;
  if (certMatch) score += 8;
  // About mention with no direct experience = working knowledge (scored separately)
  if (inAbout && expMatches === 0) score += 20;
  if (inAbout && expMatches >= 1) score += 5;

  return Math.min(95, score);
}

const qaSkillDefs: SkillDef[] = [
  {
    name: "Playwright (TypeScript)",
    keywords: ["playwright", "typescript", "automation"],
    certKeywords: [],
  },
  {
    name: "Selenium (Introductory)",
    keywords: ["selenium"],
    certKeywords: ["selenium"],
  },
  {
    name: "Manual Testing",
    keywords: ["manual", "test case"],
    certKeywords: ["testing", "qa"],
  },
  {
    name: "Functional Testing",
    keywords: ["functional"],
    certKeywords: ["testing", "qa"],
  },
  {
    name: "Regression Testing",
    keywords: ["regression"],
    certKeywords: ["testing", "qa"],
  },
  { name: "API Testing", keywords: ["api"], certKeywords: [] },
  {
    name: "UI/UX Testing",
    keywords: ["ui", "ux", "workflow", "interface"],
    certKeywords: [],
  },
  {
    name: "Non-functional Testing",
    keywords: ["non-functional", "performance"],
    certKeywords: [],
  },
  {
    name: "Test Case Design",
    keywords: ["test case", "design"],
    certKeywords: ["testing", "qa"],
  },
  {
    name: "Defect Reporting & Bug Tracking",
    keywords: ["defect", "bug"],
    certKeywords: [],
  },
  {
    name: "SDLC & STLC",
    keywords: ["sdlc", "stlc", "lifecycle"],
    certKeywords: [],
  },
  { name: "Agile / Scrum", keywords: ["agile", "scrum"], certKeywords: [] },
];

const devSkillDefs: SkillDef[] = [
  {
    name: "ReactJS / NextJS",
    keywords: ["react", "nextjs", "dicom"],
    certKeywords: ["react"],
  },
  { name: "Angular", keywords: ["angular"], certKeywords: ["angular"] },
  { name: "HTML5 / CSS3", keywords: ["html", "css"], certKeywords: [] },
  { name: "PHP", keywords: ["php"], certKeywords: [] },
  { name: "SQL Queries", keywords: ["sql"], certKeywords: [] },
];

const qaSkills = qaSkillDefs.map((def) => ({
  name: def.name,
  level: computeSkillLevel(def),
}));
const devSkills = devSkillDefs.map((def) => ({
  name: def.name,
  level: computeSkillLevel(def),
}));

/**
 * Main Portfolio Component
 * ------------------------
 * Manages scroll state, active section highlighting, mouse tracking,
 * and statistics counter animations.
 */
export default function Portfolio() {
  const emailDraftUrl =
    "https://mail.google.com/mail/?view=cm&fs=1&to=hamzapk@gmail.com";
  const address = "CB-1023 Hamza Street, Afshan Colony, Rawalpindi";
  const mapsUrl = "https://maps.app.goo.gl/bTykdoirGvFGB9Pr9";
  const rawPhoneNumber = "+92 331 8213810";
  // Sanitize: remove any alphabetical characters and keep only digits/spaces/plus for display.
  const phoneNumber = rawPhoneNumber.replace(/[a-zA-Z]/g, "");
  // Generate tel URL by stripping everything except digits.
  const phoneTelUrl = `tel:${phoneNumber.replace(/\D/g, "")}`;

  // ── UI State ──
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cursorHover, setCursorHover] = useState(false);

  // ── Section Refs ──
  // Used to calculate which section is currently in view.
  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const educationRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const certificationsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  // ── Animated Statistics State ──
  // Values animate from 0 to their target when the stats section scrolls into view.
  const [stats, setStats] = useState({
    systems: 0,
    certifications: 0,
    experience: 0,
    gpa: 0,
  });

  // ── Scroll Reveal Effect ──
  // Watches elements with the .scroll-reveal class and adds "revealed"
  // when they enter the viewport (10% visibility threshold).
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.1 },
    );

    document.querySelectorAll(".scroll-reveal").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // ── Scroll & Mouse Tracking ──
  // Updates nav appearance, active section, scroll-progress bar, and custom cursor position.
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = (scrollY / maxScroll) * 100;

      setScrolled(scrollY > 50);
      setShowScrollTop(scrollY > 500);
      setScrollProgress(progress);

      // Determine which section is currently centered in the viewport
      const sections = [
        { id: "home", ref: heroRef },
        { id: "about", ref: aboutRef },
        { id: "experience", ref: experienceRef },
        { id: "education", ref: educationRef },
        { id: "skills", ref: skillsRef },
        { id: "certifications", ref: certificationsRef },
        { id: "contact", ref: contactRef },
      ];

      // Highlight the section that contains the nav offset line
      const scrollOffset = 120;
      let active = "home";

      if (
        window.innerHeight + scrollY >=
        document.documentElement.scrollHeight - 50
      ) {
        active = "contact";
      } else {
        let found = false;
        for (const section of sections) {
          if (section.ref.current) {
            const rect = section.ref.current.getBoundingClientRect();
            if (rect.top <= scrollOffset && rect.bottom >= scrollOffset) {
              active = section.id;
              found = true;
              break;
            }
          }
        }

        // Between sections: keep the last section that has scrolled past the offset
        if (!found) {
          for (const section of sections) {
            if (section.ref.current) {
              const rect = section.ref.current.getBoundingClientRect();
              if (rect.top <= scrollOffset) {
                active = section.id;
              }
            }
          }
        }
      }

      setActiveSection(active);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    // Trigger scroll event on mount
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // ── Statistics Counter Animation ──
  // Counts up from 0 when the stats section enters the viewport (runs once).
  useEffect(() => {
    const targetStats = {
      systems: projectCards[0].items.length, // derived from Healthcare Testing project items
      certifications: certifications.length, // derived from certifications array
      experience: calcYearsOfExperience(),
      gpa: 3.51,
    };

    const animateStats = () => {
      if (statsRef.current && !hasAnimated.current) {
        const rect = statsRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50 && rect.bottom > 0) {
          hasAnimated.current = true;
          const duration = 2000; // 2 seconds
          const steps = 60;
          const intervalTime = duration / steps;
          let currentStep = 0;

          const interval = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;

            setStats({
              systems: Math.min(
                targetStats.systems,
                Math.floor(targetStats.systems * progress),
              ),
              certifications: Math.min(
                targetStats.certifications,
                Math.floor(targetStats.certifications * progress),
              ),
              experience: Number(
                Math.min(
                  targetStats.experience,
                  targetStats.experience * progress,
                ).toFixed(1),
              ),
              gpa: Number(
                Math.min(targetStats.gpa, targetStats.gpa * progress).toFixed(
                  2,
                ),
              ),
            });

            if (currentStep >= steps) {
              clearInterval(interval);
            }
          }, intervalTime);
        }
      }
    };

    window.addEventListener("scroll", animateStats);
    animateStats(); // Check on mount

    return () => window.removeEventListener("scroll", animateStats);
  }, []);

  // ── Helpers ──

  /** Smooth-scroll to a section and close the mobile menu. */
  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  /** Smooth-scroll back to the top of the page. */
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ── Render ──
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* ── Custom Cursor ── */}
      <div
        className="fixed pointer-events-none z-[100] hidden lg:block"
        style={{
          transform: `translate(${mousePosition.x - (cursorHover ? 28 : 20)}px, ${mousePosition.y - (cursorHover ? 28 : 20)}px) scale(${cursorHover ? 1.8 : 1})`,
          transition: "transform 0.15s ease-out",
        }}
      >
        <div
          className="w-10 h-10 rounded-full border-2"
          style={{
            borderColor: cursorHover
              ? "hsl(198 96% 30%)"
              : "hsl(198 96% 53%)",
            boxShadow: cursorHover
              ? "0 0 25px hsla(var(--neon-green), 0.7)"
              : "0 0 20px hsla(var(--neon-green), 0.5)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{
            backgroundColor: cursorHover
              ? "hsl(198 96% 30%)"
              : "hsl(198 96% 53%)",
            boxShadow: cursorHover
              ? "0 0 12px hsla(var(--neon-green), 1)"
              : "0 0 8px hsla(var(--neon-green), 0.8)",
          }}
        />
      </div>

      {/* ── Scroll Progress Bar ──
       * Thin gradient bar at the very top showing reading progress. */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-primary/20 z-[60]">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* ── Fixed Navigation ── */}
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
              {/* Profile picture as navbar logo on all screen sizes */}
              <button
                onClick={scrollToTop}
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary shadow-neon-sm hover:shadow-neon-lg transition-all duration-300"
                aria-label="Scroll to top"
              >
                <Image
                  src="/pfp.jpeg"
                  alt="Hamza Nabil"
                  width={40}
                  height={40}
                  className="object-cover w-full h-full"
                />
              </button>
            </div>

            {/* Desktop Menu — only visible on large screens */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {[
                "home",
                "about",
                "experience",
                "education",
                "skills",
                "certifications",
                "contact",
              ].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  onMouseEnter={() => setCursorHover(true)}
                  onMouseLeave={() => setCursorHover(false)}
                  className={`relative pb-1 text-foreground hover:text-primary transition-all duration-300 group cursor-pointer ${
                    activeSection === section ? "text-primary" : ""
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 ${
                      activeSection === section
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </button>
              ))}
            </div>

            {/* Mobile / Tablet Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                onMouseEnter={() => setCursorHover(true)}
                onMouseLeave={() => setCursorHover(false)}
                className="text-foreground hover:text-primary transition-colors cursor-pointer"
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>

          {/* Mobile / Tablet Dropdown Menu */}
          {isMenuOpen && (
            <div className="lg:hidden pb-4 space-y-2 animate-slide-down">
              {[
                "home",
                "about",
                "experience",
                "education",
                "skills",
                "certifications",
                "contact",
              ].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  onMouseEnter={() => setCursorHover(true)}
                  onMouseLeave={() => setCursorHover(false)}
                  className={`block w-full text-left px-4 py-3 rounded-lg transition-all duration-200 border-l-2 cursor-pointer ${
                    activeSection === section
                      ? "text-primary bg-primary/10 border-primary font-semibold"
                      : "text-foreground hover:text-primary hover:bg-primary/10 border-transparent"
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* ── Hero Section ──
       * Intro, profile picture with neon glow, and contact info card. */}
      <section
        id="home"
        ref={heroRef}
        className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden min-h-[85vh] sm:min-h-[90vh] flex items-center"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse animation-delay-4000 -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className="max-w-6xl mx-auto relative animate-fade-in-up">
          {/* ── Mobile-only Name & Badge (shown above image on small screens) ── */}
          <div className="md:hidden text-center mb-6 space-y-3">
            <h1 className="text-4xl font-bold leading-tight">
              Hamza <span className="neon-text">Nabil</span>
            </h1>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm animate-glow-pulse">
              <Sparkles size={16} />
              <span>QA Engineer (Manual & Automation)</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-6 order-2 md:order-1">
              <h1 className="hidden md:block text-5xl md:text-7xl font-bold leading-tight">
                Hamza <span className="neon-text">Nabil</span>
              </h1>
              <div className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm animate-glow-pulse">
                <Sparkles size={16} />
                <span>QA Engineer (Manual & Automation)</span>
              </div>
              <p className="text-lg sm:text-xl text-muted-foreground animate-slide-in text-justify">
                Delivering reliable software through thoughtful manual and
                automation testing
              </p>
              <div className="space-y-3">
                <p className="text-base sm:text-lg text-foreground/80 leading-relaxed animate-slide-in animation-delay-200 text-justify">
                  Quality Assurance Engineer with {calcYearsOfExperience()}{" "}
                  years of experience in manual and automation testing.
                  Proficient in Playwright (TypeScript), functional and
                  regression testing, test case design, and defect reporting.
                  Possess strong analytical and problem-solving skills,
                  complemented by a BS in Information Technology and hands-on
                  experience in healthcare applications.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 sm:gap-4 pt-4 animate-slide-in animation-delay-400">
                <a
                  href="https://linkedin.com/in/hamza-nabeel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neon-button inline-flex items-center gap-2"
                  onMouseEnter={() => setCursorHover(true)}
                  onMouseLeave={() => setCursorHover(false)}
                >
                  <Linkedin size={20} />
                  LINKEDIN
                </a>
                <a
                  href={emailDraftUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neon-button inline-flex items-center gap-2"
                  onMouseEnter={() => setCursorHover(true)}
                  onMouseLeave={() => setCursorHover(false)}
                >
                  <Mail size={20} />
                  EMAIL ME
                </a>
                <a
                  href="https://wa.me/03318213810"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neon-button inline-flex items-center gap-2"
                  onMouseEnter={() => setCursorHover(true)}
                  onMouseLeave={() => setCursorHover(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M20.52 3.48A11.9 11.9 0 0012 0C5.37 0 .02 5.35 0 12c0 2.11.55 4.1 1.51 5.84L0 24l6.33-1.66A11.94 11.94 0 0012 24c6.62 0 12-5.38 12-12 0-3.2-1.24-6.1-3.48-8.52zM12 22a9.96 9.96 0 01-5.2-1.5l-.37-.22-3.76 1 1-3.66-.24-.38A9.97 9.97 0 012 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.56-7.73c-.3-.15-1.77-.88-2.04-.98-.27-.1-.47-.15-.67.15-.2.3-.77.98-.95 1.18-.18.2-.36.23-.66.08-.3-.15-1.27-.47-2.42-1.5-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.38-.02-.53-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.36-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.11 3.22 5.12 4.51.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.08-.12-.3-.2-.63-.35z" />
                  </svg>
                  WHATSAPP
                </a>
              </div>
            </div>

            {/* Right Column - Profile Picture and Contact Info */}
            <div className="order-1 md:order-2 flex flex-col justify-center h-full">
              {/* Profile Picture — hidden on mobile (shown in navbar instead) */}
              <div className="relative mb-8 hidden md:block">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full blur-2xl animate-pulse"></div>
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 mx-auto rounded-full overflow-hidden border-4 border-primary shadow-neon-lg">
                  <Image
                    src="/pfp.jpeg"
                    alt="Hamza Nabil"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Online Status Badge — positioned outside the overflow-hidden mask */}
                <div className="absolute bottom-2 right-1/2 translate-x-[5.5rem] sm:translate-x-[6.5rem] md:translate-x-[7.5rem]">
                  <div className="relative">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full animate-ping"></div>
                  </div>
                </div>
              </div>

              {/* Contact Info Card */}
              <div className="relative animate-scale-in animation-delay-600">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-3xl animate-pulse"></div>
                <div className="relative neon-card p-6 space-y-4">
                  <div className="flex items-center gap-3 group cursor-pointer"
                    onMouseEnter={() => setCursorHover(true)}
                    onMouseLeave={() => setCursorHover(false)}
                  >
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors flex-shrink-0">
                      <Phone size={20} className="text-primary" />
                    </div>
                    <a
                      href={phoneTelUrl}
                      title="Call"
                      aria-label={`Call ${phoneNumber}`}
                      className="relative z-10 text-foreground text-sm hover:text-primary transition-colors"
                    >
                      {phoneNumber}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 group cursor-pointer"
                    onMouseEnter={() => setCursorHover(true)}
                    onMouseLeave={() => setCursorHover(false)}
                  >
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors flex-shrink-0">
                      <MapPin size={20} className="text-primary" />
                    </div>
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Open in Google Maps"
                      aria-label={`Open ${address} in Google Maps`}
                      className="relative z-10 text-foreground text-sm hover:text-primary transition-colors"
                    >
                      {address}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 group cursor-pointer"
                    onMouseEnter={() => setCursorHover(true)}
                    onMouseLeave={() => setCursorHover(false)}
                  >
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors flex-shrink-0">
                      <Mail size={20} className="text-primary" />
                    </div>
                    <a
                      href={emailDraftUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Send Email"
                      aria-label="Send Email"
                      className="relative z-10 text-foreground text-sm hover:text-primary transition-colors"
                    >
                      hamzapk@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-scroll"></div>
          </div>
        </div>
      </section>

      {/* ── About Section ── */}
      <section
        id="about"
        ref={aboutRef}
        className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 border-t border-border/50 scroll-reveal"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8 md:mb-12">
            <div className="p-2 md:p-3 rounded-lg bg-primary/10">
              <Terminal className="text-primary w-7 h-7 md:w-8 md:h-8" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold neon-text-gradient">
              About Me
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-4">
              <p className="text-base sm:text-lg text-foreground/80 leading-relaxed text-justify">
                I am a Quality Assurance Engineer focused on improving software
                quality through structured Manual Testing and Practical
                Automation. I possess strong analytical and problem-solving
                skills, complemented by hands-on experience in healthcare
                applications. My experience includes Playwright with TypeScript,
                Functional and Regression testing, Test Case Design, and Defect
                Reporting.
              </p>
              {/* <div className="flex items-center gap-3 text-primary">
                <CheckCircle size={20} />
                <span>Playwright and TypeScript automation experience</span>
              </div>
              <div className="flex items-center gap-3 text-primary">
                <CheckCircle size={20} />
                <span>Strong analytical and problem-solving approach</span>
              </div> */}
            </div>
            <div className="space-y-4">
              <p className="text-base sm:text-lg text-foreground/80 leading-relaxed text-justify">
                I hold a BS in Information Technology with a 3.51 GPA from PMAS
                Arid Agriculture University and currently work at CHI
                Technologies in Islamabad. Alongside QA work, I also have
                working knowledge of HTML5, CSS3, PHP, Angular, and
                ReactJS/NextJS.
              </p>
              {/* <div className="flex items-center gap-3 text-primary">
                <CheckCircle size={20} />
                <span>3.51 GPA - BS IT</span>
              </div>
              <div className="flex items-center gap-3 text-primary">
                <CheckCircle size={20} />
                <span>Hands-on healthcare application experience</span>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* ── Animated Statistics Section ── */}
      <section
        ref={statsRef}
        className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 border-t border-border/50 bg-gradient-to-br from-primary/5 to-accent/5"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-3 gap-4 md:gap-8">
            <div className="text-center space-y-2">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold neon-text">
                {stats.certifications}
              </div>
              <div className="text-sm sm:text-base text-muted-foreground">
                Certifications
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold neon-text">
                {stats.experience}
              </div>
              <div className="text-sm sm:text-base text-muted-foreground">
                Years Experience
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold neon-text">
                {stats.gpa}
              </div>
              <div className="text-sm sm:text-base text-muted-foreground">
                CGPA
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Experience Section ──
       * Timeline-style layout with a vertical gradient line on desktop. */}
      <section
        id="experience"
        ref={experienceRef}
        className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 border-t border-border/50 scroll-reveal"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8 md:mb-12">
            <div className="p-2 md:p-3 rounded-lg bg-primary/10">
              <Shield className="text-primary w-7 h-7 md:w-8 md:h-8" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold neon-text-gradient">
              Experience
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary/20 hidden md:block"></div>

            <div className="space-y-8">
              <div className="relative neon-card p-6 md:p-8 ml-0 md:ml-16 group">
                <div className="absolute left-0 top-8 -translate-x-1/2 hidden md:block">
                  <div className="w-4 h-4 rounded-full bg-primary border-4 border-background shadow-neon-sm"></div>
                </div>
                <div className="flex flex-col sm:flex-row sm:flex-wrap items-start justify-between mb-4 md:mb-6 gap-3 sm:gap-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-primary">
                      Software Quality Assurance Engineer
                    </h3>
                    <p className="text-base md:text-lg text-foreground/80 mt-1">
                      CHI Technologies Pvt. Ltd., Islamabad
                    </p>
                  </div>
                  <span className="text-sm text-primary border border-primary/30 px-4 py-2 rounded-full bg-primary/5">
                    October 2024 - Present
                  </span>
                </div>
                <ul className="space-y-4">
                  {experienceHighlights.map((item, index) => (
                    <li
                      key={index}
                      className="flex gap-3 items-start group/item"
                    >
                      <ChevronRight
                        size={20}
                        className="text-primary mt-1 flex-shrink-0 group-hover/item:translate-x-1 transition-transform"
                      />
                      <span className="text-foreground/80 text-justify">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Education Section ── */}
      <section
        id="education"
        ref={educationRef}
        className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 border-t border-border/50 scroll-reveal"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8 md:mb-12">
            <div className="p-2 md:p-3 rounded-lg bg-primary/10">
              <GraduationCap className="text-primary w-7 h-7 md:w-8 md:h-8" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold neon-text-gradient">
              Education
            </h2>
          </div>
          <div className="neon-card p-6 md:p-8 group">
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-start justify-between mb-4 md:mb-6 gap-3 sm:gap-4">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-primary">
                  BS Information Technology (BS IT)
                </h3>
                <p className="text-base md:text-lg text-foreground/80 mt-1">
                  PMAS Arid Agriculture University
                </p>
              </div>
              <span className="text-sm text-primary border border-primary/30 px-4 py-2 rounded-full bg-primary/5">
                February 2020 – February 2024
              </span>
            </div>
            <p className="text-foreground/80 mb-4 text-lg">
              GPA: <span className="text-primary font-bold">3.51</span>
            </p>
            <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20 group-hover:border-primary/40 transition-all">
              <p className="font-semibold text-primary mb-2">
                Final Year Project:
              </p>
              <p className="text-foreground/80 text-justify">
                DICOM Viewer &amp; Annotator - Built a medical imaging tool for
                viewing and annotating DICOM files using ReactJS and SQL Server.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Skills Section ──
       * Two-column layout: QA skills and Development skills with animated bars. */}
      <section
        id="skills"
        ref={skillsRef}
        className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 border-t border-border/50 scroll-reveal"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8 md:mb-12">
            <div className="p-2 md:p-3 rounded-lg bg-primary/10">
              <Wrench className="text-primary w-7 h-7 md:w-8 md:h-8" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold neon-text-gradient">
              Technical Skills
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="neon-card p-5 sm:p-6 md:p-8">
              <h3 className="text-lg md:text-xl font-bold text-primary mb-4 md:mb-6">
                Testing & QA
              </h3>
              <div className="space-y-4">
                {qaSkills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2 gap-2 flex-wrap">
                      <span className="text-foreground/80 text-sm sm:text-base">
                        {skill.name}
                      </span>
                      <span className="text-primary text-sm sm:text-base flex-shrink-0">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="neon-card p-5 sm:p-6 md:p-8">
              <h3 className="text-lg md:text-xl font-bold text-accent mb-4 md:mb-6">
                Development
              </h3>
              <div className="space-y-4">
                {devSkills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2 gap-2 flex-wrap">
                      <span className="text-foreground/80 text-sm sm:text-base">
                        {skill.name}
                      </span>
                      <span className="text-accent text-sm sm:text-base flex-shrink-0">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-accent to-primary rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Certifications Section ── */}
      <section
        id="certifications"
        ref={certificationsRef}
        className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 border-t border-border/50 scroll-reveal"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8 md:mb-12">
            <div className="p-2 md:p-3 rounded-lg bg-primary/10">
              <Award className="text-primary w-7 h-7 md:w-8 md:h-8" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold neon-text-gradient">
              Certifications
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {certifications.map((cert, idx) => (
              <div
                key={idx}
                className="neon-card p-5 md:p-6 flex items-start gap-4 group"
              >
                <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Award className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary">
                    {cert.title}
                  </h3>
                  <p className="text-foreground/80 mt-1">{cert.provider}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact / CTA Section ── */}
      <section
        id="contact"
        ref={contactRef}
        className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 border-t border-border/50 scroll-reveal"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8 md:mb-12">
            <div className="p-2 md:p-3 rounded-lg bg-primary/10">
              <Mail className="text-primary w-7 h-7 md:w-8 md:h-8" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold neon-text-gradient">
              Contact
            </h2>
          </div>
          <div className="neon-card p-6 sm:p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 neon-text-gradient">
              Get In Touch
            </h2>
            <p className="text-base sm:text-lg text-foreground/80 mb-6 md:mb-8 max-w-2xl mx-auto text-justify">
              I am open to Quality Assurance Opportunities where I can
              contribute through Reliable Manual testing, Automation with
              Playwright or Selenium, and thoughtful collaboration with Product
              and Engineering teams.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a
                href={emailDraftUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="neon-button inline-flex items-center gap-2 text-lg"
                onMouseEnter={() => setCursorHover(true)}
                onMouseLeave={() => setCursorHover(false)}
              >
                <Mail size={24} />
                EMAIL ME
              </a>
              <a
                href="https://wa.me/03318213810"
                target="_blank"
                rel="noopener noreferrer"
                className="neon-button inline-flex items-center gap-2 text-lg"
                onMouseEnter={() => setCursorHover(true)}
                onMouseLeave={() => setCursorHover(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M20.52 3.48A11.9 11.9 0 0012 0C5.37 0 .02 5.35 0 12c0 2.11.55 4.1 1.51 5.84L0 24l6.33-1.66A11.94 11.94 0 0012 24c6.62 0 12-5.38 12-12 0-3.2-1.24-6.1-3.48-8.52zM12 22a9.96 9.96 0 01-5.2-1.5l-.37-.22-3.76 1 1-3.66-.24-.38A9.97 9.97 0 012 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.56-7.73c-.3-.15-1.77-.88-2.04-.98-.27-.1-.47-.15-.67.15-.2.3-.77.98-.95 1.18-.18.2-.36.23-.66.08-.3-.15-1.27-.47-2.42-1.5-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.38-.02-.53-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.36-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.11 3.22 5.12 4.51.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.08-.12-.3-.2-.63-.35z" />
                </svg>
                WHATSAPP
              </a>
              <a
                href="https://linkedin.com/in/hamza-nabeel"
                target="_blank"
                rel="noopener noreferrer"
                className="neon-button inline-flex items-center gap-2 text-lg"
                onMouseEnter={() => setCursorHover(true)}
                onMouseLeave={() => setCursorHover(false)}
              >
                <Linkedin size={24} />
                LINKEDIN
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-primary/20 py-6 md:py-8 px-4 sm:px-6 lg:px-8 bg-background/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-foreground/60 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Hamza Nabil. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://linkedin.com/in/hamza-nabeel"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setCursorHover(true)}
              onMouseLeave={() => setCursorHover(false)}
              className="hover:text-primary transition-all duration-300 hover:scale-110 hover:shadow-neon-sm cursor-pointer"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://wa.me/03318213810"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setCursorHover(true)}
              onMouseLeave={() => setCursorHover(false)}
              className="hover:text-primary transition-all duration-300 hover:scale-110 hover:shadow-neon-sm cursor-pointer"
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
            <a
              href={emailDraftUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Email Me"
              onMouseEnter={() => setCursorHover(true)}
              onMouseLeave={() => setCursorHover(false)}
              className="hover:text-primary transition-all duration-300 hover:scale-110 cursor-pointer"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </footer>

      {/* ── Scroll-to-Top Button ──
       * Appears after scrolling 500px; bounces to draw attention. */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 p-3 rounded-full bg-primary text-primary-foreground shadow-neon-lg hover:shadow-neon-xl transition-all duration-300 z-50 animate-bounce"
        >
          <ArrowUp size={24} />
        </button>
      )}

      <style jsx>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes scroll {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(10px);
            opacity: 0;
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-slide-in {
          animation: slideIn 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-scale-in {
          animation: scaleIn 0.5s ease-out forwards;
          opacity: 0;
        }

        .animate-scroll {
          animation: scroll 1.5s ease-in-out infinite;
        }

        .scroll-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease-out;
        }

        .scroll-reveal.revealed {
          opacity: 1;
          transform: translateY(0);
        }

        .hover-scale {
          transition: transform 0.3s ease;
        }

        .hover-scale:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}
