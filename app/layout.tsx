import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prathamesh Bhandekar | Portfolio website",
  description: "Portfolio website for Prathamesh Bhandekar, a computer science major and AI enthusiast",
  openGraph: {
    title: "Prathamesh Bhandekar | Portfolio website",
    description: "Portfolio website for Prathamesh Bhandekar, a computer science major and AI enthusiast",
    url: "https://bprathamesh.com",
    siteName: "Prathamesh Bhandekar",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prathamesh Bhandekar | Portfolio website",
    description: "Portfolio website for Prathamesh Bhandekar, a computer science major and AI enthusiast",
    creator: "@impra20",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistMono.variable} font-sans antialiased bg-black`}>
        {children}
      </body>
    </html>
  );
}
