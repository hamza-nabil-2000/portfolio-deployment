import { Shield, ChevronRight } from "lucide-react";
import { roles } from "@/lib/portfolio-data";

export default function Experience() {
  return (
    <section id="experience" className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 border-t border-border/50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mt-8 md:mt-12 mb-8 md:mb-12">
          <div className="p-2 md:p-3 rounded-lg bg-primary/10">
            <Shield className="text-primary w-7 h-7 md:w-8 md:h-8" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold neon-text-gradient">
            Experience
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary/20 hidden md:block"></div>

          <p className="text-muted-foreground mb-6 md:ml-16">CHI Technologies Pvt. Ltd., Islamabad · October 2024 - Present</p>
          <div className="space-y-8">
            {roles.map((role) => (
            <div key={role.title} className="relative neon-card p-6 md:p-8 ml-0 md:ml-16 group">
              <div className="absolute left-0 top-8 -translate-x-1/2 hidden md:block">
                <div className="w-4 h-4 rounded-full bg-primary border-4 border-background shadow-neon-sm"></div>
              </div>
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-start justify-between mb-4 md:mb-6 gap-3 sm:gap-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-primary">
                    {role.title}
                  </h3>
                  <p className="text-base md:text-lg text-foreground/80 mt-1">
                    CHI Technologies Pvt. Ltd., Islamabad
                  </p>
                </div>
                <span className="text-sm text-primary border border-primary/30 px-4 py-2 rounded-full bg-primary/5">
                  {role.period}
                </span>
              </div>
              <ul className="space-y-4">
                {role.highlights.map((item, index) => (
                  <li
                    key={index}
                    className="flex gap-3 items-start group/item"
                  >
                    <ChevronRight
                      size={20}
                      className="text-primary mt-1 flex-shrink-0 group-hover/item:translate-x-1 transition-transform"
                    />
                    <span className="text-foreground/80 text-left sm:text-justify">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
