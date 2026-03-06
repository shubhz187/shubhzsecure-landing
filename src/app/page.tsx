import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import InsightSection from "@/components/InsightSection";
// import TestimonialsSection from "@/components/TestimonialsSection"; // Hidden until real customers
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
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
