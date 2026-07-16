import { GraduationCap } from "lucide-react";

export default function Education() {
  return (
    <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 border-t border-border/50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mt-8 md:mt-12 mb-8 md:mb-12">
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
  );
}
