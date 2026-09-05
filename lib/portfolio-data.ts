const EXPERIENCE_START = new Date(2024, 9, 22);

export function calcYearsOfExperience(now = new Date()): number {
  let completedMonths =
    (now.getFullYear() - EXPERIENCE_START.getFullYear()) * 12 +
    now.getMonth() -
    EXPERIENCE_START.getMonth();

  if (now.getDate() < EXPERIENCE_START.getDate()) {
    completedMonths -= 1;
  }

  const completedHalfYears = Math.floor(Math.max(0, completedMonths) / 6);
  return completedHalfYears / 2;
}

export function formatYearsOfExperience(): string {
  const years = calcYearsOfExperience();
  return Number.isInteger(years) ? String(years) : `${years}+`;
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

export const roles = [
  {
    title: "IT Support Engineer",
    period: "July 2026 - Present",
    highlights: [
      "Provide day-to-day technical support for hardware, software, networking, and user access issues.",
      "Install, configure, troubleshoot, and maintain Windows and Ubuntu/Linux systems.",
      "Manage user accounts, permissions, system configurations, software updates, and basic system administration tasks.",
      "Use PowerShell, Command Prompt, Linux Terminal, SSH, Git, Azure DevOps, and Docker for technical support and system-related activities.",
      "Identify root causes of technical issues and provide timely resolutions to minimize operational disruption.",
    ],
  },
  { title: "Software Quality Assurance Engineer", period: "April 2025 - July 2026", highlights: experienceHighlights },
  {
    title: "Software Development",
    period: "October 2024 - April 2025",
    highlights: [
      "Contributed to web application development using Angular, ReactJS, and NextJS.",
      "Assisted in developing, modifying, and troubleshooting frontend features.",
      "Worked with Visual Studio Code and MySQL during development activities.",
      "Used Azure DevOps for source code management and team collaboration.",
      "Collaborated with team members to understand requirements, resolve development issues, and support application improvements.",
    ],
  },
];

export const skillGroups = [
  { title: "IT Support & Troubleshooting", items: [
    "Hardware troubleshooting", "Software installation & configuration", "Incident troubleshooting & root cause identification", "System configuration, updates & maintenance", "User accounts, access & permissions",
  ] },
  { title: "Systems & Networking", items: [
    "Windows 10/11, Ubuntu/Linux & macOS", "Windows & Linux administration", "User & group management, file permissions & services", "TCP/IP, DNS, DHCP & IP addressing", "Wi-Fi & LAN troubleshooting, Ping & SSH",
  ] },
  { title: "Tools & Platforms", items: [
    "PowerShell, Command Prompt & Linux Terminal", "Docker", "Git, GitHub & Azure DevOps", "Visual Studio Code & Microsoft Visual Studio", "SQL Server Management Studio",
  ] },
  { title: "Testing & QA", items: [
    "Playwright (TypeScript)", "Selenium (Introductory)", "Manual & automated testing", "Functional, regression, API, UI/UX & non-functional testing", "Test case design, defect reporting & bug tracking", "SDLC, STLC & Agile/Scrum",
  ] },
  { title: "Web Technologies", note: "Working knowledge", items: [
    "HTML5 & CSS3", "PHP", "Angular", "ReactJS & NextJS",
  ] },
];
