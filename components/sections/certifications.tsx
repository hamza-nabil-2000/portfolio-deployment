import { Award } from "lucide-react";
import { certifications } from "@/lib/portfolio-data";

export default function Certifications() {
  return (
    <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 border-t border-border/50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mt-8 md:mt-12 mb-8 md:mb-12">
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
  );
}
