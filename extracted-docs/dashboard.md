---
title: "Dashboard"
category: "Getting Started"
slug: "dashboard"
---

# Dashboard

Your dashboard is the first thing you see when you log in. It provides an at-a-glance overview tailored to your role in the agency.

## Onboarding Checklist

The first time you log in, a **personalized setup checklist** appears at the top of your dashboard. It guides you through the most important first steps based on your role — with a progress ring and auto-detection of completed tasks. The checklist collapses once you complete all steps or dismiss it.

> **See also:** [Onboarding](./onboarding) for full details on the checklist and role-specific steps

---

## Executive Dashboard

Available to **Owners**, **Admins**, **Project Managers**, **Accountants**, and **Team Members**.

### Revenue KPIs

| Metric | What It Shows |
|--------|--------------|
| **Total Revenue** | Sum of paid invoices in the current period |
| **Previous Period** | Same metric for the prior period (for comparison) |
| **Monthly Recurring Revenue (MRR)** | Revenue from active recurring services |
| **Annual Recurring Revenue (ARR)** | MRR × 12 |
| **Outstanding** | Total unpaid across all active invoices |
| **Overdue** | Unpaid invoices that are past their due date |

Use the **period filter** to switch between This Month, Last Month, This Quarter, This Year, and more.

### Project Health

Every active project is automatically scored based on task progress and deadline proximity:

| Health | Condition |
|--------|-----------|
| ● **On Track** | ≥50% of tasks completed, no overdue milestones |
| ● **At Risk** | &lt;50% tasks done, some overdue, or project due within 7 days |
| ● **Off Track** | &lt;25% tasks done and past due, or >50% tasks/milestones overdue |

### Team Workload

- Tasks by status: To Do, In Progress, In Review
- Per-member task load with overload flagging
- Top 5 overdue tasks sorted by urgency

### Dashboard Alerts

Real-time alert banners appear at the top of the dashboard when action is needed. Alerts are grouped by severity:

#### Critical Alerts

| Alert | Trigger |
|-------|---------|
| **Overdue Invoices** | Any invoice with overdue status |
| **Critical Projects** | Projects with "Off Track" health score |
| **Failed Automations** | Automation failures in the last 7 days |
| **Failing Subscription Renewals** | Client subscriptions with "Past Due" status |

#### Warning Alerts

| Alert | Trigger |
|-------|---------|
| **Stale Tasks** | Tasks overdue for more than 3 days |
| **Expiring Contracts** | Client contracts expiring within 30 days |

#### Informational Alerts

| Alert | Trigger |
|-------|---------|
| **Inactive Clients** | Clients with no activity for more than 30 days |
| **Unassigned Tasks** | More than 5 active tasks with no assignee |
| **Draft Invoices Pending** | Auto-generated draft invoices from recurring billing awaiting your review |

Click any alert to navigate directly to the relevant page. Dismiss alerts with the × button — they'll reappear on your next visit if the underlying condition persists.

### Monthly Revenue Trend

A chart showing your revenue over the last 6 months, making it easy to spot growth or dips.

### Additional Data

- **Upcoming invoices** — next 10 invoices due
- **Recent activity** — last 8 actions across the workspace
- **Messaging unread badge** — the Messages nav item in the sidebar shows a count of channels with unread messages. A branded dot also appears on the browser favicon when you have unread messages

> **See also:** [Messaging](./messaging) for real-time chat features

### Greeting & Daily Quote

The dashboard header shows a **time-aware greeting** that changes throughout the day:

| Time of Day | Greeting |
|------------|----------|
| Before 12:00 | Good Morning |
| 12:00 – 16:59 | Good Afternoon |
| 17:00+ | Good Evening |

Below the greeting, a **motivational quote** rotates daily from a curated collection of 345 quotes covering leadership, creativity, resilience, and more. The same date shows a different quote each year.

---

## Team Member Dashboard

A focused view for individual contributors showing:

| Section | What It Shows |
|---------|--------------|
| **My Tasks** | Active tasks assigned to you, grouped by status (To Do, In Progress, In Review) |
| **Upcoming Deadlines** | Tasks due within the next 7 days |
| **Recent Notifications** | Your 10 most recent unread notifications |
| **Status Counts** | Quick counts of your tasks by status |

---

## Client Dashboard (Organization Users)

For client portal users (**Organization Owner** and **Organization Member**), the dashboard shows data scoped to your organization only:

| Section | What It Shows |
|---------|--------------|
| **Projects** | Your projects with progress percentage, task counts, and milestone counts |
| **Task Stats** | Total tasks, to-do, in progress, in review, overdue, and due this week |
| **Invoices** | Recent invoices with status, total, and amount due. Summary of total billed, paid, and outstanding |
| **Active Services** | Services assigned to your organization with pricing details |
| **Upcoming** | Milestones and task deadlines in the next 7 days |
| **Recent Activity** | Activity feed scoped to your organization |

If your agency has configured a **welcome message** in portal branding, it appears as a banner at the top.

---

## Dashboard by Role

| Role | Dashboard Type | Key Content |
|------|---------------|-------------|
| Owner | Executive | Full agency overview — revenue, projects, team, alerts |
| Admin | Executive | Same as Owner |
| Project Manager | Executive | Same as Owner |
| Accountant | Executive | Same as Owner |
| Team Member | Executive | Same as Owner (filtered by permissions) |
| Organization Owner | Client | Org-scoped projects, tasks, invoices, services |
| Organization Member | Client | Same as Org Owner |

> **See also:** [Reports](./reports) for in-depth analytics · [Notifications](./notifications/overview) for alert notifications · [Getting Started](./getting-started) for first login · [Onboarding](./onboarding) for the setup checklist
