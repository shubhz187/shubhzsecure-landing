import type { Metadata } from "next";
import FeaturesPageClient from "./FeaturesPageClient";

export const metadata: Metadata = {
  title: "Features | ShubhzSecure — PriAITect Platform",
  description:
    "Explore all 17 feature modules of PriAITect: privacy threat modeling, PII scanning, compliance automation, cloud security, data lineage, incident response, and more.",
};

export default function FeaturesPage() {
  return <FeaturesPageClient />;
}
