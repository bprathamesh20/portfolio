import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://www.bprathamesh.com";

// Google Search Console → Settings → Ownership verification → "HTML tag".
// Paste only the content="..." token below, then redeploy and click Verify.
const GOOGLE_SITE_VERIFICATION = "REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_TOKEN";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Prathamesh Bhandekar — Full-Stack Engineer & AI Developer",
  description:
    "Prathamesh Bhandekar is a full-stack engineer and AI developer studying Computer Science at MMIT, Pune. Building AI-powered products — explore the projects and resume.",
  alternates: {
    canonical: "/",
  },
  authors: [{ name: "Prathamesh Bhandekar", url: SITE_URL }],
  creator: "Prathamesh Bhandekar",
  publisher: "Prathamesh Bhandekar",
  openGraph: {
    title: "Prathamesh Bhandekar — Full-Stack Engineer & AI Developer",
    description:
      "Full-stack engineer and AI developer studying Computer Science at MMIT, Pune. Building AI-powered products.",
    url: SITE_URL,
    siteName: "Prathamesh Bhandekar",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prathamesh Bhandekar — Full-Stack Engineer & AI Developer",
    description:
      "Full-stack engineer and AI developer studying Computer Science at MMIT, Pune. Building AI-powered products.",
    creator: "@impra20",
  },
  ...(GOOGLE_SITE_VERIFICATION.startsWith("REPLACE")
    ? {}
    : { verification: { google: GOOGLE_SITE_VERIFICATION } }),
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Prathamesh Bhandekar",
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image.png`,
  jobTitle: "Full-Stack Engineer",
  description:
    "Full-stack engineer and AI developer studying Computer Science at MMIT, Pune. Building AI-powered products.",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Marathwada Mitra Mandal's Institute of Technology (MMIT), Pune",
  },
  knowsAbout: [
    "Full-Stack Development",
    "Artificial Intelligence",
    "Machine Learning",
    "Web Development",
    "React",
    "Next.js",
  ],
  sameAs: [
    "https://github.com/bprathamesh20",
    "https://www.linkedin.com/in/prathamesh-bhandekar/",
    "https://x.com/impra20",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
