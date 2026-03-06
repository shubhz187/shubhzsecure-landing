export interface DocSection {
  id: string;
  title: string;
  level: number; // 1 = top-level, 2 = subsection
  parent?: string;
  content: string;
}

export const docSections: DocSection[] = [
  // ─── Introduction ────────────────────────────────────────
  {
    id: "introduction",
    title: "Introduction",
    level: 1,
    content: `PriAITect is an enterprise platform for identifying, assessing, and mitigating privacy risks across systems, data sources, and cloud environments. It combines AI-powered threat modeling, automated PII/SPI discovery, compliance readiness tracking, and architecture visualization into a unified tool.

### Who Is It For?

- **Privacy Engineers** — model threats, score risks, generate remediation plans
- **Security Teams** — scan data sources and cloud environments for exposure
- **DPOs (Data Protection Officers)** — track compliance, manage DSRs, handle incidents
- **Compliance Managers** — upload evidence, generate reports, earn compliance badges

### Key Capabilities

| Capability | Description |
|------------|-------------|
| Privacy Threat Modeling | LINDDUN, STRIDE, MITRE PANOPTIC frameworks with AI-generated analysis |
| Privacy Scoring | Quantitative risk scoring using NIST PRAM + FAIR-Privacy |
| Architecture Diagrams | AI-generated PlantUML diagrams from natural language |
| Compliance Tracking | GDPR, CCPA, SOC 2, ISO 27001, HIPAA, PCI-DSS readiness |
| PII/SPI Discovery | ML-powered scanning of databases, cloud storage, and file systems |
| Cloud Scanning | AWS, GCP, Azure environment scanning with compliance mapping |
| Data Lineage | Track data flows across the organization |
| DSR Management | End-to-end data subject request handling |
| Incident Response | Breach lifecycle management with regulatory deadlines |
| Consent Management | Integration with consent platforms |`,
  },

  // ─── Getting Started ─────────────────────────────────────
  {
    id: "getting-started",
    title: "Getting Started",
    level: 1,
    content: `### Prerequisites

- Python 3.10+
- Node.js 18+
- Redis (optional, required for Celery task queue)

### Installation

\`\`\`bash
# Clone the repository
git clone <repo-url>
cd priaitect

# Install backend dependencies
pip install -r requirements.txt

# Install frontend dependencies
cd priaitect-frontend && npm install && cd ..
\`\`\`

### Configuration

Create a \`.env\` file in the \`priaitect/\` directory:

\`\`\`env
DATABASE_URL=sqlite:///./shubhzsecure.db
GOOGLE_API_KEY=<your-google-ai-studio-key>
JWT_SECRET=<random-secret-string>
PASSWORD_SALT=<random-salt-string>
GCS_BUCKET=your-gcs-bucket
CELERY_BROKER_URL=redis://localhost:6379/0
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
\`\`\`

### Running the Platform

\`\`\`bash
# Full stack (Backend + Celery + Frontend)
npm run dev

# Simple mode (no Redis/Celery required)
npm run dev:simple

# Individual services
python -m uvicorn server:app --reload --port 8000      # Backend
celery -A privacy_scanner.celery_app worker --loglevel=info  # Celery
cd priaitect-frontend && npm run dev                    # Frontend
\`\`\`

### Service URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:8000 |
| API Docs (Swagger) | http://localhost:8000/docs |
| API Docs (ReDoc) | http://localhost:8000/redoc |

### First Steps

1. Navigate to the frontend at \`http://localhost:5173\`
2. Log in with your admin credentials
3. Seed compliance frameworks: \`POST /api/compliance/seed\` (admin only)
4. Start with **Analyze Privacy** to run your first threat analysis
5. Explore the **Dashboard** for an overview of your privacy posture`,
  },

  // ─── Product Guide ───────────────────────────────────────
  {
    id: "dashboard",
    title: "Dashboard",
    level: 2,
    parent: "Product Guide",
    content: `The Dashboard provides a high-level overview of your organization's privacy posture.

**Features:**
- **Privacy Score Gauge** — Animated circular gauge showing your overall privacy score (0\u2013100)
- **Security Score Gauge** — Overall security posture score
- **Risk Level Indicator** — Overall risk assessment (Critical / High / Medium / Low)
- **Analysis History** — List of recent privacy analyses with scores and grades
- **Real-Time Statistics** — Live-updating metrics

**Scoring Methodology:**
- Privacy scores use **NIST PRAM** (Privacy Risk Assessment Methodology) combined with **FAIR-Privacy** (Factor Analysis of Information Risk)
- Grades: A (90\u2013100), B (80\u201389), C (70\u201379), D (60\u201369), F (below 60)
- Risk levels: Critical, High, Medium, Low based on threat severity and likelihood`,
  },
  {
    id: "privacy-threat-analysis",
    title: "Privacy Threat Analysis",
    level: 2,
    parent: "Product Guide",
    content: `Analyze your system architecture for privacy and security threats using AI.

**How to Use:**
1. Navigate to **Analyze Privacy**
2. Enter a description of your system architecture (10\u201316,000 characters)
3. Optionally select compliance frameworks (GDPR, CCPA, etc.)
4. Optionally upload an architecture diagram image
5. Click **Analyze** \u2014 the AI generates a comprehensive threat report

**What You Get:**
- **Threat List** \u2014 Each threat identified with severity (Critical/High/Medium/Low), likelihood, and category
- **LINDDUN Classification** \u2014 Threats mapped to privacy categories:
  - **L**inking \u2014 Associating data across sources
  - **I**dentifying \u2014 Connecting data to individuals
  - **N**on-repudiation \u2014 Inability to deny actions
  - **D**etecting \u2014 Discovering data existence
  - **D**ata Disclosure \u2014 Unauthorized data exposure
  - **U**nawareness \u2014 Lack of data subject awareness
  - **N**on-compliance \u2014 Regulatory violations
- **STRIDE Classification** \u2014 Security threat categories (Spoofing, Tampering, Repudiation, Information Disclosure, DoS, Elevation of Privilege)
- **Privacy Score** \u2014 Quantitative risk score with grade
- **Compliance Impact** \u2014 Framework-specific gaps and recommendations
- **Mitigations** \u2014 Prioritized remediation actions
- **Remediated Diagram** \u2014 Architecture diagram with privacy controls injected

**Scoring Formula:**
\`\`\`
Risk Impact = Severity \u00d7 Likelihood \u00d7 Category Weight \u00d7 Confidence \u00d7 Regulatory Multiplier
Privacy Score = 100 - (Average Risk Impact / Max Possible Risk \u00d7 100)
\`\`\`

Category weights amplify high-impact areas \u2014 Identifiability and Non-compliance are weighted at 1.5\u00d7, Data Disclosure at 1.4\u00d7.`,
  },
  {
    id: "ai-architect",
    title: "AI Architect & Diagrams",
    level: 2,
    parent: "Product Guide",
    content: `Generate system architecture diagrams from natural language descriptions.

**How to Use:**
1. Navigate to **AI Architect** or **Architecture**
2. Describe your system in plain text
3. Select a diagram type:
   - **Simple** \u2014 6 components max, MVP-friendly
   - **Detailed** \u2014 15 components max, production architecture
   - **DFD** \u2014 Data Flow Diagram
4. Click **Generate** \u2014 PlantUML diagram is rendered

**Features:**
- **Anti-Pattern Detection** \u2014 Identifies over-engineering (e.g., Kubernetes for simple apps, multiple message queues without justification)
- **Privacy Control Injection** \u2014 Automatically suggests where to add privacy controls
- **Diagram Versioning** \u2014 Save diagrams with version history and diff tracking
- **Approval Workflow** \u2014 Submit diagrams for admin review before finalization
- **Caching** \u2014 Generated diagrams cached in Redis (24-hour TTL)

**Saving Diagrams:**
1. After generation, click **Save**
2. Enter a title and optional notes
3. Diagram is saved with version 1
4. Submit for admin approval if required
5. Admin reviews and approves or requests revisions`,
  },
  {
    id: "compliance-readiness",
    title: "Compliance Readiness",
    level: 2,
    parent: "Product Guide",
    content: `Track your organization's compliance against major regulatory frameworks.

**Supported Frameworks:**

| Framework | Region | Description |
|-----------|--------|-------------|
| GDPR | EU | General Data Protection Regulation |
| CCPA | US (CA) | California Consumer Privacy Act |
| SOC 2 | Global | Service Organization Control Type 2 |
| ISO 27001 | Global | Information Security Management |
| HIPAA | US | Health Insurance Portability and Accountability Act |
| PCI-DSS | Global | Payment Card Industry Data Security Standard |

**How to Use:**
1. Navigate to **Compliance Readiness**
2. Select a framework
3. View requirements grouped by category
4. Upload evidence documents for each requirement
5. Track your progress toward compliance

**Document Upload & AI Validation:**

When you upload a document, AI performs a deep 5-point evidence review:
1. **Relevance** \u2014 Does the document match the requirement?
2. **Substance** \u2014 Does it contain real evidence (not just keywords)?
3. **Completeness** \u2014 Does it cover all aspects of the requirement?
4. **Specificity** \u2014 Are there concrete details (dates, names, procedures)?
5. **Authenticity** \u2014 Does it appear to be a genuine organizational document?

Documents are scored with a confidence level (0\u2013100). Documents scoring above 70% are approved; below 30% are rejected; in between are flagged for manual review.

**Badge Levels:**

| Badge | Score Required |
|-------|---------------|
| Bronze | 30% |
| Silver | 60% |
| Gold | 90% |
| Platinum | 100% |

**Exports:**
- **PDF Report** \u2014 Branded compliance readiness report with category breakdowns and gap analysis
- **PDF Certificate** \u2014 Landscape badge certificate for achieved compliance levels
- **JSON Export** \u2014 Structured data for programmatic consumption

**Admin Review:**
Admins can access the **Compliance Review** page to:
- View pending document reviews
- Bulk approve or request revisions
- See review statistics (pending count, average review time, framework breakdown)`,
  },
  {
    id: "privacy-scanner",
    title: "Privacy Scanner",
    level: 2,
    parent: "Product Guide",
    content: `Automated PII/SPI discovery across your data sources.

**Supported Data Sources:**

| Category | Connectors |
|----------|-----------|
| Databases | PostgreSQL, MySQL, MongoDB, DynamoDB, Elasticsearch, BigQuery, Snowflake, Salesforce |
| Object Storage | AWS S3, Google Cloud Storage |
| File Systems | Local and networked file systems |
| Logs | Log aggregation systems |

**How to Use:**
1. Navigate to **Privacy Scanner > Sources**
2. Click **Add Source** and configure connection details
3. Test the connection to verify credentials
4. Navigate to **Scans** and create a new scan
5. Monitor scan progress in real-time
6. View findings in the **Findings** tab

**Classification Methods:**
The scanner uses an ML ensemble classifier combining:
- **Named Entity Recognition (NER)** \u2014 Detects PII in unstructured text
- **Pattern Matching** \u2014 100+ regex patterns for structured identifiers (SSN, IBAN, NHS numbers, phone numbers, etc.)
- **Feature Extraction** \u2014 Statistical analysis of data characteristics
- **Language Detection** \u2014 Multi-language support for international PII

**Scan Types:**
- **Full** \u2014 Scans all assets in the data source
- **Incremental** \u2014 Only scans assets modified since last scan
- **Targeted** \u2014 Scans specific tables/collections

**Dashboard Features:**
- Risk heatmap (asset \u00d7 data type matrix)
- Top risky assets ranked by risk score
- Compliance summary by framework
- Finding distribution by severity

**Attack Path Analysis:**
- Interactive graph visualization (ReactFlow) showing potential data breach paths
- Critical node identification (bottleneck assets appearing in multiple attack paths)
- Risk scoring per path with exploitability, impact, and likelihood factors
- LINDDUN threat mapping for each path

**Exports:**
- CSV, JSON, and PDF export for scans, findings, and dashboards
- Sensitive field export with confidence filtering`,
  },
  {
    id: "cloud-scanning",
    title: "Cloud Environment Scanning",
    level: 2,
    parent: "Product Guide",
    content: `Scan entire cloud environments for privacy and security issues.

**Supported Providers:**

| Provider | Modules |
|----------|---------|
| AWS | S3 Buckets, IAM Policies, CloudWatch Logs |
| Google Cloud | GCS Buckets, IAM Policies, Cloud Audit Logs |
| Azure | Blob Storage, Active Directory, Event Hubs |

**How to Use:**
1. Navigate to **Cloud Environments**
2. Click **Add Environment** to start the wizard
3. Select your cloud provider (AWS / GCP / Azure)
4. Enter credentials:
   - AWS: Access Key ID + Secret Access Key
   - GCP: Service Account JSON + Project ID
   - Azure: Tenant ID + Client ID + Client Secret + Subscription ID
5. Select modules to scan (Object Storage, IAM, Logging)
6. Configure scope (regions, bucket allowlists/denylists)
7. Test the connection
8. Start a scan

**Scan Results:**
- **Module-by-Module Results** \u2014 See findings per scan module (storage, IAM, logging)
- **Compliance Mapping** \u2014 Findings mapped to ISO 27001, SOC 2, GDPR, HIPAA, PCI-DSS, NIST controls
- **LINDDUN Threat Analysis** \u2014 Privacy threat categorization of findings
- **Topology Visualization** \u2014 Interactive cloud resource topology graph
- **Evidence Package** \u2014 Exportable evidence for compliance audits (JSON, CSV, or ZIP)

**Scan History:**
Track and compare scan results over time to measure improvement.`,
  },
  {
    id: "data-lineage",
    title: "Data Lineage",
    level: 2,
    parent: "Product Guide",
    content: `Track how data moves through your organization.

**Features:**
- **Data Nodes** \u2014 Define sources, processors, and sinks
- **Flow Tracking** \u2014 Document data movement with purpose and legal basis
- **Auto-Detection** \u2014 AI-powered detection of data flows from infrastructure
- **Graph Visualization** \u2014 Interactive lineage graph
- **Snapshots** \u2014 Point-in-time snapshots for audit and compliance`,
  },
  {
    id: "data-subject-requests",
    title: "Data Subject Requests",
    level: 2,
    parent: "Product Guide",
    content: `Manage GDPR data subject requests end-to-end.

**Request Types:**
- **Access** \u2014 Subject requests a copy of their data
- **Erasure** \u2014 Right to be forgotten
- **Portability** \u2014 Data export in machine-readable format
- **Rectification** \u2014 Correct inaccurate data

**Workflow:**
1. Create a new DSR with subject details
2. Automated discovery finds where the subject's data exists
3. Execute deletion, anonymization, or export operations
4. Complete audit trail is maintained for regulatory proof
5. Stakeholders are notified of status changes

**Dashboard:**
- Active request count
- SLA compliance tracking
- Completion rates by request type`,
  },
  {
    id: "incident-response",
    title: "Incident Response",
    level: 2,
    parent: "Product Guide",
    content: `Track data breach incidents through their full lifecycle.

**Incident Lifecycle:**
\`\`\`
Detected \u2192 Investigating \u2192 Contained \u2192 Remediated \u2192 Closed
\`\`\`

**Features:**
- Create incidents with severity level, type, affected data, and record counts
- Detailed timeline tracking of all events and actions
- Automatic calculation of regulatory notification deadlines:
  - GDPR: 72-hour notification to supervisory authority
  - HIPAA: 60-day notification to individuals
  - Other framework-specific deadlines
- Notification management for affected parties, DPOs, and regulators
- Framework-specific incident response procedures`,
  },
  {
    id: "consent-management",
    title: "Consent Management",
    level: 2,
    parent: "Product Guide",
    content: `Integrate with consent management platforms to track consent records.

**Supported Providers:**
- OneTrust
- Cookiebot
- Custom consent management systems

**Features:**
- Track individual consent records with purposes, status, and timestamps
- Synchronize consent data from external providers
- Track consent withdrawal and ensure downstream compliance
- Historical consent records for audit purposes`,
  },
  {
    id: "organizations-teams",
    title: "Organizations & Teams",
    level: 2,
    parent: "Product Guide",
    content: `Multi-tenant organization management.

**Roles:**

| Role | Permissions |
|------|------------|
| Owner | Full control, delete org, transfer ownership |
| Admin | Manage members, manage settings, all features |
| Member | Use all features, no admin access |
| Viewer | Read-only access to dashboards and reports |

**Features:**
- Create organizations with subdomain-based routing
- Invite members via email with role assignment
- Per-organization usage limits (users, analyses, storage)
- Stripe-based billing with plan management (Free, Pro, Enterprise)`,
  },
  {
    id: "developer-settings",
    title: "Developer Settings",
    level: 2,
    parent: "Product Guide",
    content: `Programmatic access to the platform.

**API Keys:**
- Create API keys with custom names and optional expiration
- Use API keys via \`X-API-Key\` header for programmatic access
- Revoke keys at any time

**Webhooks:**
- Configure webhook endpoints for event notifications
- Test webhooks with sample payloads
- Events: analysis completed, scan completed, compliance updated, incident created`,
  },

  // ─── API Reference ───────────────────────────────────────
  {
    id: "api-overview",
    title: "API Overview",
    level: 2,
    parent: "API Reference",
    content: `**Base URL:** \`http://localhost:8000\`

**Authentication:** All protected endpoints require a JWT token in the \`Authorization\` header:
\`\`\`
Authorization: Bearer <your-jwt-token>
\`\`\`

**Error Responses:**
\`\`\`json
{
  "detail": "Error message describing what went wrong"
}
\`\`\`

Common HTTP status codes:
- \`200\` \u2014 Success
- \`201\` \u2014 Created
- \`400\` \u2014 Bad request (invalid input)
- \`401\` \u2014 Unauthorized (missing or invalid token)
- \`403\` \u2014 Forbidden (insufficient permissions)
- \`404\` \u2014 Not found
- \`422\` \u2014 Validation error
- \`429\` \u2014 Rate limited
- \`500\` \u2014 Internal server error`,
  },
  {
    id: "api-authentication",
    title: "Authentication",
    level: 2,
    parent: "API Reference",
    content: `#### \`POST /api/auth/login\`

Authenticate and receive JWT + refresh tokens.

**Auth:** None

\`\`\`json
// Request
{ "email": "user@example.com", "password": "secret" }

// Response
{
  "access_token": "<jwt>",
  "refresh_token": "<token>",
  "user": { "id": "...", "email": "...", "name": "...", "role": "..." },
  "expires_at": "2026-03-06T12:00:00"
}
\`\`\`

#### \`POST /api/auth/logout\`

Logout and invalidate session.

**Auth:** Required

\`\`\`json
// Response
{ "message": "Logged out successfully" }
\`\`\`

#### \`POST /api/auth/refresh\`

Exchange a refresh token for new access + refresh tokens. Refresh tokens are single-use.

**Auth:** None

\`\`\`json
// Request
{ "refresh_token": "<refresh_token>" }

// Response
{ "access_token": "<new_jwt>", "refresh_token": "<new_refresh>", "expires_at": "..." }
\`\`\`

#### \`GET /api/auth/me\`

Get current user identity from JWT.

**Auth:** Required

#### \`POST /api/auth/forgot-password\`

Request password reset email. Always returns the same message to prevent email enumeration. Rate-limited to 3 requests per hour per email.

#### \`POST /api/auth/reset-password\`

Reset password using a valid single-use token.

#### \`GET /api/auth/verify-email/{token}\`

Verify user email using the token sent during signup.

#### \`POST /api/auth/resend-verification\`

Resend email verification link. Rate-limited to 3 per 24 hours. **Auth:** Required

#### \`GET /api/auth/invite/{token}\`

Get invitation details from a token.

\`\`\`json
// Response
{
  "valid": true,
  "email": "invitee@example.com",
  "organization": { "id": "...", "name": "Acme", "subdomain": "acme" },
  "role": "member",
  "invited_by": "Jane Smith",
  "expires_at": "2026-03-13T..."
}
\`\`\`

#### \`POST /api/auth/invite/accept\`

Accept an organization invitation. **Auth:** Required, **Query:** \`token=<invitation_token>\``,
  },
  {
    id: "api-analyses",
    title: "Analyses",
    level: 2,
    parent: "API Reference",
    content: `#### \`POST /api/analyses\`

Run a full AI privacy analysis with scoring and optional diagram generation.

**Auth:** Required

\`\`\`json
// Request
{
  "input_text": "System description (10\u201316000 chars)",
  "diagram_type": "privacy|architecture|dfd",
  "compliance_frameworks": ["GDPR", "CCPA"],
  "generate_diagram": true
}

// Response
{
  "id": "analysis_id",
  "scores": {
    "privacy_score": 72.5,
    "security_score": 68.0,
    "overall_score": 70.0,
    "grade": "C",
    "risk_level": "Medium"
  },
  "created_at": "2026-03-06T..."
}
\`\`\`

#### \`GET /api/analyses\`

List analyses with pagination. **Auth:** Required, **Query:** \`page\` (default 1), \`page_size\` (default 20)

#### \`GET /api/analyses/{analysis_id}\`

Get full analysis detail including threats, mitigations, and compliance impact. **Auth:** Required

\`\`\`json
// Response
{
  "id": "...",
  "input_text": "...",
  "analysis_markdown": "## Privacy Analysis\\n...",
  "scores": { "privacy_score": 72.5 },
  "threats": [{ "id": "T1", "name": "Data Exposure", "category": "Disclosure", "severity": "High" }],
  "compliance_impact": { "GDPR": "...", "CCPA": "..." },
  "recommendations": ["Encrypt data at rest"],
  "diagram_url": "https://signed-gcs-url",
  "mermaid_code": "graph TD..."
}
\`\`\`

#### \`DELETE /api/analyses/{analysis_id}\`

Delete an analysis. **Auth:** Required (owner, org admin, or system admin)

#### \`POST /api/analyze\`

Structured privacy threat analysis using LINDDUN + STRIDE. Optionally accepts a base64 image.

\`\`\`json
// Request
{
  "system_description": "System architecture (10\u201316000 chars)",
  "frameworks": ["GDPR", "CCPA"],
  "image_base64": "<optional>"
}

// Response
{
  "analysis_id": "...",
  "threats": [{ "id": "T1", "severity": "High", "likelihood": "Medium", "linddun": "Disclosure" }],
  "privacy_score": 72.5,
  "grade": "C",
  "risk_level": "Medium"
}
\`\`\`

#### \`POST /api/analyze/remediate\`

Generate a remediated architecture diagram with privacy controls injected.

#### \`POST /api/score\`

Calculate privacy scores from a list of threats. Uses NIST PRAM + FAIR-Privacy methodology.`,
  },
  {
    id: "api-diagrams",
    title: "Diagrams",
    level: 2,
    parent: "API Reference",
    content: `#### \`POST /api/diagram\`

Generate a diagram synchronously from a system description.

\`\`\`json
// Request
{
  "system_description": "E-commerce platform with payment processing...",
  "diagram_type": "detailed|simple|dfd|d2_detailed|d2_simple|d2_dfd|d2_network",
  "bypass_cache": false
}

// Response
{
  "diagram_code": "@startuml\\n...",
  "diagram_svg": "<svg>...</svg>",
  "success": true,
  "cached": false,
  "privacy_compliance_score": 85,
  "privacy_compliance_grade": "B"
}
\`\`\`

#### \`POST /api/diagram/async\`

Start async diagram generation. Poll \`/api/diagram/status/{task_id}\` for result.

#### \`GET /api/diagram/status/{task_id}\`

Poll for async diagram generation status.

#### \`POST /api/diagrams/save\`

Save a diagram with version history. **Auth:** Required

\`\`\`json
// Request
{
  "title": "Payment System Architecture",
  "system_description": "...",
  "diagram_type": "detailed",
  "plantuml_code": "@startuml\\n...",
  "diagram_svg": "<svg>...</svg>",
  "version_notes": "Initial version"
}
\`\`\`

#### \`GET /api/diagrams\`

List saved diagrams. **Query:** \`skip\`, \`limit\`, \`diagram_type\`, \`refresh\`

#### \`GET /api/diagrams/{diagram_id}\`

Get diagram details with all versions and signed preview URLs.

#### \`POST /api/diagrams/{diagram_id}/regenerate\`

Regenerate a diagram with an updated description, creating a new version.

#### \`DELETE /api/diagrams/{diagram_id}\`

Delete a diagram and all versions.

#### Approval Workflow

| Method | Endpoint | Description |
|--------|----------|-------------|
| \`POST\` | \`/api/diagrams/{id}/versions/{vid}/submit-approval\` | Submit for approval |
| \`GET\` | \`/api/diagrams/{id}/versions/{vid}/approval-status\` | Get approval status |
| \`GET\` | \`/api/admin/diagram-approvals/pending\` | List pending (admin) |
| \`PUT\` | \`/api/admin/diagram-approvals/{vid}/review\` | Approve or revise (admin) |`,
  },
  {
    id: "api-compliance",
    title: "Compliance",
    level: 2,
    parent: "API Reference",
    content: `#### \`POST /api/compliance/seed\`

Seed compliance frameworks into the database. Run once during setup. **Auth:** Admin only

#### \`GET /api/compliance/frameworks\`

List all frameworks with user progress. **Auth:** Required

\`\`\`json
// Response
[{
  "id": "...", "code": "GDPR", "name": "General Data Protection Regulation",
  "total_requirements": 32,
  "user_progress": { "completed": 12, "pending": 20, "score": 37.5 }
}]
\`\`\`

#### \`GET /api/compliance/frameworks/{framework_code}/requirements\`

Get requirements for a framework grouped by category with upload status. **Auth:** Required

#### \`POST /api/compliance/documents/upload\`

Upload a compliance evidence document. AI validates content automatically.

\`\`\`json
// Request
{
  "requirement_id": "req_id",
  "file_base64": "<base64-encoded file>",
  "filename": "privacy-policy.pdf",
  "file_type": "pdf|docx|doc|txt|md"
}

// Response
{
  "document_id": "...",
  "status": "approved",
  "requirement_completed": true,
  "updated_score": 43.75
}
\`\`\`

#### \`GET /api/compliance/status\`

Overall compliance status across all frameworks. **Auth:** Required

#### \`GET /api/compliance/report/{framework_code}\`

Generate a compliance report. **Query:** \`format=pdf|json\`

#### \`GET /api/compliance/certificate/{framework_code}\`

Generate a compliance badge certificate (requires 30%+ score). Returns PDF binary.

#### Admin Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| \`GET\` | \`/api/compliance/admin/stats\` | Review statistics |
| \`GET\` | \`/api/compliance/admin/review-queue\` | Pending reviews |
| \`POST\` | \`/api/compliance/admin/bulk-review\` | Bulk approve/revise |`,
  },
  {
    id: "api-scanner",
    title: "Privacy Scanner API",
    level: 2,
    parent: "API Reference",
    content: `#### Data Sources

| Method | Endpoint | Description |
|--------|----------|-------------|
| \`POST\` | \`/api/privacy-scanner/sources\` | Create a data source |
| \`GET\` | \`/api/privacy-scanner/sources\` | List data sources |
| \`GET\` | \`/api/privacy-scanner/sources/{id}\` | Get data source |
| \`PUT\` | \`/api/privacy-scanner/sources/{id}\` | Update data source |
| \`DELETE\` | \`/api/privacy-scanner/sources/{id}\` | Delete data source |
| \`POST\` | \`/api/privacy-scanner/sources/{id}/test\` | Test connection |
| \`POST\` | \`/api/privacy-scanner/sources/{id}/schedule\` | Set scan schedule |

**Create Data Source:**

\`\`\`json
// Request
{
  "name": "Production DB",
  "source_type": "postgres|mysql|mongodb|dynamodb|elasticsearch|bigquery|snowflake|salesforce|s3|gcs|filesystem|logs",
  "connection_config": {
    "host": "db.example.com",
    "port": 5432,
    "database": "production",
    "username": "scanner",
    "password": "secret"
  },
  "sample_size": 1000,
  "tags": ["production", "customer-data"]
}
\`\`\`

#### Scans

| Method | Endpoint | Description |
|--------|----------|-------------|
| \`POST\` | \`/api/privacy-scanner/scans\` | Create and start a scan |
| \`GET\` | \`/api/privacy-scanner/scans\` | List scans |
| \`GET\` | \`/api/privacy-scanner/scans/{id}\` | Get scan details |
| \`POST\` | \`/api/privacy-scanner/scans/{id}/pause\` | Pause scan |
| \`POST\` | \`/api/privacy-scanner/scans/{id}/resume\` | Resume scan |
| \`POST\` | \`/api/privacy-scanner/scans/{id}/cancel\` | Cancel scan |

#### ML Classification

| Method | Endpoint | Description |
|--------|----------|-------------|
| \`POST\` | \`/api/privacy-scanner/ml/classify\` | Classify a single field |
| \`POST\` | \`/api/privacy-scanner/ml/classify/batch\` | Classify up to 100 fields |
| \`POST\` | \`/api/privacy-scanner/ml/feedback\` | Submit classification correction |
| \`POST\` | \`/api/privacy-scanner/ml/train\` | Trigger model retraining |

\`\`\`json
// Classify Field Request
{ "field_name": "customer_email", "samples": ["john@example.com", "jane@test.org"] }

// Response
{
  "field_name": "customer_email",
  "pii_type": "email_address",
  "category": "contact_info",
  "confidence": 0.95,
  "sensitivity": "high",
  "is_pii": true,
  "regulations": ["GDPR", "CCPA"]
}
\`\`\`

#### Dashboard & Export

| Method | Endpoint | Description |
|--------|----------|-------------|
| \`GET\` | \`/api/privacy-scanner/dashboard/summary\` | Aggregated statistics |
| \`GET\` | \`/api/privacy-scanner/dashboard/heatmap\` | Risk heatmap data |
| \`GET\` | \`/api/privacy-scanner/export/scan/{scan_id}\` | Export scan (json/csv/pdf) |
| \`GET\` | \`/api/privacy-scanner/export/findings\` | Export findings |`,
  },
  {
    id: "api-cloud-scanner",
    title: "Cloud Scanner API",
    level: 2,
    parent: "API Reference",
    content: `#### Cloud Attachments

| Method | Endpoint | Description |
|--------|----------|-------------|
| \`POST\` | \`/api/scanner/cloud/attachments\` | Create cloud attachment |
| \`GET\` | \`/api/scanner/cloud/attachments\` | List attachments |
| \`GET\` | \`/api/scanner/cloud/attachments/{id}\` | Get attachment |
| \`DELETE\` | \`/api/scanner/cloud/attachments/{id}\` | Delete attachment |
| \`POST\` | \`/api/scanner/cloud/attachments/{id}/test\` | Test connection |

\`\`\`json
// Create Cloud Attachment (AWS example)
{
  "provider": "aws",
  "name": "Production AWS",
  "auth_type": "access_keys",
  "credentials": {
    "access_key_id": "AKIA...",
    "secret_access_key": "...",
    "region": "us-east-1"
  },
  "enabled_modules": { "object_storage": true, "iam": true, "logs": true },
  "scope": { "regions": ["us-east-1", "eu-west-1"], "max_objects_per_bucket": 1000 }
}
\`\`\`

#### Environment Scans

| Method | Endpoint | Description |
|--------|----------|-------------|
| \`POST\` | \`/api/scanner/cloud/attachments/{id}/scans\` | Start scan |
| \`GET\` | \`/api/scanner/cloud/scans\` | List scans |
| \`GET\` | \`/api/scanner/cloud/scans/{id}\` | Get scan details |
| \`GET\` | \`/api/scanner/cloud/scans/{id}/findings\` | Get findings |
| \`GET\` | \`/api/scanner/cloud/scans/{id}/compliance\` | Compliance results |
| \`GET\` | \`/api/scanner/cloud/scans/{id}/topology\` | Resource topology |
| \`GET\` | \`/api/scanner/cloud/scans/{id}/threats\` | LINDDUN threats |
| \`GET\` | \`/api/scanner/cloud/scans/{id}/evidence\` | Export evidence |`,
  },
  {
    id: "api-users-orgs",
    title: "Users & Organizations",
    level: 2,
    parent: "API Reference",
    content: `#### Users

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| \`GET\` | \`/api/users/profile\` | Required | Get current user profile |
| \`PUT\` | \`/api/users/profile\` | Required | Update profile |
| \`GET\` | \`/api/users\` | Admin | List all users |
| \`POST\` | \`/api/users\` | Admin | Create user |
| \`PUT\` | \`/api/users/{id}/role\` | Admin | Update user role |
| \`DELETE\` | \`/api/users/{id}\` | Admin | Delete user |

#### Organizations

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| \`POST\` | \`/api/organizations\` | Required | Create organization |
| \`GET\` | \`/api/organizations\` | Required | List user's organizations |
| \`GET\` | \`/api/organizations/{id}\` | Member | Get organization |
| \`PUT\` | \`/api/organizations/{id}\` | Admin+ | Update organization |
| \`DELETE\` | \`/api/organizations/{id}\` | Owner | Delete organization |
| \`POST\` | \`/api/organizations/{id}/members/invite\` | Admin+ | Invite member |

#### Superadmin

| Method | Endpoint | Description |
|--------|----------|-------------|
| \`GET\` | \`/api/admin/organizations\` | List all organizations |
| \`GET\` | \`/api/admin/organizations/stats/global\` | Global statistics |
| \`DELETE\` | \`/api/admin/organizations/{id}\` | Delete org (soft/hard) |`,
  },
  {
    id: "api-incidents-dsr",
    title: "Incidents, DSR & Consent",
    level: 2,
    parent: "API Reference",
    content: `#### Incidents

| Method | Endpoint | Description |
|--------|----------|-------------|
| \`POST\` | \`/api/incidents\` | Create incident |
| \`GET\` | \`/api/incidents\` | List incidents |
| \`GET\` | \`/api/incidents/{id}\` | Get incident details |
| \`PUT\` | \`/api/incidents/{id}\` | Update incident |
| \`POST\` | \`/api/incidents/{id}/timeline\` | Add timeline event |
| \`PUT\` | \`/api/incidents/{id}/status\` | Update status |
| \`GET\` | \`/api/incidents/{id}/deadlines\` | Regulatory deadlines |

\`\`\`json
// Create Incident
{
  "title": "Customer Data Breach",
  "description": "Unauthorized access to customer records",
  "severity": "critical",
  "incident_type": "data_breach",
  "affected_data_types": ["email", "ssn"],
  "affected_record_count": 500
}
\`\`\`

#### Data Subject Requests

| Method | Endpoint | Description |
|--------|----------|-------------|
| \`POST\` | \`/api/dsr/requests\` | Create DSR |
| \`GET\` | \`/api/dsr/requests\` | List requests |
| \`POST\` | \`/api/dsr/requests/{id}/discover\` | Discover subject data |
| \`POST\` | \`/api/dsr/requests/{id}/execute\` | Execute request |
| \`GET\` | \`/api/dsr/requests/{id}/audit\` | Audit trail |

#### Consent

| Method | Endpoint | Description |
|--------|----------|-------------|
| \`POST\` | \`/api/consent/providers\` | Add consent provider |
| \`POST\` | \`/api/consent/providers/{id}/sync\` | Sync consent data |
| \`GET\` | \`/api/consent/records\` | List consent records |
| \`GET\` | \`/api/consent/dashboard\` | Consent dashboard |`,
  },
  {
    id: "api-developer",
    title: "API Keys, Webhooks & SSO",
    level: 2,
    parent: "API Reference",
    content: `#### API Keys

| Method | Endpoint | Description |
|--------|----------|-------------|
| \`POST\` | \`/api/api-keys\` | Create API key |
| \`GET\` | \`/api/api-keys\` | List API keys |
| \`DELETE\` | \`/api/api-keys/{id}\` | Revoke API key |

\`\`\`json
// Create API Key
{ "name": "CI/CD Pipeline", "expires_in_days": 90 }

// Response
{ "id": "...", "name": "CI/CD Pipeline", "key": "pak_abc123...", "created_at": "...", "expires_at": "..." }
\`\`\`

The key is only shown once at creation. Use it via the \`X-API-Key\` header.

#### Webhooks

| Method | Endpoint | Description |
|--------|----------|-------------|
| \`POST\` | \`/api/webhooks\` | Create webhook |
| \`GET\` | \`/api/webhooks\` | List webhooks |
| \`PUT\` | \`/api/webhooks/{id}\` | Update webhook |
| \`DELETE\` | \`/api/webhooks/{id}\` | Delete webhook |
| \`POST\` | \`/api/webhooks/{id}/test\` | Test webhook |

#### SSO

| Method | Endpoint | Description |
|--------|----------|-------------|
| \`GET\` | \`/api/sso/config\` | Get SSO configuration (Admin) |
| \`PUT\` | \`/api/sso/config\` | Update SSO configuration (Admin) |
| \`POST\` | \`/api/sso/test\` | Test SSO connection (Admin) |
| \`GET\` | \`/api/sso/login\` | Initiate SSO login flow |
| \`POST\` | \`/api/sso/callback\` | SSO callback handler |

#### Health

\`\`\`json
// GET /health
{ "status": "healthy", "version": "1.0.0", "database": "connected" }
\`\`\``,
  },

  // ─── Architecture ────────────────────────────────────────
  {
    id: "architecture",
    title: "Architecture",
    level: 1,
    content: `### Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, Vite, React Router v6, ReactFlow, Framer Motion |
| Backend | FastAPI (Python), SQLAlchemy ORM, Pydantic |
| Database | SQLite (dev), PostgreSQL (prod) |
| Task Queue | Celery with Redis broker |
| AI/LLM | Google Gemini, DeepSeek, Claude, AWS Bedrock, Azure AI, Groq |
| ML | NER, Pattern Matching, Ensemble Classifier |
| PDF | ReportLab |
| Storage | Google Cloud Storage, Supabase, S3, Azure Blob |
| Auth | JWT (PyJWT), OAuth (SSO) |
| Diagrams | PlantUML via Kroki API |
| Design | OBSIDIAN PRISM (dark theme) |

### Security

- **JWT Authentication** \u2014 24-hour access tokens, 30-day refresh tokens with rotation
- **Security Headers** \u2014 CSP, HSTS, X-Frame-Options, X-Content-Type-Options
- **Rate Limiting** \u2014 500 requests/hour per IP (configurable)
- **CORS** \u2014 Configurable allowed origins
- **Encrypted Credentials** \u2014 Data source credentials encrypted at rest
- **Multi-Tenancy Isolation** \u2014 Organization-based data isolation via subdomain routing
- **RBAC** \u2014 Role-based access control at endpoint level

### Data Flow

\`\`\`
User Input \u2192 FastAPI \u2192 AI Provider (Gemini/DeepSeek)
    \u2192 Parse & Score (NIST PRAM + FAIR-Privacy)
    \u2192 Store (PostgreSQL + Cloud Storage)
    \u2192 Return to React Frontend
\`\`\`

### Async Processing

Long-running operations (privacy scans, cloud scans) run as Celery background tasks with Redis as the message broker. The frontend polls for progress updates.`,
  },
];

// Build sidebar structure
export interface SidebarGroup {
  label: string;
  items: { id: string; title: string }[];
}

export function buildSidebar(): SidebarGroup[] {
  const groups: SidebarGroup[] = [];
  const topLevel = docSections.filter((s) => s.level === 1);

  for (const section of topLevel) {
    groups.push({ label: section.title, items: [{ id: section.id, title: section.title }] });
  }

  // Product Guide group
  const productGuide = docSections.filter((s) => s.parent === "Product Guide");
  if (productGuide.length > 0) {
    // Insert after Getting Started
    const insertIdx = groups.findIndex((g) => g.label === "Getting Started") + 1;
    groups.splice(insertIdx, 0, {
      label: "Product Guide",
      items: productGuide.map((s) => ({ id: s.id, title: s.title })),
    });
  }

  // API Reference group
  const apiRef = docSections.filter((s) => s.parent === "API Reference");
  if (apiRef.length > 0) {
    const insertIdx = groups.findIndex((g) => g.label === "Architecture");
    groups.splice(insertIdx, 0, {
      label: "API Reference",
      items: apiRef.map((s) => ({ id: s.id, title: s.title })),
    });
  }

  // Remove standalone Introduction / Getting Started / Architecture from being groups with single items
  // They stay as groups with one item, which is fine

  return groups;
}
