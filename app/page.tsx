"use client";

import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Stats from "@/components/sections/stats";
import Experience from "@/components/sections/experience";
import Education from "@/components/sections/education";
import Skills from "@/components/sections/skills";
import Certifications from "@/components/sections/certifications";
import Contact from "@/components/sections/contact";
import ScrollToTop from "@/components/scroll-to-top";

export default function HomePage() {
  return (
    <div className="bg-background text-foreground overflow-x-hidden">
      <Hero />
      <About />
      <Stats />
      <Experience />
      <Education />
      <Skills />
      <Certifications />
      <Contact />
      <ScrollToTop />
    </div>
  );
}
