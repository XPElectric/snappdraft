# Snappdraft: Electrical Estimating Management System

**Last Updated: October 17, 2025**

Snappdraft is a web-based tool that replaces manual electrical estimating sheets (like the EIS.pdf) with a simple, conversational interface. It automates workflows for intake, scoping, takeoff, pricing, and proposal generation, tailored for XP Electric's Estimating-as-a-Service (EaaS). By centralizing client, engineering firm, and project data, it ensures error-free outputs and scales efficiently for multiple projects.

## Purpose
- Streamline estimating from start to bid: Gather project details conversationally, track progress via checklists, and auto-generate branded proposals.
- Replace paper/digital forms with intuitive pages for adding clients and engineering firms, enabling quick dropdown selections during project setup.
- Focus on usability: Simple prompts (e.g., "What's the project name?") with adjacent input fields, minimizing clicks and cognitive load.

## Key Features
- **Conversational Project Intake**: Start with guided questions (e.g., Level 1: "What's the project?" → text field + client dropdown). Auto-populates from client/engineering firm databases.
- **Estimation Workflow**: Structured as lightweight "Quest Levels" for progress tracking without gamification overload.
- **Proposal Generator**: Builds proposals from inputs (scope, quotes, pricing), using the EGE example as a template—includes scope, exclusions, and material escalation clauses.
- **Data Management**: Dedicated pages for adding/editing clients (company details, contacts) and engineering firms (name, stamping engineer).
- **Checklists & Trackers**: Digital EIS equivalents for pre-bid info (industry, specs), quote requests, subcontractors, and post-bid results.
- **Time Tracking**: Log hours per task; auto-calculate % complete and hours to completion (HTC).
- **Reports**: Pre-bid summary (scope, risks) and post-bid analysis (bid comparison, notes).

## Estimating Quest Levels (Simplified Workflow)
Guides users through phases, tying into EIS sections for comprehensive coverage:

- **Level 1: Intake** – Gather basics: Project name/address, client/engineering firm selection, due date. Upload bid docs.
- **Level 2: Scope** – Define industry, delivery method, project type/details, construction/occupancy. Flag critical path items.
- **Level 3: Setup** – Review specs/wiring methods, building structure. Prep for takeoff (e.g., panel schedules).
- **Level 4: Counts & Quotes** – Track material needs (fixtures, switchgear), generate quote requests, log subcontractors.
- **Level 5: Takeoff & Pricing** – Input counts, apply labor factors, document exceptions/below-the-line costs.
- **Level 6: Review & Deliver** – Quality check, generate proposal/report, track bid results.

Each level uses conversational prompts and checkboxes, progressing via simple "Next" buttons.

## UI Principles
- **Conversational Design**: Prompts as headings (e.g., "Client Information?"), followed by inline fields/dropdowns. Auto-save progress.
- **Navigation**: Clean menu: Dashboard (active projects, time summary), Clients, Engineering Firms, Estimates (new/ongoing), Reports, Tools.
- **Accessibility**: Mobile-friendly, high-contrast, keyboard-navigable. No complex forms—break EIS into phased screens.

## Tech Stack
- **Framework**: Next.js (for fast, server-rendered pages).
- **Database**: PostgreSQL (for clients, projects, time logs).
- **Auth**: Auth0 (role-based: Estimator, Admin).
- **Deployment**: Vercel (easy scaling).
- **Integrations**: Future: Accubid for pricing; file storage for bid docs/PDFs.

## Pricing Plans
- **Free**: Up to 2 projects/month, basic intake/scope (Levels 1-2).
- **Paid**: $99/month – Unlimited projects, full workflow, proposal generation.
- **Premium**: Starts at $299/month – Multi-user, custom integrations.

## Next Steps
- **Short-Term (Week 1)**: Implement basic Next.js setup, conversational intake form (Level 1), client/engineering firm pages.
- **Medium-Term (Week 2-3)**: Add Quest progression, quote tracker, simple proposal output.
- **Ongoing**: Daily 1-hour iterations; test with EIS/proposal examples for accuracy.

This foundation positions Snappdraft for reliable, daily use—optimistically reducing estimate time by 50%, realistically building incrementally to avoid scope creep. Commit updates to GitHub after each session.
