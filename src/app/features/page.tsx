import type { Metadata } from "next";
import FeaturesPageClient from "./FeaturesPageClient";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Explore ShubhzSecure's platform capabilities: privacy threat modeling, PII scanning, compliance automation, cloud security, data lineage, incident response, and more.",
};

export default function FeaturesPage() {
  return <FeaturesPageClient />;
}
