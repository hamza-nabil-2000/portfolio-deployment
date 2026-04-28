import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Fira_Code } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
    default: "Hamza Nabil - QA Engineer Portfolio",
    template: "%s | Hamza Nabil",
  },
  description:
    "QA Automation Engineer specializing in Playwright, testing methodologies, and full-stack development. Expert in manual and automation testing with a focus on quality assurance.",
  keywords: [
    "Automation Testing(Playwright + Selenium)",
    "Quality Assurance",
    "Test Case Design",
    "Frontend Design",
    "Manual Testing",
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
    siteName: "Hamza Nabil - QA Engineer",
    title: "Hamza Nabil - QA Automation Engineer",
    description:
      "Professional QA Engineer specializing in Playwright & Selenium Automation, and Manual Testing best practices.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Hamza Nabil - QA Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hamza Nabil - QA Engineer",
    description:
      "QA Automation Engineer specializing in Playwright & Selenium Automation & Manual Testing",
    images: ["/twitter-image.png"],
    creator: "@hamzanabil",
    site: "@hamzanabil",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
        sizes: "32x32",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
        sizes: "32x32",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: [
      {
        url: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/site.webmanifest",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "your-google-verification-code",
    // Add other verification codes as needed
  },
  category: "technology",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://hamzanabil.com"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f0fdf4" },
    { media: "(prefers-color-scheme: dark)", color: "#064e3b" },
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
      <body className="font-sans antialiased bg-gradient-to-br from-green-50 via-emerald-50/30 to-teal-50/20 text-gray-800 min-h-screen">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-green-600 focus:text-white focus:rounded-lg focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Skip to main content
        </a>

        {/* Decorative background elements */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div id="main-content" className="relative z-0">
          {children}
        </div>

        {/* Analytics - only load in production */}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
