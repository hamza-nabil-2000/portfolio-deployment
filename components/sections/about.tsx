import { Terminal } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 border-t border-border/50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mt-8 md:mt-12 mb-8 md:mb-12">
          <div className="p-2 md:p-3 rounded-lg bg-primary/10">
            <Terminal className="text-primary w-7 h-7 md:w-8 md:h-8" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold neon-text-gradient">
            About Me
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="space-y-4">
            <p className="text-base sm:text-lg text-foreground/80 leading-relaxed text-left sm:text-justify">
              I am an IT Support Engineer at CHI Technologies in Islamabad,
              supporting hardware, software, networking, and user access needs.
              My work includes Windows and Ubuntu/Linux troubleshooting, user
              account and permission management, system configuration, and
              software maintenance. I focus on finding root causes and resolving
              technical issues to keep people productive.
            </p>
          </div>
          <div className="space-y-4">
            <p className="text-base sm:text-lg text-foreground/80 leading-relaxed text-left sm:text-justify">
              I hold a BS in Information Technology with a 3.51 GPA from PMAS
              Arid Agriculture University and joined CHI Technologies in October 2024. I moved from software
              development into QA in April 2025, then into IT support in July
              2026. My earlier work includes Playwright automation, healthcare
              application testing, and frontend development with Angular,
              ReactJS, and NextJS.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
