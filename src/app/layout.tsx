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

export const metadata: Metadata = {
  title: "ShubhzSecure — Privacy Intelligence Platform",
  description:
    "AI-powered privacy threat modeling, PII scanning across 22+ connectors, and automated compliance — all in one platform built for modern security teams.",
  icons: {
    icon: "/shubhzsecure-landing/logo.png",
    apple: "/shubhzsecure-landing/logo.png",
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
