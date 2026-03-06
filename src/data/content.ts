export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Features", href: "/features" },
  { label: "Case Studies", href: "/case-studies" },
  // { label: "Docs", href: "/docs" }, // Hidden until launch
  { label: "Contact", href: "/#contact" },
];

export const services = [
  {
    icon: "dashboard",
    title: "Privacy Threat Dashboard",
    description:
      "Real-time privacy risk visualization with advanced threat modeling frameworks. Interactive threat maps, risk scores, and AI-generated remediation across your entire architecture.",
    href: "#",
  },
  {
    icon: "scanner",
    title: "PII & Data Scanner",
    description:
      "ML-powered scanner that detects PII, SPI, and sensitive data across databases, cloud storage, and file systems. Supports PostgreSQL, MySQL, S3, Azure Blob, and GCS with 22+ connectors.",
    href: "#",
  },
  {
    icon: "compliance",
    title: "Compliance Automation",
    description:
      "Automated compliance checks for GDPR, CCPA, and HIPAA. Generate audit-ready reports, manage Data Subject Requests, and track consent with built-in evidence collection.",
    href: "#",
  },
];

export const productFeatures = [
  {
    label: "Architecture Diagrams",
    description: "Auto-generate DFD and architecture diagrams with Mermaid",
  },
  {
    label: "Multi-Provider AI",
    description: "Groq, DeepSeek, Claude, and Gemini working in concert",
  },
  {
    label: "Privacy Scoring",
    description: "Quantitative privacy risk scoring and assessment",
  },
  {
    label: "Cloud Connectors",
    description: "22+ connectors for AWS, Azure, GCP, and on-premise systems",
  },
  {
    label: "Incident Response",
    description: "Built-in workflow for breach tracking and response",
  },
  {
    label: "Data Lineage",
    description: "Visual data flow mapping across your entire infrastructure",
  },
];

export const insightTabFeatures: Record<string, { label: string; description: string }[]> = {
  Dashboard: [
    { label: "Architecture Diagrams", description: "Auto-generate DFD and architecture diagrams with Mermaid" },
    { label: "Multi-Provider AI", description: "Groq, DeepSeek, Claude, and Gemini working in concert" },
    { label: "Privacy Scoring", description: "Quantitative privacy risk scoring and assessment" },
    { label: "Cloud Connectors", description: "22+ connectors for AWS, Azure, GCP, and on-premise systems" },
  ],
  Scanner: [
    { label: "PII Detection", description: "ML-powered classification of personally identifiable information across all data stores" },
    { label: "SPI Recognition", description: "Detect sensitive personal information including health, financial, and biometric data" },
    { label: "22+ Connectors", description: "Scan PostgreSQL, MySQL, S3, Azure Blob, GCS, and on-premise file systems" },
    { label: "Real-Time Alerts", description: "Instant notifications when new sensitive data is detected in monitored sources" },
  ],
  Compliance: [
    { label: "GDPR Automation", description: "Automated data mapping, DPIA generation, and Article 30 record maintenance" },
    { label: "CCPA & HIPAA", description: "Pre-built compliance templates with automated evidence collection and gap analysis" },
    { label: "Audit Reports", description: "One-click generation of audit-ready compliance reports with full evidence trails" },
    { label: "DSR Management", description: "Automated Data Subject Request workflows for access, deletion, and portability" },
  ],
};

export const testimonials = [
  {
    quote:
      "ShubhzSecure's dashboard gave us instant visibility into privacy risks we didn't even know existed. The threat mapping alone saved our compliance team months of work.",
    name: "James Rizaki",
    role: "Chief Privacy Officer, MedTech Corp",
    avatar: "JR",
  },
  {
    quote:
      "The PII scanner detected sensitive data across 14 databases in under an hour. We plugged it into our CI/CD pipeline and it now runs on every deployment.",
    name: "Samantha Leonardo",
    role: "Security Architect, CloudFirst",
    avatar: "SL",
  },
  {
    quote:
      "Generating architecture diagrams and threat models automatically from our codebase is a game-changer. Our SOC 2 audit was the smoothest we've ever had.",
    name: "Mark Trevor",
    role: "CTO, FinSecure Inc.",
    avatar: "MT",
  },
];

export const insightArticle = {
  categories: ["Dashboard", "Scanner", "Compliance"],
  title: "How AI-Driven Privacy Engineering is Redefining Threat Analysis",
  description:
    "From automated threat trees to ML-powered PII classification — discover how ShubhzSecure's multi-provider AI pipeline turns complex privacy assessments into actionable intelligence in minutes, not months.",
  date: "08 February 2026",
  author: "ShubhzSecure Team",
};

export const footerLinks = {
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/#about" },
    { label: "Services", href: "/#services" },
    { label: "Documentation", href: "#" },
  ],
  explore: [
    { label: "Product Demo", href: "#" },
    { label: "Privacy Scanner", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Integrations", href: "#" },
    { label: "Events & Webinars", href: "#" },
  ],
};
