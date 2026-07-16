const EXPERIENCE_START = new Date(2024, 9, 22);

export function calcYearsOfExperience(): number {
  const now = new Date();
  const diffMs = now.getTime() - EXPERIENCE_START.getTime();
  const years = diffMs / (1000 * 60 * 60 * 24 * 365.25);
  return Math.round(years * 10) / 10;
}

export const experienceHighlights = [
  "Performed functional and regression testing for CHARMS and Prev Health systems to ensure product stability.",
  "Developed robust automation scripts using Playwright and TypeScript, significantly improving testing efficiency.",
  "Designed, executed, and maintained comprehensive manual test cases based on evolving business requirements",
  "Identified and documented high-quality defect reports with precise reproduction steps, facilitating faster resolution.",
  "Collaborated cross-functional development and QA teams to maintain high standards of product quality.",
];

export const projectCards = [
  {
    icon: null as any,
    title: "Healthcare Testing",
    items: ["Prev Health Testing", "CHARMS Testing"],
  },
  {
    icon: null as any,
    title: "Automation Work",
    items: [
      "Playwright scripts",
      "TypeScript-based tests",
      "UI workflow checks",
    ],
  },
  {
    icon: null as any,
    title: "Academic Project",
    items: [
      "DICOM Viewer & Annotator using ReactJS",
      "SQL Server database integration",
      "Medical imaging workflow",
    ],
  },
];

export const certifications = [
  { title: "Software Testing / QA", provider: "LinkedIn Learning" },
  { title: "Selenium Essential Training", provider: "LinkedIn Learning" },
  { title: "React Full-Stack Site Development", provider: "LinkedIn Learning" },
  {
    title: "Angular: Creating and Hosting a Full-Stack Site",
    provider: "LinkedIn Learning",
  },
];

const heroText =
  "Quality Assurance Engineer manual automation testing Playwright TypeScript test case design defect reporting healthcare application testing analytical problem-solving skills";

const badgeText = "QA Engineer Manual Automation";

const aboutTexts = [
  "Quality Assurance Engineer focused on improving software quality through structured Manual Testing and Practical Automation. Possess strong analytical and problem-solving skills, with hands-on experience in healthcare applications. Experience includes Playwright with TypeScript, Functional and Regression testing, Test Case Design, and Defect Reporting.",
  "BS in Information Technology from PMAS Arid Agriculture University. Working knowledge of HTML5, CSS3, PHP, Angular, ReactJS/NextJS, and SQL Server.",
];

interface SkillDef {
  name: string;
  keywords: string[];
  certKeywords: string[];
}

function computeSkillLevel(def: SkillDef): number {
  const hasMatch = (text: string) =>
    def.keywords.some((kw) => new RegExp(kw, "i").test(text));

  const hasCertMatch = (text: string) =>
    def.certKeywords.some((kw) => new RegExp(kw, "i").test(text));

  const expMatches = experienceHighlights.filter(hasMatch).length;
  const projMatches = projectCards.filter((p) => p.items.some(hasMatch)).length;
  const certMatch = certifications.some((c) => hasCertMatch(c.title));
  const inAbout = aboutTexts.some(hasMatch);
  const inHero = hasMatch(heroText);
  const inBadge = hasMatch(badgeText);

  let score = 0;
  if (expMatches >= 1) score += 70;
  if (expMatches >= 2) score += 10;
  if (inBadge) score += 5;
  if (inHero) score += 8;
  if (projMatches >= 1) score += 7;
  if (certMatch) score += 8;
  if (inAbout && expMatches === 0) score += 20;
  if (inAbout && expMatches >= 1) score += 5;

  return Math.min(95, score);
}

const qaSkillDefs: SkillDef[] = [
  {
    name: "Playwright (TypeScript)",
    keywords: ["playwright", "typescript", "automation"],
    certKeywords: [],
  },
  {
    name: "Selenium (Introductory)",
    keywords: ["selenium"],
    certKeywords: ["selenium"],
  },
  {
    name: "Manual Testing",
    keywords: ["manual", "test case"],
    certKeywords: ["testing", "qa"],
  },
  {
    name: "Functional Testing",
    keywords: ["functional"],
    certKeywords: ["testing", "qa"],
  },
  {
    name: "Regression Testing",
    keywords: ["regression"],
    certKeywords: ["testing", "qa"],
  },
  { name: "API Testing", keywords: ["api"], certKeywords: [] },
  {
    name: "UI/UX Testing",
    keywords: ["ui", "ux", "workflow", "interface"],
    certKeywords: [],
  },
  {
    name: "Non-functional Testing",
    keywords: ["non-functional", "performance"],
    certKeywords: [],
  },
  {
    name: "Test Case Design",
    keywords: ["test case", "design"],
    certKeywords: ["testing", "qa"],
  },
  {
    name: "Defect Reporting & Bug Tracking",
    keywords: ["defect", "bug"],
    certKeywords: [],
  },
  {
    name: "SDLC & STLC",
    keywords: ["sdlc", "stlc", "lifecycle"],
    certKeywords: [],
  },
  { name: "Agile / Scrum", keywords: ["agile", "scrum"], certKeywords: [] },
];

const devSkillDefs: SkillDef[] = [
  {
    name: "ReactJS / NextJS",
    keywords: ["react", "nextjs", "dicom"],
    certKeywords: ["react"],
  },
  { name: "Angular", keywords: ["angular"], certKeywords: ["angular"] },
  { name: "HTML5 / CSS3", keywords: ["html", "css"], certKeywords: [] },
  { name: "PHP", keywords: ["php"], certKeywords: [] },
  { name: "SQL Queries", keywords: ["sql"], certKeywords: [] },
];

export const qaSkills = qaSkillDefs.map((def) => ({
  name: def.name,
  level: computeSkillLevel(def),
}));

export const devSkills = devSkillDefs.map((def) => ({
  name: def.name,
  level: computeSkillLevel(def),
}));
