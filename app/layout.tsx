import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans, Fira_Code } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Cursor from "@/components/cursor";
import { ThemeProvider } from "@/components/theme-provider";
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
    default: "Hamza Nabil - Junior IT Manager",
    template: "%s | Hamza Nabil",
  },
  description:
    "Junior IT Manager at CHI Technologies with experience in Windows/Linux administration, IT operations, Microsoft 365, networking, server monitoring, and virtualization. Background in QA and web development.",
  keywords: [
    "Junior IT Manager",
    "IT Operations",
    "Microsoft 365 Administration",
    "Server Monitoring",
    "Proxmox VE",
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
    siteName: "Hamza Nabil - Junior IT Manager",
    title: "Hamza Nabil - Junior IT Manager",
    description:
      "Junior IT Manager focused on reliable IT operations, Microsoft 365 administration, server monitoring, security, and responsive user support.",
    images: [
      {
        url: "/pfp.jpeg",
        alt: "Hamza Nabil - Junior IT Manager",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hamza Nabil - Junior IT Manager",
    description:
      "Junior IT Manager with experience in IT operations, Windows/Linux, Microsoft 365, networking, and virtualization.",
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
    { media: "(prefers-color-scheme: light)", color: "#f8faff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a1020" },
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
      className={`${inter.variable} ${plusJakarta.variable} ${firaCode.variable} dark`}
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
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
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
        </ThemeProvider>
      </body>
    </html>
  );
}
