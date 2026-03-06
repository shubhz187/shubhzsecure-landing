import type { Metadata } from "next";
import DocsClient from "./DocsClient";

export const metadata: Metadata = {
  title: "Documentation | ShubhzSecure — PriAITect Platform",
  description:
    "Complete documentation for PriAITect: privacy threat modeling, PII scanning, compliance automation, cloud security, API reference, and architecture.",
};

export default function DocsPage() {
  return <DocsClient />;
}
