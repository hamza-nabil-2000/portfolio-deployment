import { ArrowUpRight, Check, ScanLine, Activity, Braces } from "lucide-react";
import SectionHeading from "@/components/section-heading";
const projects = [
  {
    name: "DICOM Viewer & Annotator",
    category: "ACADEMIC PROJECT",
    description:
      "A medical imaging tool that brings DICOM viewing and annotation into a web-based workflow.",
    stack: ["ReactJS", "SQL Server"],
    features: [
      "DICOM file viewing and annotation",
      "Medical imaging database integration",
    ],
    type: "imaging",
  },
  {
    name: "Healthcare Quality Assurance",
    category: "PROFESSIONAL WORK",
    description:
      "Functional and regression testing for CHARMS and Prev Health, supporting dependable healthcare applications.",
    stack: ["Manual testing", "Regression testing"],
    features: ["Comprehensive test cases", "Actionable defect reports"],
    type: "health",
  },
  {
    name: "UI Test Automation",
    category: "AUTOMATION WORK",
    description:
      "Reusable Playwright scripts to verify application workflows and improve the efficiency of software testing.",
    stack: ["Playwright", "TypeScript"],
    features: [
      "Automated UI workflow checks",
      "Repeatable regression coverage",
    ],
    type: "code",
  },
];
function Preview({ type }: { type: string }) {
  return (
    <div className={`project-preview ${type}`} aria-hidden="true">
      <div className="preview-window">
        <div className="window-bar">
          <span />
          <span />
          <span />
          <small>
            {type === "imaging"
              ? "dicom / workspace"
              : type === "health"
                ? "quality / checklist"
                : "automation / workflow"}
          </small>
        </div>
        {type === "imaging" ? (
          <div className="scan-layout">
            <div className="scan-sidebar">
              <ScanLine size={20} />
              <i />
              <i />
              <i />
            </div>
            <div className="scan-image">
              <div className="scan-orbit" />
              <span>VIEW · ANNOTATE · EXPLORE</span>
            </div>
          </div>
        ) : type === "health" ? (
          <div className="health-preview">
            <div>
              <Activity size={22} />
              <strong>Quality, at every step.</strong>
            </div>
            {[
              "Functional testing",
              "Regression testing",
              "Defect documentation",
            ].map((t) => (
              <p key={t}>
                <Check size={14} />
                {t}
                <span>CHECK</span>
              </p>
            ))}
          </div>
        ) : (
          <div className="code-preview">
            <p>
              <span>import</span> {"{ test, expect }"}
            </p>
            <p>
              <span>from</span> <em>‘@playwright/test’</em>;
            </p>
            <br />
            <p>
              <span>test</span>(<em>‘user workflow’</em>,
            </p>
            <p>
              {" "}
              <span>async</span> ({"{ page }"}) =&gt; {"{"}
            </p>
            <p>
              {" "}
              <span>await</span> page.goto(<em>‘/’</em>);
            </p>
            <p>{"}"});</p>
            <Braces className="code-icon" size={46} />
          </div>
        )}
      </div>
      <span className="preview-label">ILLUSTRATIVE PREVIEW</span>
    </div>
  );
}
export default function Projects() {
  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <div className="section-top">
          <SectionHeading
            number="04"
            label="SELECTED WORK"
            title="Practical work. Purposeful outcomes."
            description="A selection of projects and contributions across development and quality assurance."
          />
          <a
            className="text-link"
            href="https://github.com/hamza-nabil-2000"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub profile <ArrowUpRight size={17} />
          </a>
        </div>
        <div className="three-grid">
          {projects.map((project) => (
            <article className="card project-card" key={project.name}>
              <Preview type={project.type} />
              <div className="project-body">
                <p className="eyebrow">{project.category}</p>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <div className="badges">
                  {project.stack.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
                <ul className="features">
                  {project.features.map((f) => (
                    <li key={f}>
                      <Check size={14} />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  className="project-link"
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=hamzapk@gmail.com&su=${encodeURIComponent("Tell me about " + project.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Discuss this work <ArrowUpRight size={17} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
