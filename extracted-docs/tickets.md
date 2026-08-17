---
title: "Tickets"
category: "Core Features"
slug: "tickets"
---

# Tickets

The ticketing system provides structured support request management for your agency. Tickets represent **external requests** from your clients — bug reports, questions, feature requests, and support inquiries. They are separate from tasks, which represent internal work for your team.

## Tickets vs Tasks

Understanding the distinction between tickets and tasks is essential:

| Dimension | Tickets | Tasks |
|-----------|---------|-------|
| **Created by** | Clients (Org Owner, Admin, Member) | Agency team (Owner, Admin, PM, Team Member) |
| **Purpose** | External request management | Internal work management |
| **SLA tracking** | First response time, resolution time, breach alerts | No SLA concept |
| **Satisfaction** | CSAT ratings (1–5) from clients | No feedback loop |
| **Conversation** | Public replies + internal notes | Comments (internal/external) |
| **Billing** | Separate support billing pipeline | Project budget billing |

  A ticket **can generate a linked task**. When work is needed, use "Convert to Task" to create a task in any project. The ticket tracks the conversation and resolution; the task tracks the work.

## Creating a ticket

Tickets can be created from multiple sources:

  
    Agency team members (Owner, Admin, PM, Team Member) can create tickets **on behalf of a client**:

    1. Navigate to **Tickets** in the sidebar
    2. Click **New Ticket**
    3. Select the **client organization**
    4. Fill in subject, description, type, and priority
    5. Optionally assign a team member and link to a project or service
    6. Toggle **"Notify organization"** (default: ON) to alert the client

    
      This is useful for capturing support requests received via phone calls, emails, or Slack messages outside the portal.
    
  

  
    Clients can submit tickets from the portal in three ways:

    - **Tickets page** — dedicated page in the portal sidebar
    - **"Need Help?" button** — floating action button on every portal page
    - **"Report an Issue"** — button on project detail pages (pre-fills the project context)

    The submission form includes: Subject, Description (rich text with file upload), Type, Priority (default: Normal), and optional Project.
  

  
    Use the `/ticket` slash command in any messaging channel to create a ticket from a message thread. The ticket subject is pre-filled from the message content.
  

## Ticket numbering

Every ticket receives a sequential, human-readable number formatted as **`TKT-{N}`** (e.g., TKT-001, TKT-104). Numbers are sequential per agency and generated using atomic database operations to prevent race conditions.

  The `TKT-{N}` format is for display only. Internal database relations use the ticket's unique ID (cuid).

## Ticket lifecycle

Every ticket follows a structured lifecycle through configurable statuses. Six default statuses are provided:

  
    The initial status when a ticket is created. The SLA clock starts ticking immediately.
  

  
    The team has reviewed the ticket and determined priority and assignment. Still counts toward SLA time.
  

  
    An agent is actively working on the ticket. SLA clock continues.
  

  
    The agent needs information from the client. **The SLA clock pauses automatically** in this status.
  

  
    The issue has been addressed. The client receives a notification with an optional CSAT rating prompt. Resolved tickets auto-close after 7 days of inactivity.
  

  
    The ticket is confirmed complete. No further action expected.
  

  On Pro plans, you can create **custom statuses** beyond the 6 defaults — with custom names, colors, SLA pause behavior, and display ordering.

## Ticket types

Every ticket has a type that categorizes the nature of the request:

| Type | Description | Badge Color |
|------|-------------|-------------|
| **Bug** | Something is broken or not working correctly | Red |
| **Question** | Client needs clarification or information | Blue |
| **Feature Request** | Client suggests a new capability | Purple |
| **Change Request** | Client wants modifications to existing work | Orange |
| **Support** | General support or assistance needed | Teal |
| **Billing** | Invoice, payment, or billing inquiry | Green |
| **Other** | Anything that doesn't fit the above categories | Gray |

## Priority levels

Five priority levels determine SLA targets and notification urgency:

| Priority | Response Target | Resolution Target | Notification Priority |
|----------|----------------|-------------------|-----------------------|
| **Critical** | 30 minutes | 4 hours | P1 🚨 |
| **Urgent** | 1 hour | 8 hours | P1 🚨 |
| **High** | 4 hours | 1 business day | P2 |
| **Normal** | 8 hours | 3 business days | P3 |
| **Low** | 24 hours | 5 business days | P3 |

  SLA targets are configurable per agency in **Settings → Tickets → SLA Configuration**. The values above are defaults.

## Assignment

Tickets can be assigned to any agency team member (Owner, Admin, PM, or Team Member):

- **Manual assignment** — select an assignee when creating or from the ticket detail
- **Auto-assignment rules** (Enterprise) — route tickets automatically based on type, priority, or client using Specific, Round-Robin, or Least-Busy methods

When a ticket is assigned, the assignee receives a `TICKET_ASSIGNED` notification.

## Watchers & CC

Add stakeholders as **watchers** on a ticket. Watchers receive all public-facing notifications (new replies, status changes, resolution) without being the reporter or assignee. Org Owner and Org Admin can manage watchers from the ticket detail.

## Ticket sources

Tickets can originate from multiple channels:

| Source | Description |
|--------|-------------|
| **Portal** | Submitted via the client portal |
| **Email** | Created from inbound email (Enterprise) |
| **Messaging** | Created via the `/ticket` slash command |
| **Automation** | Created by an automation rule |
| **Manual** | Created by an agency team member on behalf of a client |

---

Beyond core CRUD, the ticketing system offers powerful features for agencies that handle high-volume client support.

## SLA tracking

Service Level Agreements define your response and resolution commitments per priority level.

### How SLA computation works

  Simple `resolvedAt - createdAt` math is **wrong** for SLA. If a ticket bounces between "In Progress" and "Waiting on Client" — paused for 4 days out of 5 — the actual active time is 1 day, not 5.

The system uses an **accumulator approach**:

1. Every status change logs the time spent in the previous status
2. If the previous status had **SLA active** (e.g., Open, In Progress), that duration is added to the accumulated active time
3. If the previous status had **SLA paused** (e.g., Waiting on Client), time is logged but **not** added to the accumulator
4. SLA breach checks compare accumulated active time against the target — not wall-clock time

### SLA breach handling

- **Warning at 80%** — `TICKET_SLA_WARNING` notification to the assigned agent and agency owner (P1 priority, bypasses email digests)
- **Breach at 100%** — `TICKET_SLA_BREACHED` notification to owner and admin; ticket flagged as breached
- **Optional escalation** — configure automation rules to auto-reassign breached tickets

### First response time

First response time = `firstRespondedAt - createdAt`. Only **public replies** by agency agents count (not internal notes).

  SLA tracking requires the **Pro plan** or higher. Starter plan users see an upgrade prompt.

## CSAT ratings

When a ticket is resolved, the client can rate their experience:

- **1–5 star rating** with optional text comment
- Prompted via the resolution notification email and in-app
- Org Owner, Org Admin, and Org Member (on their own tickets) can submit ratings
- Feeds into **Reports → Support** tab, **CRM health scoring**, and **CRM activity timeline**

  CSAT ratings require the **Pro plan** or higher (`ticketCsat` feature flag).

## Canned response templates

Save frequently used responses as reusable templates:

- **Title and content** — rich text body with categories and optional shortcut keys
- **Template management** — Owner, Admin, and PM can create, edit, and delete
- **Quick insert** — all agents can insert templates from a dropdown in the reply editor

  Canned templates require the **Pro plan** or higher (`ticketTemplates` feature flag).

## Ticket merging

When duplicate tickets arrive, merge them:

1. Open the source ticket → **"Merge into..."**
2. Search for the target ticket
3. The system re-parents replies, re-links time entries, merges watchers, adds an internal note, marks the source as merged, and notifies the reporter

  Cannot merge a ticket into itself or merge an already-merged ticket. Owner, Admin, and PM only.

## Auto-assignment rules

Route tickets automatically (Enterprise plan):

| Method | Description |
|--------|-------------|
| **Specific** | Assign to a named team member |
| **Round-Robin** | Rotate across a pool of team members |
| **Least-Busy** | Assign to the member with fewest open tickets |

**Conditions** (optional, AND logic): ticket type, priority, client organization. First matching rule wins.

## Custom statuses

Create statuses beyond the 6 defaults with custom names, colors, sort order, SLA pause behavior, and resolution flags. Drag-and-drop reordering supported.

  Custom statuses require the **Pro plan** or higher (`ticketCustomStatuses` feature flag).

## Convert to task

When internal work is needed:

1. Click **"Convert to Task"** on the ticket
2. Select the target project
3. A linked task is created with the ticket subject and description
4. The ticket tracks the client conversation; the task tracks the work

## Convert to proposal

Turn **Feature Request** and **Change Request** tickets into proposals:

1. Click **"Convert to Proposal"**
2. A new proposal is created with pre-filled subject and description
3. Creates a natural pipeline: **support request → proposal → billable project**

## Time tracking & billing

### Manual time entry and live timer

Log time via **"Log Time"** or start a **live timer** from the ticket drawer.

### Billing pathways

| Path | When | How |
|------|------|-----|
| **Service deduction** | Ticket linked to a support retainer | Auto-deducts from `balanceHoursRemaining` |
| **Invoice generation** | No service link | Unbilled time on CRM "Support Time" tab → "Generate Support Invoice" |

  Ticket time entries do **not** appear in project budget tabs. Support and project billing stay separate.

## Automation integration

5 triggers and 3 actions integrate with the automation engine:

**Triggers:** `ticket_created`, `ticket_status_changed`, `ticket_assigned`, `ticket_resolved`, `ticket_sla_breached`

**Actions:** `assign_ticket`, `update_ticket_status`, `create_ticket`

## Notifications

9 notification types covering the full ticket lifecycle: created, assigned, client replied, agent replied, resolved, reopened, SLA warning, SLA breached, and escalated. All support bell, email, and Slack delivery.

## Plan availability

| Feature | Starter | Pro | Enterprise |
|---------|:-------:|:---:|:----------:|
| Core ticketing | ✅ (50 max) | ✅ (unlimited) | ✅ |
| SLA tracking | ❌ | ✅ | ✅ |
| CSAT ratings | ❌ | ✅ | ✅ |
| Canned templates | ❌ | ✅ | ✅ |
| Ticket merging | ❌ | ✅ | ✅ |
| Custom statuses | ❌ | ✅ | ✅ |
| Auto-assignment | ❌ | ❌ | ✅ |
| Email-to-ticket | ❌ | ❌ | ✅ |

---

The ticketing system is fully integrated into the client portal, giving your clients a professional support experience under your brand.

## Submitting tickets

Clients can submit support tickets from three entry points:

  
    Dedicated page in the portal sidebar for viewing and submitting tickets.
  

  
    Floating action button visible on every portal page for quick access.
  

  
    Button on project detail pages that pre-fills the project context on the ticket.
  

### Submission form

The ticket submission form includes:

| Field | Required | Notes |
|-------|----------|-------|
| Subject | ✅ | Short summary of the issue |
| Description | ✅ | Rich text with file upload support |
| Type | ✅ | Bug, Question, Change Request, Feature Request, Support, Billing, Other |
| Priority | ✅ | Default: Normal |
| Project | ❌ | Optional project context |

  On Pro plans with intake forms enabled, ticket types can be linked to structured intake forms — showing category-specific fields like "Steps to Reproduce" for bug reports.

## Role-based visibility

Different organization roles see different sets of tickets:

| Role | What They See |
|------|--------------|
| **Org Owner** | All tickets for the organization |
| **Org Admin** | All tickets for the organization |
| **Org Member** | Only tickets they created or are watching |

  The Org Member visibility scoping ensures that junior team members (content managers, QA testers) can see and respond to their own tickets, but cannot browse the full organization's support history. Add them as **watchers** on specific tickets to grant access.

## Viewing tickets

The portal ticket list shows:

| Column | Description |
|--------|-------------|
| Ticket # | TKT-001 format, clickable |
| Subject | Ticket title |
| Status | Color-coded badge |
| Priority | Signal icon |
| Last Reply | Relative timestamp |
| My Rating | Stars (if resolved and rated) |

## Replying to tickets

Clients can reply to tickets from the ticket detail view:

- **Public replies** are visible to both the client and the agency team
- **Internal notes** from the agency team are **never visible** to clients
- Replies support **rich text** and **file attachments**

### Who can reply

| Role | Can Reply | Condition |
|------|:---------:|-----------|
| Org Owner | ✅ | On any organization ticket |
| Org Admin | ✅ | On any organization ticket |
| Org Member | ✅ | Only on tickets they created or are watching |

  Internal notes added by agency team members are completely hidden from all organization roles. The system enforces this server-side — not just in the UI — so notes cannot be exposed via API inspection.

## Rating satisfaction (CSAT)

When a ticket is resolved, clients receive a notification with a CSAT rating prompt:

1. Open the resolved ticket in the portal
2. Click the **star rating** (1–5)
3. Optionally add a **text comment** with feedback
4. Submit — the rating is recorded with the rater's identity and timestamp

CSAT ratings can also be submitted from the resolution notification email link.

| Role | Can Rate | Condition |
|------|:--------:|-----------|
| Org Owner | ✅ | Any resolved ticket |
| Org Admin | ✅ | Any resolved ticket |
| Org Member | ✅ | Only tickets they created or are watching |

## Reopening tickets

If a resolved issue resurfaces, Org Owner and Org Admin can **reopen** the ticket. This moves it back to an open status and notifies the assigned agent.

  Org Members cannot reopen tickets. They should create a new ticket or ask their Org Owner/Admin to reopen.

## Managing watchers

Org Owner and Org Admin can add or remove **watchers** (CC) on their organization's tickets. This is useful for:

- Keeping project managers informed on support issues
- Allowing an Org Member to follow a specific ticket without full visibility

## Portal navigation

The **Tickets** sidebar item appears for all organization roles (Org Owner, Org Admin, Org Member) when the agency has ticketing enabled.

  The agency can hide the Tickets nav item via the `portalHiddenNavItems` branding setting — same pattern as hiding Invoices, Projects, or other portal sections.

## Notifications for clients

| Event | Notification | Recipients |
|-------|-------------|-----------|
| Agency replies | `TICKET_REPLY_FROM_AGENT` | Reporter + watchers |
| Ticket resolved | `TICKET_RESOLVED` | Reporter (with CSAT prompt) |
| Ticket merged | Merge notification | Source ticket's reporter |

All ticket notification emails use the agency's branded email template (`sendBrandedEmail()`), respecting custom colors, logo, and white-label settings.
