import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ContactModalProvider } from "@/components/ContactModal";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const siteUrl = "https://shubhzsecure.shubhztechwork.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ShubhzSecure — Privacy Intelligence Platform",
    template: "%s | ShubhzSecure",
  },
  description:
    "AI-powered privacy threat modeling, PII scanning across 22+ connectors, and automated compliance — all in one platform built for modern security teams.",
  keywords: [
    "privacy intelligence",
    "PII scanner",
    "threat modeling",
    "data privacy",
    "compliance automation",
    "GDPR",
    "CCPA",
    "HIPAA",
    "AI security",
    "privacy risk assessment",
  ],
  authors: [{ name: "ShubhzSecure" }],
  creator: "ShubhzSecure",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "ShubhzSecure",
    title: "ShubhzSecure — Privacy Intelligence Platform",
    description:
      "AI-powered privacy threat modeling, PII scanning across 22+ connectors, and automated compliance — all in one platform built for modern security teams.",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "ShubhzSecure" }],
  },
  twitter: {
    card: "summary",
    title: "ShubhzSecure — Privacy Intelligence Platform",
    description:
      "AI-powered privacy threat modeling, PII scanning, and compliance automation for modern security teams.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <ContactModalProvider>{children}</ContactModalProvider>
      </body>
    </html>
  );
}
