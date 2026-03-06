# PriAITect Documentation

> Enterprise Privacy Threat Analysis & Compliance Platform by ShubhzSecure

---

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [Product Guide](#product-guide)
  - [Dashboard](#dashboard)
  - [Privacy Threat Analysis](#privacy-threat-analysis)
  - [AI Architect & Diagrams](#ai-architect--diagrams)
  - [Compliance Readiness](#compliance-readiness)
  - [Privacy Scanner](#privacy-scanner)
  - [Cloud Environment Scanning](#cloud-environment-scanning)
  - [Data Lineage](#data-lineage)
  - [Data Subject Requests](#data-subject-requests)
  - [Incident Response](#incident-response)
  - [Consent Management](#consent-management)
  - [Organizations & Teams](#organizations--teams)
  - [Developer Settings](#developer-settings)
- [API Reference](#api-reference)
  - [Authentication](#authentication)
  - [Analyses](#analyses)
  - [Diagrams](#diagrams)
  - [Compliance](#compliance)
  - [Privacy Scanner](#privacy-scanner-api)
  - [Cloud Scanner](#cloud-scanner-api)
  - [Users](#users)
  - [Organizations](#organizations)
  - [Incidents](#incidents)
  - [Data Lineage](#data-lineage-api)
  - [Data Subject Requests](#dsr-api)
  - [Consent](#consent-api)
  - [API Keys](#api-keys)
  - [Webhooks](#webhooks)
  - [SSO](#sso)
- [Architecture](#architecture)

---

## Introduction

PriAITect is an enterprise platform for identifying, assessing, and mitigating privacy risks across systems, data sources, and cloud environments. It combines AI-powered threat modeling, automated PII/SPI discovery, compliance readiness tracking, and architecture visualization into a unified tool.

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
| Consent Management | Integration with consent platforms |

---

## Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+
- Redis (optional, required for Celery task queue)

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd priaitect

# Install backend dependencies
pip install -r requirements.txt

# Install frontend dependencies
cd priaitect-frontend && npm install && cd ..
```

### Configuration

Create a `.env` file in the `priaitect/` directory:

```env
DATABASE_URL=sqlite:///./shubhzsecure.db
GOOGLE_API_KEY=<your-google-ai-studio-key>
JWT_SECRET=<random-secret-string>
PASSWORD_SALT=<random-salt-string>
GCS_BUCKET=your-gcs-bucket
CELERY_BROKER_URL=redis://localhost:6379/0
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

### Running the Platform

```bash
# Full stack (Backend + Celery + Frontend)
npm run dev

# Simple mode (no Redis/Celery required)
npm run dev:simple

# Individual services
python -m uvicorn server:app --reload --port 8000      # Backend
celery -A privacy_scanner.celery_app worker --loglevel=info  # Celery
cd priaitect-frontend && npm run dev                    # Frontend
```

### Service URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:8000 |
| API Docs (Swagger) | http://localhost:8000/docs |
| API Docs (ReDoc) | http://localhost:8000/redoc |

### First Steps

1. Navigate to the frontend at `http://localhost:5173`
2. Log in with your admin credentials
3. Seed compliance frameworks: `POST /api/compliance/seed` (admin only)
4. Start with **Analyze Privacy** to run your first threat analysis
5. Explore the **Dashboard** for an overview of your privacy posture

---

## Product Guide

### Dashboard

The Dashboard provides a high-level overview of your organization's privacy posture.

**Features:**
- **Privacy Score Gauge** — Animated circular gauge showing your overall privacy score (0–100)
- **Security Score Gauge** — Overall security posture score
- **Risk Level Indicator** — Overall risk assessment (Critical / High / Medium / Low)
- **Analysis History** — List of recent privacy analyses with scores and grades
- **Real-Time Statistics** — Live-updating metrics

**Scoring Methodology:**
- Privacy scores use **NIST PRAM** (Privacy Risk Assessment Methodology) combined with **FAIR-Privacy** (Factor Analysis of Information Risk)
- Grades: A (90–100), B (80–89), C (70–79), D (60–69), F (below 60)
- Risk levels: Critical, High, Medium, Low based on threat severity and likelihood

---

### Privacy Threat Analysis

Analyze your system architecture for privacy and security threats using AI.

**How to Use:**
1. Navigate to **Analyze Privacy**
2. Enter a description of your system architecture (10–16,000 characters)
3. Optionally select compliance frameworks (GDPR, CCPA, etc.)
4. Optionally upload an architecture diagram image
5. Click **Analyze** — the AI generates a comprehensive threat report

**What You Get:**
- **Threat List** — Each threat identified with severity (Critical/High/Medium/Low), likelihood, and category
- **LINDDUN Classification** — Threats mapped to privacy categories:
  - **L**inking — Associating data across sources
  - **I**dentifying — Connecting data to individuals
  - **N**on-repudiation — Inability to deny actions
  - **D**etecting — Discovering data existence
  - **D**ata Disclosure — Unauthorized data exposure
  - **U**nawareness — Lack of data subject awareness
  - **N**on-compliance — Regulatory violations
- **STRIDE Classification** — Security threat categories (Spoofing, Tampering, Repudiation, Information Disclosure, DoS, Elevation of Privilege)
- **Privacy Score** — Quantitative risk score with grade
- **Compliance Impact** — Framework-specific gaps and recommendations
- **Mitigations** — Prioritized remediation actions
- **Remediated Diagram** — Architecture diagram with privacy controls injected

**Scoring Formula:**
```
Risk Impact = Severity × Likelihood × Category Weight × Confidence × Regulatory Multiplier
Privacy Score = 100 - (Average Risk Impact / Max Possible Risk × 100)
```

Category weights amplify high-impact areas — Identifiability and Non-compliance are weighted at 1.5×, Data Disclosure at 1.4×.

---

### AI Architect & Diagrams

Generate system architecture diagrams from natural language descriptions.

**How to Use:**
1. Navigate to **AI Architect** or **Architecture**
2. Describe your system in plain text
3. Select a diagram type:
   - **Simple** — 6 components max, MVP-friendly
   - **Detailed** — 15 components max, production architecture
   - **DFD** — Data Flow Diagram
4. Click **Generate** — PlantUML diagram is rendered

**Features:**
- **Anti-Pattern Detection** — Identifies over-engineering (e.g., Kubernetes for simple apps, multiple message queues without justification)
- **Privacy Control Injection** — Automatically suggests where to add privacy controls
- **Diagram Versioning** — Save diagrams with version history and diff tracking
- **Approval Workflow** — Submit diagrams for admin review before finalization
- **Caching** — Generated diagrams cached in Redis (24-hour TTL)

**Saving Diagrams:**
1. After generation, click **Save**
2. Enter a title and optional notes
3. Diagram is saved with version 1
4. Submit for admin approval if required
5. Admin reviews and approves or requests revisions

---

### Compliance Readiness

Track your organization's compliance against major regulatory frameworks.

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
1. **Relevance** — Does the document match the requirement?
2. **Substance** — Does it contain real evidence (not just keywords)?
3. **Completeness** — Does it cover all aspects of the requirement?
4. **Specificity** — Are there concrete details (dates, names, procedures)?
5. **Authenticity** — Does it appear to be a genuine organizational document?

Documents are scored with a confidence level (0–100). Documents scoring above 70% are approved; below 30% are rejected; in between are flagged for manual review.

**Badge Levels:**

| Badge | Score Required |
|-------|---------------|
| Bronze | 30% |
| Silver | 60% |
| Gold | 90% |
| Platinum | 100% |

**Exports:**
- **PDF Report** — Branded compliance readiness report with category breakdowns and gap analysis
- **PDF Certificate** — Landscape badge certificate for achieved compliance levels
- **JSON Export** — Structured data for programmatic consumption

**Admin Review:**
Admins can access the **Compliance Review** page to:
- View pending document reviews
- Bulk approve or request revisions
- See review statistics (pending count, average review time, framework breakdown)

---

### Privacy Scanner

Automated PII/SPI discovery across your data sources.

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
- **Named Entity Recognition (NER)** — Detects PII in unstructured text
- **Pattern Matching** — 100+ regex patterns for structured identifiers (SSN, IBAN, NHS numbers, phone numbers, etc.)
- **Feature Extraction** — Statistical analysis of data characteristics
- **Language Detection** — Multi-language support for international PII

**Scan Types:**
- **Full** — Scans all assets in the data source
- **Incremental** — Only scans assets modified since last scan
- **Targeted** — Scans specific tables/collections

**Dashboard Features:**
- Risk heatmap (asset × data type matrix)
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
- Sensitive field export with confidence filtering

---

### Cloud Environment Scanning

Scan entire cloud environments for privacy and security issues.

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
- **Module-by-Module Results** — See findings per scan module (storage, IAM, logging)
- **Compliance Mapping** — Findings mapped to ISO 27001, SOC 2, GDPR, HIPAA, PCI-DSS, NIST controls
- **LINDDUN Threat Analysis** — Privacy threat categorization of findings
- **Topology Visualization** — Interactive cloud resource topology graph
- **Evidence Package** — Exportable evidence for compliance audits (JSON, CSV, or ZIP)

**Scan History:**
Track and compare scan results over time to measure improvement.

---

### Data Lineage

Track how data moves through your organization.

**Features:**
- **Data Nodes** — Define sources, processors, and sinks
- **Flow Tracking** — Document data movement with purpose and legal basis
- **Auto-Detection** — AI-powered detection of data flows from infrastructure
- **Graph Visualization** — Interactive lineage graph
- **Snapshots** — Point-in-time snapshots for audit and compliance

---

### Data Subject Requests

Manage GDPR data subject requests end-to-end.

**Request Types:**
- **Access** — Subject requests a copy of their data
- **Erasure** — Right to be forgotten
- **Portability** — Data export in machine-readable format
- **Rectification** — Correct inaccurate data

**Workflow:**
1. Create a new DSR with subject details
2. Automated discovery finds where the subject's data exists
3. Execute deletion, anonymization, or export operations
4. Complete audit trail is maintained for regulatory proof
5. Stakeholders are notified of status changes

**Dashboard:**
- Active request count
- SLA compliance tracking
- Completion rates by request type

---

### Incident Response

Track data breach incidents through their full lifecycle.

**Incident Lifecycle:**
```
Detected → Investigating → Contained → Remediated → Closed
```

**Features:**
- Create incidents with severity level, type, affected data, and record counts
- Detailed timeline tracking of all events and actions
- Automatic calculation of regulatory notification deadlines:
  - GDPR: 72-hour notification to supervisory authority
  - HIPAA: 60-day notification to individuals
  - Other framework-specific deadlines
- Notification management for affected parties, DPOs, and regulators
- Framework-specific incident response procedures

---

### Consent Management

Integrate with consent management platforms to track consent records.

**Supported Providers:**
- OneTrust
- Cookiebot
- Custom consent management systems

**Features:**
- Track individual consent records with purposes, status, and timestamps
- Synchronize consent data from external providers
- Track consent withdrawal and ensure downstream compliance
- Historical consent records for audit purposes

---

### Organizations & Teams

Multi-tenant organization management.

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
- Stripe-based billing with plan management (Free, Pro, Enterprise)

---

### Developer Settings

Programmatic access to the platform.

**API Keys:**
- Create API keys with custom names and optional expiration
- Use API keys via `X-API-Key` header for programmatic access
- Revoke keys at any time

**Webhooks:**
- Configure webhook endpoints for event notifications
- Test webhooks with sample payloads
- Events: analysis completed, scan completed, compliance updated, incident created

---

## API Reference

**Base URL:** `http://localhost:8000`

**Authentication:** All protected endpoints require a JWT token in the `Authorization` header:
```
Authorization: Bearer <your-jwt-token>
```

**Error Responses:**
```json
{
  "detail": "Error message describing what went wrong"
}
```

Common HTTP status codes:
- `200` — Success
- `201` — Created
- `400` — Bad request (invalid input)
- `401` — Unauthorized (missing or invalid token)
- `403` — Forbidden (insufficient permissions)
- `404` — Not found
- `422` — Validation error
- `429` — Rate limited
- `500` — Internal server error

---

### Authentication

#### `POST /api/auth/login`

Authenticate and receive JWT + refresh tokens.

**Auth:** None

```json
// Request
{ "email": "user@example.com", "password": "secret" }

// Response
{
  "access_token": "<jwt>",
  "refresh_token": "<token>",
  "user": { "id": "...", "email": "...", "name": "...", "role": "..." },
  "expires_at": "2026-03-06T12:00:00"
}
```

#### `POST /api/auth/logout`

Logout and invalidate session.

**Auth:** Required

```json
// Response
{ "message": "Logged out successfully" }
```

#### `POST /api/auth/refresh`

Exchange a refresh token for new access + refresh tokens. Refresh tokens are single-use.

**Auth:** None

```json
// Request
{ "refresh_token": "<refresh_token>" }

// Response
{ "access_token": "<new_jwt>", "refresh_token": "<new_refresh>", "expires_at": "..." }
```

#### `GET /api/auth/me`

Get current user identity from JWT.

**Auth:** Required

```json
// Response
{ "id": "...", "email": "..." }
```

#### `POST /api/auth/forgot-password`

Request password reset email. Always returns the same message to prevent email enumeration. Rate-limited to 3 requests per hour per email.

**Auth:** None

```json
// Request
{ "email": "user@example.com" }

// Response
{ "message": "If an account with that email exists, we've sent a password reset link." }
```

#### `POST /api/auth/reset-password`

Reset password using a valid single-use token.

**Auth:** None

```json
// Request
{ "token": "<reset_token>", "new_password": "newPassword123" }

// Response
{ "message": "Password has been reset successfully. You can now log in." }
```

#### `GET /api/auth/verify-email/{token}`

Verify user email using the token sent during signup.

**Auth:** None

#### `POST /api/auth/resend-verification`

Resend email verification link. Rate-limited to 3 per 24 hours.

**Auth:** Required

#### `GET /api/auth/invite/{token}`

Get invitation details from a token.

**Auth:** None

```json
// Response
{
  "valid": true,
  "email": "invitee@example.com",
  "organization": { "id": "...", "name": "Acme", "subdomain": "acme" },
  "role": "member",
  "invited_by": "Jane Smith",
  "expires_at": "2026-03-13T..."
}
```

#### `POST /api/auth/invite/accept`

Accept an organization invitation.

**Auth:** Required
**Query:** `token=<invitation_token>`

```json
// Response
{
  "message": "Successfully joined Acme",
  "organization": { "id": "...", "name": "Acme", "subdomain": "acme", "role": "member" }
}
```

---

### Analyses

#### `POST /api/analyses`

Run a full AI privacy analysis with scoring and optional diagram generation.

**Auth:** Required

```json
// Request
{
  "input_text": "System description (10–16000 chars)",
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
```

#### `GET /api/analyses`

List analyses with pagination.

**Auth:** Required
**Query:** `page` (default 1), `page_size` (default 20)

```json
// Response
{
  "analyses": [
    { "id": "...", "input_text_preview": "...", "privacy_score": 72.5, "grade": "C", "risk_level": "Medium", "created_at": "..." }
  ],
  "total": 45, "page": 1, "page_size": 20, "total_pages": 3
}
```

#### `GET /api/analyses/{analysis_id}`

Get full analysis detail including threats, mitigations, and compliance impact.

**Auth:** Required

```json
// Response
{
  "id": "...",
  "input_text": "...",
  "analysis_markdown": "## Privacy Analysis\n...",
  "scores": { "privacy_score": 72.5, ... },
  "threats": [{ "id": "T1", "name": "Data Exposure", "category": "Disclosure", "severity": "High" }],
  "compliance_impact": { "GDPR": "...", "CCPA": "..." },
  "recommendations": ["Encrypt data at rest", ...],
  "diagram_url": "https://signed-gcs-url",
  "mermaid_code": "graph TD..."
}
```

#### `DELETE /api/analyses/{analysis_id}`

Delete an analysis.

**Auth:** Required (owner, org admin, or system admin)

#### `POST /api/analyze`

Structured privacy threat analysis using LINDDUN + STRIDE. Optionally accepts a base64 image.

**Auth:** Optional

```json
// Request
{
  "system_description": "System architecture (10–16000 chars)",
  "frameworks": ["GDPR", "CCPA"],
  "image_base64": "<optional>"
}

// Response
{
  "analysis_id": "...",
  "threats": [{ "id": "T1", "severity": "High", "likelihood": "Medium", "linddun": "Disclosure", "stride": "Information Disclosure" }],
  "compliance": { "GDPR": { "status": "...", "gaps": [...] } },
  "mitigations": [{ "id": "M1", "threat_id": "T1", "control": "...", "priority": "High" }],
  "privacy_score": 72.5,
  "security_score": 68.0,
  "overall_score": 70.0,
  "grade": "C",
  "risk_level": "Medium"
}
```

#### `POST /api/analyze/remediate`

Generate a remediated architecture diagram with privacy controls injected.

**Auth:** Optional

```json
// Request
{
  "system_description": "...",
  "threats": [{ "id": "T1", "name": "Data Exposure", ... }],
  "mitigations": [{ "id": "M1", "control": "Encrypt at rest", "addresses": ["T1"] }]
}

// Response
{
  "plantuml_code": "@startuml\n...",
  "svg": "<svg>...</svg>",
  "controls_added": ["Encryption Layer", "Audit Logger"],
  "threats_addressed": ["T1", "T2"]
}
```

#### `POST /api/score`

Calculate privacy scores from a list of threats.

**Auth:** Optional

```json
// Request
{
  "threats": [{ "threat": "...", "severity": "High", "likelihood": "Medium", "linddun": "Disclosure" }],
  "architecture": "Optional architecture description",
  "frameworks": ["GDPR", "CCPA"],
  "data_volume": "low|medium|high|very_high",
  "integration_count": 3,
  "exposure_surface": "internal|limited|public"
}

// Response
{
  "privacy_score": 72.5,
  "security_score": 68.0,
  "overall_score": 73.5,
  "grade": "C",
  "risk_level": "Medium",
  "methodology": "NIST PRAM + FAIR-Privacy"
}
```

---

### Diagrams

#### `POST /api/diagram`

Generate a diagram synchronously from a system description.

**Auth:** Optional

```json
// Request
{
  "system_description": "E-commerce platform with payment processing...",
  "diagram_type": "detailed|simple|dfd|d2_detailed|d2_simple|d2_dfd|d2_network",
  "bypass_cache": false
}

// Response
{
  "diagram_code": "@startuml\n...",
  "diagram_svg": "<svg>...</svg>",
  "success": true,
  "cached": false,
  "privacy_analysis": { "threats": [...] },
  "privacy_compliance_score": 85,
  "privacy_compliance_grade": "B"
}
```

#### `POST /api/diagram/async`

Start async diagram generation. Poll `/api/diagram/status/{task_id}` for result.

**Auth:** Optional

```json
// Request
{ "system_description": "...", "diagram_type": "detailed" }

// Response
{ "task_id": "abc123", "status": "pending", "message": "Poll /api/diagram/status/abc123 for result." }
```

#### `GET /api/diagram/status/{task_id}`

Poll for async diagram generation status.

**Auth:** Optional

```json
// Response
{ "task_id": "abc123", "status": "pending|processing|completed|failed", "diagram_response": { ... } }
```

#### `GET /api/diagram/cache/stats`

Get diagram cache statistics.

**Auth:** Required

#### `POST /api/diagrams/save`

Save a diagram with version history.

**Auth:** Required

```json
// Request
{
  "title": "Payment System Architecture",
  "system_description": "...",
  "diagram_type": "detailed",
  "plantuml_code": "@startuml\n...",
  "diagram_svg": "<svg>...</svg>",
  "version_notes": "Initial version"
}

// Response
{ "id": "diagram_id", "title": "...", "current_version": 0, "approval_status": "draft" }
```

#### `GET /api/diagrams`

List saved diagrams.

**Auth:** Required
**Query:** `skip`, `limit`, `diagram_type`, `refresh`

#### `GET /api/diagrams/{diagram_id}`

Get diagram details with all versions and signed preview URLs.

**Auth:** Required

#### `POST /api/diagrams/{diagram_id}/regenerate`

Regenerate a diagram with an updated description, creating a new version.

**Auth:** Required

#### `DELETE /api/diagrams/{diagram_id}`

Delete a diagram and all versions.

**Auth:** Required

#### `POST /api/diagrams/{diagram_id}/versions/{version_id}/submit-approval`

Submit a diagram version for admin approval.

**Auth:** Required (diagram owner)

```json
// Request
{ "user_comment": "Ready for production use" }
```

#### `GET /api/diagrams/{diagram_id}/versions/{version_id}/approval-status`

Get approval status for a diagram version.

**Auth:** Required

#### `GET /api/admin/diagram-approvals/pending`

List pending diagram approval requests (admin only).

**Auth:** Admin

#### `PUT /api/admin/diagram-approvals/{version_id}/review`

Approve or request revision for a diagram.

**Auth:** Admin

```json
// Request
{ "status": "approved|needs_revision", "admin_feedback": "..." }
```

---

### Compliance

#### `POST /api/compliance/seed`

Seed compliance frameworks into the database. Run once during setup.

**Auth:** Admin only

#### `GET /api/compliance/frameworks`

List all frameworks with user progress.

**Auth:** Required

```json
// Response
[{
  "id": "...", "code": "GDPR", "name": "General Data Protection Regulation",
  "total_requirements": 32,
  "user_progress": { "completed": 12, "pending": 20, "score": 37.5 }
}]
```

#### `GET /api/compliance/frameworks/{framework_code}/requirements`

Get requirements for a framework grouped by category with upload status.

**Auth:** Required

```json
// Response
{
  "framework": { ... },
  "categories": [{
    "category": "Data Rights",
    "requirements": [{
      "id": "...", "code": "GDPR-Art17", "title": "Right to Erasure",
      "importance": "critical", "status": "completed|pending",
      "uploaded_document": { "id": "...", "filename": "...", "status": "approved" }
    }]
  }],
  "overall_score": 37.5
}
```

#### `POST /api/compliance/documents/upload`

Upload a compliance evidence document. AI validates content automatically.

**Auth:** Required

```json
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
```

#### `GET /api/compliance/documents`

List compliance documents with optional filters.

**Auth:** Required
**Query:** `framework_code`, `status`, `category`

#### `GET /api/compliance/documents/{doc_id}`

Get document details with signed download URL.

**Auth:** Required

#### `PUT /api/compliance/documents/{doc_id}/review`

Admin review — approve or request revision.

**Auth:** Admin

```json
// Request
{ "status": "approved|needs_revision", "review_notes": "..." }
```

#### `DELETE /api/compliance/documents/{doc_id}`

Archive a compliance document and recalculate score.

**Auth:** Required (document owner)

#### `GET /api/compliance/status`

Overall compliance status across all frameworks.

**Auth:** Required

```json
// Response
{
  "overall_score": 42.1,
  "frameworks": [{
    "framework_code": "GDPR", "score": 37.5, "status": "in_progress",
    "badge_level": null, "completed_requirements": 12, "total_requirements": 32
  }]
}
```

#### `GET /api/compliance/status/{framework_code}`

Compliance status for a specific framework.

**Auth:** Required

#### `GET /api/compliance/report/{framework_code}`

Generate a compliance report.

**Auth:** Required
**Query:** `format=pdf|json`
**Response:** PDF binary or JSON data

#### `GET /api/compliance/certificate/{framework_code}`

Generate a compliance badge certificate (requires 30%+ score).

**Auth:** Required
**Response:** PDF binary

#### `GET /api/compliance/admin/stats`

Review statistics for the admin dashboard.

**Auth:** Admin

```json
// Response
{
  "pending_count": 12,
  "reviewed_this_week": 5,
  "avg_review_days": 1.3,
  "framework_breakdown": { "GDPR": 7, "SOC2": 3, "CCPA": 2 }
}
```

#### `GET /api/compliance/admin/review-queue`

Paginated list of documents pending review.

**Auth:** Admin
**Query:** `framework`, `status`, `user_search`, `sort_by`, `page`, `page_size`

#### `POST /api/compliance/admin/bulk-review`

Bulk approve or request revision for multiple documents.

**Auth:** Admin

```json
// Request
{ "document_ids": ["doc1", "doc2"], "status": "approved|needs_revision", "review_notes": "..." }

// Response
{ "updated": 2, "errors": [] }
```

---

### Privacy Scanner API

#### Data Sources

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/privacy-scanner/sources` | Create a data source |
| `GET` | `/api/privacy-scanner/sources` | List data sources |
| `GET` | `/api/privacy-scanner/sources/{id}` | Get data source |
| `GET` | `/api/privacy-scanner/sources/{id}/config` | Get decrypted config (masked) |
| `PUT` | `/api/privacy-scanner/sources/{id}` | Update data source |
| `DELETE` | `/api/privacy-scanner/sources/{id}` | Delete data source and all data |
| `POST` | `/api/privacy-scanner/sources/{id}/test` | Test connection |
| `POST` | `/api/privacy-scanner/sources/{id}/schedule` | Set scan schedule |
| `DELETE` | `/api/privacy-scanner/sources/{id}/schedule` | Remove schedule |

**Create Data Source:**

```json
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
```

**Set Schedule:**

```json
// Request
{ "schedule_type": "hourly|daily|weekly|monthly|cron", "cron_expression": "0 2 * * *", "timezone": "UTC" }
```

#### Scans

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/privacy-scanner/scans` | Create and start a scan |
| `GET` | `/api/privacy-scanner/scans` | List scans |
| `GET` | `/api/privacy-scanner/scans/{id}` | Get scan details |
| `POST` | `/api/privacy-scanner/scans/{id}/pause` | Pause a running scan |
| `POST` | `/api/privacy-scanner/scans/{id}/resume` | Resume a paused scan |
| `POST` | `/api/privacy-scanner/scans/{id}/cancel` | Cancel a scan |

**Create Scan:**

```json
// Request
{ "source_id": "src_123", "scan_type": "full|incremental|targeted", "sample_size": 1000 }

// Response
{
  "id": "scan_123", "status": "pending", "scan_type": "full",
  "progress_percentage": 0, "assets_discovered": 0,
  "sensitive_fields_found": 0, "findings_count": 0
}
```

#### Findings

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/privacy-scanner/findings` | List findings (sorted by risk score) |

**Query:** `scan_id`, `severity`, `status`, `skip`, `limit`

#### Dashboard

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/privacy-scanner/dashboard/summary` | Aggregated statistics |
| `GET` | `/api/privacy-scanner/dashboard/heatmap` | Risk heatmap data |
| `GET` | `/api/privacy-scanner/dashboard/risky-assets` | Top N risky assets |
| `GET` | `/api/privacy-scanner/dashboard/compliance-summary` | Findings by compliance framework |

#### Attack Paths

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/privacy-scanner/attack-paths/analyze` | Build attack graph |
| `GET` | `/api/privacy-scanner/attack-paths` | List attack paths |
| `GET` | `/api/privacy-scanner/attack-paths/graph` | Get D3.js-compatible graph |
| `GET` | `/api/privacy-scanner/attack-paths/critical-nodes` | Get bottleneck nodes |
| `GET` | `/api/privacy-scanner/attack-paths/summary` | Aggregated statistics |
| `GET` | `/api/privacy-scanner/attack-paths/{id}` | Get path detail |
| `PUT` | `/api/privacy-scanner/attack-paths/{id}/status` | Update path status |
| `DELETE` | `/api/privacy-scanner/attack-paths/clear` | Clear all paths |

#### ML Classification

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/privacy-scanner/ml/patterns` | List classification patterns (100+) |
| `GET` | `/api/privacy-scanner/ml/patterns/stats` | Pattern library statistics |
| `POST` | `/api/privacy-scanner/ml/classify` | Classify a single field |
| `POST` | `/api/privacy-scanner/ml/classify/batch` | Classify up to 100 fields |
| `POST` | `/api/privacy-scanner/ml/feedback` | Submit classification correction |
| `GET` | `/api/privacy-scanner/ml/feedback` | List feedback |
| `POST` | `/api/privacy-scanner/ml/train` | Trigger model retraining |
| `GET` | `/api/privacy-scanner/ml/training-stats` | Training readiness stats |
| `GET` | `/api/privacy-scanner/ml/features` | Debug feature extraction |

**Classify Field:**

```json
// Request
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
```

#### Export

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/privacy-scanner/export/scan/{scan_id}` | Export scan report (json/csv/pdf) |
| `GET` | `/api/privacy-scanner/export/findings` | Export findings (csv/json/pdf) |
| `GET` | `/api/privacy-scanner/export/dashboard` | Export dashboard summary |
| `GET` | `/api/privacy-scanner/export/sensitive-fields` | Export sensitive fields |

#### Other

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/privacy-scanner/connectors/available` | List available connector types |
| `GET` | `/api/privacy-scanner/access-patterns/{source_id}` | Access pattern analysis |
| `GET` | `/api/privacy-scanner/threat-rules` | List threat detection rules |
| `POST` | `/api/privacy-scanner/threat-rules/sync` | Sync default rules (admin) |
| `GET` | `/api/privacy-scanner/schedules` | List active schedules |
| `GET` | `/api/privacy-scanner/schedules/due` | Get due scans |
| `POST` | `/api/privacy-scanner/schedules/trigger` | Trigger due scans |

---

### Cloud Scanner API

#### Cloud Attachments

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/scanner/cloud/attachments` | Create cloud attachment |
| `GET` | `/api/scanner/cloud/attachments` | List attachments |
| `GET` | `/api/scanner/cloud/attachments/{id}` | Get attachment |
| `PATCH` | `/api/scanner/cloud/attachments/{id}` | Update attachment |
| `DELETE` | `/api/scanner/cloud/attachments/{id}` | Delete attachment |
| `POST` | `/api/scanner/cloud/attachments/{id}/test` | Test connection |

**Create Cloud Attachment:**

```json
// Request (AWS example)
{
  "provider": "aws",
  "name": "Production AWS",
  "auth_type": "access_keys",
  "credentials": {
    "access_key_id": "AKIA...",
    "secret_access_key": "...",
    "region": "us-east-1"
  },
  "enabled_modules": {
    "object_storage": true,
    "iam": true,
    "logs": true
  },
  "scope": {
    "regions": ["us-east-1", "eu-west-1"],
    "max_objects_per_bucket": 1000
  }
}
```

#### Environment Scans

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/scanner/cloud/attachments/{id}/scans` | Start environment scan |
| `GET` | `/api/scanner/cloud/scans` | List scans |
| `GET` | `/api/scanner/cloud/scans/{id}` | Get scan details |
| `GET` | `/api/scanner/cloud/scans/{id}/progress` | Get real-time progress |
| `GET` | `/api/scanner/cloud/scans/{id}/findings` | Get scan findings |
| `GET` | `/api/scanner/cloud/scans/{id}/compliance` | Get compliance results |
| `GET` | `/api/scanner/cloud/scans/{id}/modules` | Get module-level results |
| `GET` | `/api/scanner/cloud/scans/{id}/topology` | Get resource topology graph |
| `GET` | `/api/scanner/cloud/scans/{id}/threats` | Get LINDDUN threat mapping |
| `GET` | `/api/scanner/cloud/scans/{id}/compliance-readiness` | Get readiness assessment |
| `GET` | `/api/scanner/cloud/scans/{id}/evidence` | Export evidence package |

**Compliance Results:**

```json
// Response
{
  "frameworks": {
    "ISO27001": { "passed": 18, "failed": 4, "score": 82, "controls": [...] },
    "SOC2": { "passed": 12, "failed": 2, "score": 86, "controls": [...] },
    "GDPR": { "passed": 8, "failed": 3, "score": 73, "controls": [...] }
  }
}
```

#### Dashboard

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/scanner/cloud/summary` | Cloud scanning summary |

---

### Users

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/users/profile` | Required | Get current user profile |
| `PUT` | `/api/users/profile` | Required | Update profile |
| `GET` | `/api/users` | Admin | List all users |
| `POST` | `/api/users` | Admin | Create user |
| `GET` | `/api/users/{id}` | Admin | Get user |
| `PUT` | `/api/users/{id}` | Admin | Update user |
| `PUT` | `/api/users/{id}/role` | Admin | Update user role |
| `DELETE` | `/api/users/{id}` | Admin | Delete user |
| `PUT` | `/api/users/{id}/reset-password` | Admin | Reset user password |

---

### Organizations

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/organizations` | Required | Create organization |
| `GET` | `/api/organizations` | Required | List user's organizations |
| `GET` | `/api/organizations/current` | Required | Get current organization |
| `GET` | `/api/organizations/{id}` | Member | Get organization |
| `PUT` | `/api/organizations/{id}` | Admin+ | Update organization |
| `DELETE` | `/api/organizations/{id}` | Owner | Delete organization |
| `GET` | `/api/organizations/{id}/members` | Member | List members |
| `POST` | `/api/organizations/{id}/members/invite` | Admin+ | Invite member |
| `PUT` | `/api/organizations/{id}/members/{mid}/role` | Owner | Update member role |
| `DELETE` | `/api/organizations/{id}/members/{mid}` | Admin+ | Remove member |

**Superadmin Endpoints:**

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/admin/organizations` | List all organizations |
| `GET` | `/api/admin/organizations/stats/global` | Global statistics |
| `GET` | `/api/admin/organizations/{id}` | Get org details |
| `PUT` | `/api/admin/organizations/{id}` | Update org settings/limits |
| `DELETE` | `/api/admin/organizations/{id}` | Delete org (soft/hard) |
| `POST` | `/api/admin/organizations` | Create org with owner |

---

### Incidents

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/incidents` | Required | Create incident |
| `GET` | `/api/incidents` | Required | List incidents |
| `GET` | `/api/incidents/{id}` | Required | Get incident details |
| `PUT` | `/api/incidents/{id}` | Required | Update incident |
| `POST` | `/api/incidents/{id}/timeline` | Required | Add timeline event |
| `PUT` | `/api/incidents/{id}/status` | Required | Update status |
| `POST` | `/api/incidents/{id}/notify` | Required | Send notifications |
| `GET` | `/api/incidents/{id}/deadlines` | Required | Get regulatory deadlines |

**Create Incident:**

```json
// Request
{
  "title": "Customer Data Breach",
  "description": "Unauthorized access to customer records",
  "severity": "critical",
  "incident_type": "data_breach",
  "affected_data_types": ["email", "ssn"],
  "affected_record_count": 500
}
```

---

### Data Lineage API

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/lineage/nodes` | Required | Create data node |
| `GET` | `/api/lineage/nodes` | Required | List nodes |
| `GET` | `/api/lineage/nodes/{id}` | Required | Get node |
| `PUT` | `/api/lineage/nodes/{id}` | Required | Update node |
| `DELETE` | `/api/lineage/nodes/{id}` | Required | Delete node |
| `POST` | `/api/lineage/flows` | Required | Create data flow |
| `GET` | `/api/lineage/flows` | Required | List flows |
| `DELETE` | `/api/lineage/flows/{id}` | Required | Delete flow |
| `GET` | `/api/lineage/graph` | Required | Get lineage graph |
| `POST` | `/api/lineage/detect` | Required | AI-detect flows |
| `POST` | `/api/lineage/snapshots` | Required | Create snapshot |
| `GET` | `/api/lineage/snapshots` | Required | List snapshots |

---

### DSR API

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/dsr/requests` | Required | Create DSR |
| `GET` | `/api/dsr/requests` | Required | List requests |
| `GET` | `/api/dsr/requests/{id}` | Required | Get request |
| `PUT` | `/api/dsr/requests/{id}` | Required | Update request |
| `POST` | `/api/dsr/requests/{id}/discover` | Required | Discover subject data |
| `POST` | `/api/dsr/requests/{id}/execute` | Required | Execute request |
| `GET` | `/api/dsr/requests/{id}/audit` | Required | Get audit trail |
| `GET` | `/api/dsr/dashboard` | Required | Dashboard statistics |

---

### Consent API

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/consent/providers` | Required | Add consent provider |
| `GET` | `/api/consent/providers` | Required | List providers |
| `PUT` | `/api/consent/providers/{id}` | Required | Update provider |
| `DELETE` | `/api/consent/providers/{id}` | Required | Delete provider |
| `POST` | `/api/consent/providers/{id}/sync` | Required | Sync consent data |
| `GET` | `/api/consent/records` | Required | List consent records |
| `GET` | `/api/consent/records/{id}` | Required | Get consent record |
| `GET` | `/api/consent/dashboard` | Required | Consent dashboard |

---

### API Keys

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/api-keys` | Required | Create API key |
| `GET` | `/api/api-keys` | Required | List API keys |
| `DELETE` | `/api/api-keys/{id}` | Required | Revoke API key |

**Create API Key:**

```json
// Request
{ "name": "CI/CD Pipeline", "expires_in_days": 90 }

// Response
{ "id": "...", "name": "CI/CD Pipeline", "key": "pak_abc123...", "created_at": "...", "expires_at": "..." }
```

The key is only shown once at creation. Use it via the `X-API-Key` header.

---

### Webhooks

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/webhooks` | Required | Create webhook |
| `GET` | `/api/webhooks` | Required | List webhooks |
| `PUT` | `/api/webhooks/{id}` | Required | Update webhook |
| `DELETE` | `/api/webhooks/{id}` | Required | Delete webhook |
| `POST` | `/api/webhooks/{id}/test` | Required | Test webhook |

---

### SSO

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/sso/config` | Admin | Get SSO configuration |
| `PUT` | `/api/sso/config` | Admin | Update SSO configuration |
| `POST` | `/api/sso/test` | Admin | Test SSO connection |
| `GET` | `/api/sso/login` | None | Initiate SSO login flow |
| `POST` | `/api/sso/callback` | None | SSO callback handler |

---

### Health

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/health` | None | Service health check |

```json
// Response
{ "status": "healthy", "version": "1.0.0", "database": "connected" }
```

---

## Architecture

### Tech Stack

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

- **JWT Authentication** — 24-hour access tokens, 30-day refresh tokens with rotation
- **Security Headers** — CSP, HSTS, X-Frame-Options, X-Content-Type-Options
- **Rate Limiting** — 500 requests/hour per IP (configurable)
- **CORS** — Configurable allowed origins
- **Encrypted Credentials** — Data source credentials encrypted at rest
- **Multi-Tenancy Isolation** — Organization-based data isolation via subdomain routing
- **RBAC** — Role-based access control at endpoint level

### Data Flow

```
User Input → FastAPI → AI Provider (Gemini/DeepSeek)
    → Parse & Score (NIST PRAM + FAIR-Privacy)
    → Store (PostgreSQL + Cloud Storage)
    → Return to React Frontend
```

### Async Processing

Long-running operations (privacy scans, cloud scans) run as Celery background tasks with Redis as the message broker. The frontend polls for progress updates.

---

*Generated by PriAITect — ShubhzSecure*
