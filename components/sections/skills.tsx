import { Wrench, Check } from "lucide-react";
import { skillGroups } from "@/lib/portfolio-data";

export default function Skills() {
  return (
    <section id="skills" className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 border-t border-border/50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mt-8 md:mt-12 mb-8 md:mb-12">
          <div className="p-2 md:p-3 rounded-lg bg-primary/10"><Wrench className="text-primary w-7 h-7 md:w-8 md:h-8" /></div>
          <h2 className="text-3xl md:text-4xl font-bold neon-text-gradient">Technical Skills</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {skillGroups.map((group) => (
            <div key={group.title} className="neon-card p-5 sm:p-6 md:p-8">
              <h3 className="text-xl font-bold text-primary mb-2">{group.title}</h3>
              {group.note && <p className="text-sm text-muted-foreground mb-4">{group.note}</p>}
              <ul className="space-y-3 mt-5">
                {group.items.map((item) => <li key={item} className="flex items-start gap-3 text-foreground/80"><Check size={18} className="text-primary shrink-0 mt-1" /><span>{item}</span></li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
