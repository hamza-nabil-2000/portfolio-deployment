import { Terminal } from "lucide-react";

export default function About() {
  return (
    <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 border-t border-border/50">
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
              I am a Quality Assurance Engineer focused on improving software
              quality through structured Manual Testing and Practical
              Automation. I possess strong analytical and problem-solving
              skills, complemented by hands-on experience in healthcare
              applications. My experience includes Playwright with TypeScript,
              Functional and Regression testing, Test Case Design, and Defect
              Reporting.
            </p>
          </div>
          <div className="space-y-4">
            <p className="text-base sm:text-lg text-foreground/80 leading-relaxed text-left sm:text-justify">
              I hold a BS in Information Technology with a 3.51 GPA from PMAS
              Arid Agriculture University and currently work at CHI
              Technologies in Islamabad. Alongside QA work, I also have
              working knowledge of HTML5, CSS3, PHP, Angular, and
              ReactJS/NextJS.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
