"use client";

import { useState, useEffect, useRef } from "react";
import { certifications, projectCards, calcYearsOfExperience } from "@/lib/portfolio-data";

export default function Stats() {
  const statsRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  const targetStats = {
    systems: projectCards[0].items.length,
    certifications: certifications.length,
    experience: calcYearsOfExperience(),
    gpa: 3.51,
  };

  const [stats, setStats] = useState({
    systems: 0,
    certifications: 0,
    experience: 0,
    gpa: 0,
  });

  useEffect(() => {
    const animateStats = () => {
      if (statsRef.current && !hasAnimated.current) {
        const rect = statsRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50 && rect.bottom > 0) {
          hasAnimated.current = true;
          const duration = 2000;
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
                Math.min(
                  targetStats.gpa,
                  targetStats.gpa * progress,
                ).toFixed(2),
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
    animateStats();

    return () => window.removeEventListener("scroll", animateStats);
  }, [targetStats]);

  return (
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
  );
}
