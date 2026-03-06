export interface FeatureCategory {
  id: string;
  number: string;
  title: string;
  headline: string;
  description: string;
  icon: string;
  accent: string;
  capabilities: string[];
}

export const featureCategories: FeatureCategory[] = [
  {
    id: "threat-modeling",
    number: "01",
    title: "Threat Modeling",
    headline: "Identify threats\nbefore they find you.",
    description:
      "Systematic identification and scoring of privacy threats using LINDDUN, STRIDE, MITRE PANOPTIC, and FAIR-Privacy frameworks — with AI-generated remediation strategies.",
    icon: "threat",
    accent: "#06b6d4",
    capabilities: [
      "LINDDUN Privacy Threat Framework",
      "MITRE PANOPTIC Assessment",
      "STRIDE Security Analysis",
      "Privacy Scoring (FAIR/NIST PRAM)",
      "AI Remediation Guidance",
      "Attack Path Visualization",
    ],
  },
  {
    id: "ai-architecture",
    number: "02",
    title: "AI Architecture",
    headline: "Describe your system.\nGet a diagram.",
    description:
      "Generate architecture and data flow diagrams from natural language. AI automatically injects privacy controls and detects anti-patterns.",
    icon: "diagram",
    accent: "#8b5cf6",
    capabilities: [
      "Natural Language → Architecture",
      "Data Flow Diagram Generation",
      "Privacy Control Injection",
      "Anti-Pattern Detection",
      "Diagram Versioning & Diff",
      "Approval Workflow",
    ],
  },
  {
    id: "privacy-scanner",
    number: "03",
    title: "Privacy Scanner",
    headline: "22+ connectors.\nOne scanner.",
    description:
      "ML-powered scanning across databases, object storage, and APIs to discover and classify PII/SPI with 99.1% accuracy.",
    icon: "scanner",
    accent: "#f59e0b",
    capabilities: [
      "22+ Data Source Connectors",
      "ML Ensemble Classification",
      "Per-Field Risk Scoring",
      "Access Pattern Analysis",
      "Attack Path Visualization",
      "Scheduled & Recurring Scans",
    ],
  },
  {
    id: "compliance",
    number: "04",
    title: "Compliance",
    headline: "Six frameworks.\nOne dashboard.",
    description:
      "Track and prove compliance across GDPR, CCPA, SOC 2, ISO 27001, HIPAA, and PCI-DSS with AI-validated evidence and badge certifications.",
    icon: "compliance",
    accent: "#10b981",
    capabilities: [
      "GDPR, CCPA, SOC 2, HIPAA, PCI-DSS, ISO 27001",
      "AI Document Validation",
      "Compliance Scoring & Badges",
      "PDF Report Generation",
      "Badge Certificates",
      "Admin Review Queue",
    ],
  },
  {
    id: "cloud-scanning",
    number: "05",
    title: "Cloud Scanning",
    headline: "AWS. Azure. GCP.\nAll scanned.",
    description:
      "Multi-cloud scanning with compliance mapping, topology visualization, and LINDDUN threat mapping across all your cloud environments.",
    icon: "cloud",
    accent: "#3b82f6",
    capabilities: [
      "AWS S3, IAM, CloudWatch",
      "Azure Blob, AD, Event Hubs",
      "GCS, IAM, Cloud Audit Logs",
      "Compliance Mapping",
      "Topology Visualization",
      "Evidence Collection",
    ],
  },
  {
    id: "ai-engine",
    number: "06",
    title: "AI Engine",
    headline: "Six providers.\nZero downtime.",
    description:
      "Multi-provider AI orchestration across Gemini, DeepSeek, Claude, Bedrock, Azure AI, and Groq with automatic failover and ML-powered classification.",
    icon: "ai",
    accent: "#ec4899",
    capabilities: [
      "6 LLM Providers",
      "Automatic Failover",
      "ML Ensemble for PII Detection",
      "Named Entity Recognition",
      "RAG Document Analysis",
      "Multi-Language Support",
    ],
  },
];

export const featureStats = [
  { value: 6, suffix: "", label: "Core Modules" },
  { value: 100, suffix: "+", label: "API Endpoints" },
  { value: 6, suffix: "", label: "Compliance Frameworks" },
  { value: 22, suffix: "+", label: "Data Connectors" },
];
