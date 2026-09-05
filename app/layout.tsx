import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans, Fira_Code } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Cursor from "@/components/cursor";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Hamza Nabil - IT Support Engineer",
    template: "%s | Hamza Nabil",
  },
  description:
    "IT Support Engineer with hands-on experience in hardware, software, Windows and Linux, networking, system configuration, and user access troubleshooting. Background in QA and software development.",
  keywords: [
    "IT Support Engineer",
    "Windows and Linux",
    "Networking",
    "Technical Support",
    "Playwright",
    "Selenium",
    "Quality Assurance",
    "Manual Testing",
    "Automation Testing",
    "Test Case Design",
    "Defect Reporting",
    "Healthcare Applications",
  ],
  authors: [{ name: "Hamza Nabil", url: "https://hamzanabil.com" }],
  creator: "Hamza Nabil",
  publisher: "Hamza Nabil",
  generator: "v0.app",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hamzanabil.com",
    siteName: "Hamza Nabil - IT Support Engineer",
    title: "Hamza Nabil - IT Support Engineer",
    description:
      "IT Support Engineer helping people resolve hardware, software, networking, and user access issues.",
    images: [
      {
        url: "/pfp.jpeg",
        alt: "Hamza Nabil - IT Support Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hamza Nabil - IT Support Engineer",
    description:
      "IT Support Engineer with a background in QA and software development.",
    images: ["/pfp.jpeg"],
    creator: "@hamzanabil",
    site: "@hamzanabil",
  },
  manifest: "/site.webmanifest",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
  category: "technology",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://hamzanabil.com"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f0f9ff" },
    { media: "(prefers-color-scheme: dark)", color: "#0c4a6e" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakarta.variable} ${firaCode.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-sans antialiased min-h-screen">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-sky-600 focus:text-white focus:rounded-lg focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
        >
          Skip to main content
        </a>

        <Cursor />

        <Navbar />

        <div id="main-content" className="relative z-0">
          {children}
        </div>

        <Footer />

        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
