# Snappdraft Requirements Document

## Version History
| Version | Date       | Author | Changes |
|---------|------------|--------|---------|
| 1.0     | 2025-10-17 | Grok   | Initial draft based on project overview and attached documents (README, example bid proposal, current estimating sheet). |

## Introduction
Snappdraft is a web-based electrical estimating management application designed to streamline the creation of estimating information sheets and automated bid proposals. It replaces the current estimating information sheet with a more dynamic, user-friendly system that captures data across key phases of the estimating process. The goal is to reduce manual effort, minimize errors, and generate professional proposals efficiently.

This requirements document outlines functional and non-functional requirements, user stories, and high-level architecture considerations. It will be iteratively refined through this thread as we gather feedback, prototype features, and align with evolving project needs. We're off to a strong start—Snappdraft has the potential to transform your workflow, but success depends on clear prioritization and testing.

## Scope
### In Scope
- User authentication and role-based access (e.g., estimator, admin).
- Conversational-style UI for data entry (e.g., guided prompts for project creation).
- Client and engineering firm management.
- Multi-phase estimating input (e.g., project details, labor, materials, overhead).
- Automated generation of bid proposals based on estimating data.
- Basic reporting and export (PDF/Word for proposals).

### Out of Scope (Initial Release)
- Advanced integrations (e.g., ERP systems, QuickBooks).
- Mobile app (focus on responsive web first).
- Complex scheduling or Gantt charts.
- AI-driven cost predictions (can be future enhancement).

## Functional Requirements

### 1. User Management
- **FR-UM-01**: Users can register and log in via email/password or OAuth (Google/Microsoft).
- **FR-UM-02**: Admins can add/edit/delete clients and engineering firms in a dedicated directory page.
  - Clients: Name, contact info, address, past projects.
  - Engineering Firms: Name, contact, preferred templates.
- **FR-UM-03**: Role-based permissions: Estimators view/edit estimates; Admins manage users/clients.

### 2. Project Creation and Management
- **FR-PM-01**: Create new projects via a conversational interface:
  - Prompt: "What's the project?" → Text field for project name.
  - Dropdown for client selection (searchable, auto-complete).
  - Optional: Engineering firm selection, project type (e.g., commercial, residential).
- **FR-PM-02**: Dashboard listing active projects with status (e.g., Draft, In Review, Proposal Sent).
- **FR-PM-03**: Edit/delete projects; archive completed ones.

### 3. Estimating Process
- **FR-EP-01**: Multi-phase input form, guided sequentially:
  - Phase 1: Project Basics (scope, timeline, location).
  - Phase 2: Labor (hours, rates, roles—pull from predefined library).
  - Phase 3: Materials (items, quantities, costs—integrate simple catalog).
  - Phase 4: Overhead/Profit (percentages, contingencies).
  - Each phase uses simple inputs: text fields, dropdowns, tables for line items.
- **FR-EP-02**: Auto-calculate totals (subtotals, taxes, grand total) with real-time updates.
- **FR-EP-03**: Validation: Required fields, range checks (e.g., labor hours > 0).
- **FR-EP-04**: Save drafts mid-process; resume from last phase.

### 4. Proposal Generation
- **FR-PG-01**: One-click generate bid proposal from completed estimate.
  - Template based on attached example: Cover letter, scope summary, cost breakdown, terms.
  - Customizable sections (e.g., add notes, logos).
- **FR-PG-02**: Export as PDF/Word; email directly to client.
- **FR-PG-03**: Version history for proposals (track changes).

### 5. UI/UX Guidelines
- **FR-UI-01**: Simple, intuitive navigation: Sidebar menu (Dashboard, Projects, Clients, Estimates, Proposals).
- **FR-UI-02**: Conversational elements: Stepper wizard for estimates; tooltips for fields.
- **FR-UI-03**: Responsive design for desktop/tablet; clean, professional theme (blues/grays for electrical theme).

## Non-Functional Requirements
- **NFR-PERF-01**: Page load < 2 seconds; handle up to 100 concurrent users.
- **NFR-SEC-01**: Data encryption (HTTPS, stored passwords hashed); GDPR-compliant for client data.
- **NFR-USAB-01**: Accessibility: WCAG 2.1 AA (alt text, keyboard nav).
- **NFR-TECH-01**: Tech Stack: Frontend (React/Vue), Backend (Node.js/Python), Database (PostgreSQL), Hosting (AWS/Heroku).
- **NFR-SCAL-01**: Modular design for easy feature additions (e.g., plugins for cost databases).

## User Stories
| ID | As a... | I want... | So that... | Priority |
|----|---------|-----------|------------|----------|
| US-01 | Estimator | A guided project setup | I can quickly start without missing details 
