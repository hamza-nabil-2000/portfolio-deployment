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
    title: "Junior IT Manager",
    period: "October 2026 - Present",
    highlights: [
      "Support daily IT operations, user assistance, and the reliability and security of office systems and services.",
      "Monitor server availability and investigate system, network, account access, and service-related issues.",
      "Support Microsoft 365 account and mailbox administration, MFA, permissions, and email configuration.",
      "Assist with Windows/Linux infrastructure, networking, VPN connectivity, virtual machines, and security practices.",
      "Collaborate with engineering teams on infrastructure troubleshooting and operational improvements.",
    ],
  },
  {
    title: "IT Support Engineer",
    period: "July 2026 - September 2026",
    highlights: [
      "Resolved hardware, software, network, and access issues to minimize operational interruptions.",
      "Installed and maintained Windows and Ubuntu/Linux systems; managed updates, accounts, and permissions.",
      "Used PowerShell, Linux commands, SSH, Docker, and Azure DevOps to support technical operations.",
    ],
  },
  {
    title: "Software Quality Assurance Engineer",
    period: "April 2025 - July 2026",
    highlights: experienceHighlights,
  },
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
  {
    title: "IT Operations & Support",
    items: [
      "Incident troubleshooting",
      "Hardware & software maintenance",
      "User assistance",
      "Root cause analysis",
    ],
  },
  {
    title: "Systems Administration",
    items: [
      "Windows 10/11 & Windows Server",
      "Ubuntu/Linux & macOS",
      "Users, groups, permissions & services",
    ],
  },
  {
    title: "Networking & Remote Access",
    items: [
      "TCP/IP, DNS, DHCP & IP addressing",
      "Wi-Fi & LAN",
      "VPN & SSH",
      "Connectivity diagnostics",
    ],
  },
  {
    title: "Microsoft 365 Administration",
    items: [
      "User accounts",
      "Exchange Online mailboxes",
      "Permissions & MFA",
      "Email configuration",
    ],
  },
  {
    title: "Infrastructure & Monitoring",
    items: [
      "Proxmox VE & virtual machines",
      "Docker",
      "Routine server checks",
      "Wazuh exposure",
    ],
  },
  {
    title: "Scripting & Collaboration",
    items: [
      "PowerShell & Bash",
      "Linux Terminal",
      "Git, GitHub & Azure DevOps",
    ],
  },
  {
    title: "Development & QA Background",
    items: [
      "React/Next.js & Angular",
      "HTML/CSS & MySQL",
      "Playwright with TypeScript",
      "Functional & regression testing",
      "Manual test cases & defect tracking",
    ],
  },
];
