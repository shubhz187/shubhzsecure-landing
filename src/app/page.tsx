import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import InsightSection from "@/components/InsightSection";
// import TestimonialsSection from "@/components/TestimonialsSection"; // Hidden until real customers
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "ShubhzSecure",
  applicationCategory: "SecurityApplication",
  description:
    "AI-powered privacy threat modeling, PII scanning across 22+ connectors, and automated compliance for modern security teams.",
  url: "https://shubhzsecure.shubhztechwork.com",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Free Trial" },
};

export default function Home() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <Hero />
      <AboutSection />
      <ServicesSection />
      <InsightSection />
      {/* <TestimonialsSection /> — re-enable when we have actual customers */}
      <CTASection />
      <Footer />
    </main>
  );
}
