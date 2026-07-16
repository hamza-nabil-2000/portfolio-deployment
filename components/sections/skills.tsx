import { Wrench } from "lucide-react";
import { qaSkills, devSkills } from "@/lib/portfolio-data";

export default function Skills() {
  return (
    <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 border-t border-border/50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mt-8 md:mt-12 mb-8 md:mb-12">
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
  );
}
