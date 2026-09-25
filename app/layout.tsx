import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Loader } from "@/components/loader";
import { themeScript } from "@/lib/theme";
import { site } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = site.url;

// Google Search Console → Settings → Ownership verification → "HTML tag".
// Paste only the content="..." token below, then redeploy and click Verify.
const GOOGLE_SITE_VERIFICATION = "REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_TOKEN";

const DEFAULT_TITLE = "Prathamesh Bhandekar — Founding Engineer, Applied AI";
const SHORT_DESCRIPTION =
  "Founding engineer at Stozia building production LLM systems: agentic workflows, document intelligence, retrieval and evaluation.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | Prathamesh Bhandekar",
  },
  description: site.description,
  keywords: [
    "Prathamesh Bhandekar",
    "Founding Engineer",
    "Applied AI engineer",
    "LLM engineer",
    "AI agents",
    "LangGraph",
    "Document intelligence",
    "RAG",
    "LLM evaluation",
    "Pune",
  ],
  authors: [{ name: "Prathamesh Bhandekar", url: SITE_URL }],
  creator: "Prathamesh Bhandekar",
  publisher: "Prathamesh Bhandekar",
  openGraph: {
    title: DEFAULT_TITLE,
    description: SHORT_DESCRIPTION,
    url: SITE_URL,
    siteName: "Prathamesh Bhandekar",
    locale: "en_US",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: SHORT_DESCRIPTION,
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
  email: `mailto:${site.email}`,
  jobTitle: "Founding Engineer",
  description: SHORT_DESCRIPTION,
  worksFor: {
    "@type": "Organization",
    name: site.company.name,
    url: site.company.url,
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pune",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Savitribai Phule Pune University",
    },
    {
      "@type": "CollegeOrUniversity",
      name: "Marathwada Mitra Mandal's Institute of Technology (MMIT), Pune",
    },
  ],
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "degree",
    name: "Bachelor of Engineering (Computer Engineering)",
    recognizedBy: {
      "@type": "CollegeOrUniversity",
      name: "Savitribai Phule Pune University",
    },
  },
  knowsAbout: [
    "Large language models",
    "AI agents",
    "LangGraph",
    "Document intelligence",
    "Information retrieval",
    "Retrieval-augmented generation",
    "LLM evaluation",
    "FastAPI",
    "Next.js",
    "TypeScript",
    "Python",
  ],
  sameAs: [
    site.socials.github,
    site.socials.linkedin,
    site.socials.x,
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
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Loader />
        {children}
      </body>
    </html>
  );
}
