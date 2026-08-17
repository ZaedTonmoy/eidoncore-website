---
title: "Reports & Dashboards"
category: "Team & Workflow"
slug: "reports"
---

# Reports & Dashboards

Monitor your agency's performance with real-time dashboards and detailed reports across revenue, clients, projects, tasks, and time tracking.

> **See also:** [Dashboard](./dashboard) for full details on executive, team member, and client dashboards — including KPIs, alerts, and role-specific views

---

## Reports

Navigate to **Reports** in the sidebar to access detailed analytics.

### Overview KPIs

The overview tab provides a cross-cutting summary of all key metrics:

| KPI | Description |
|-----|-------------|
| **Total Revenue** | Sum of all payments received |
| **Total Invoiced** | Sum of all invoice totals |
| **Outstanding** | Unpaid amount across all active invoices |
| **Collection Rate** | Revenue collected as a percentage of total invoiced |
| **Active Projects** | Count of projects currently in progress |
| **Total Tasks** | Task count and completion rate |
| **Total Hours** | Logged hours with billable/non-billable split |
| **Utilization Rate** | Billable hours as a percentage of total hours |

---

### Revenue Report

| Metric | Description |
|--------|-------------|
| **Revenue Over Time** | Monthly/quarterly revenue trends |
| **Revenue by Client** | Which clients generate the most revenue |
| **Revenue by Service** | Which services are most profitable |
| **Outstanding vs. Collected** | Revenue collection efficiency |
| **Forecast** | Projected revenue for upcoming periods |
| **Payment Methods** | Breakdown by payment method (Manual, Stripe, Bank Transfer, etc.) |
| **Average Days to Payment** | Mean time from invoice issue to payment |
| **Average Days Late** | Mean time past due for late payers |

### Client Report

| Metric | Description |
|--------|-------------|
| **Total Clients** | Active client count |
| **Client Acquisition** | New clients over time |
| **Client Revenue Distribution** | Revenue breakdown by client |
| **Client Health Overview** | Health status across all clients |
| **Top Clients** | Highest revenue clients |

### Project Report

| Metric | Description |
|--------|-------------|
| **Active Projects** | Current project count by status |
| **Project Health** | Health distribution across all projects |
| **Completion Rate** | Percentage of projects completed on time |
| **Budget Utilization** | How projects are tracking against their budgets |
| **Projects by Client** | Project distribution across clients |

### Task Report

| Metric | Description |
|--------|-------------|
| **Task Completion** | Tasks completed over time |
| **Tasks by Status** | Distribution across statuses |
| **Overdue Tasks** | Count and age of overdue tasks |
| **Tasks by Assignee** | Workload per team member |
| **Average Completion Time** | How long tasks take to complete |

### Time Tracking Report

| Metric | Description |
|--------|-------------|
| **Hours Logged** | Total time logged over a period |
| **Billable vs. Non-Billable** | Ratio of billable to non-billable time |
| **Time by Project** | Where time is being spent |
| **Time by Team Member** | Individual contribution breakdown |
| **Utilization Rate** | Billable hours as a percentage of total hours |

### Date Range Filtering

All reports support date range filtering:
- Preset ranges: **7 days**, **30 days**, **90 days**, **12 months**, **All time** (default: 30 days)
- Period-over-period comparisons

Use period-over-period comparisons to quickly spot trends. For example, compare last 30 days vs. the previous 30 to see whether revenue is growing or shrinking.

---

## Client Reports (Organization Owner)

Organization Owners see a separate set of 3 report tabs, automatically scoped to their organization:

### Overview Tab

| Element | Type |
|---------|------|
| Active Projects | KPI — count of active projects |
| Task Completion | KPI — completion percentage |
| Overdue Tasks | KPI — count of overdue tasks |
| Avg Turnaround | KPI — average days from task creation to completion |
| Hours Invested | KPI — total hours logged by agency team |
| Outstanding | KPI — outstanding invoice amount |
| Total Spent | KPI — combined invoice payments + service purchases |
| Project Health | Donut chart — On Track, At Risk, Off Track |
| Task Status | Donut chart — Done, In Progress, To Do, In Review |

### Projects & Tasks Tab

| Element | Type |
|---------|------|
| Total / Active / Completed Projects | KPIs |
| Total Tasks / Completion Rate / In Progress | KPIs |
| Project Status | Donut chart — Not Started, In Progress, Completed |
| Task Priority | Donut chart — High, Medium, Low, Urgent |
| Task Completion Trend | Bar chart — monthly completed tasks |
| Project Health | Donut chart |
| Tasks by Agency Member | Table — member, total, done, in progress, overdue, completion % |

### Team Activity Tab

| Element | Type |
|---------|------|
| Team Members | KPI — count of agency members on your projects |
| Total Hours | KPI — hours logged by agency team |
| Avg Turnaround | KPI — average task completion time |
| Hours by Team Member | Bar chart |
| Task Priority Distribution | Donut chart |
| Agency Team Performance | Table — member, tasks, completed, in progress, overdue, completion % |

Organization Members do not have access to Reports. Only Organization Owners can view the report tabs scoped to their organization.

---

## Permissions

| Permission | What It Allows |
|-----------|---------------|
| **View Reports** | Access all report pages |
| **Export Reports** | Download reports as CSV or PDF |

Available to: Owner, Admin, Project Manager, and Accountant by default. Team Members have limited access.

> **See also:** [Invoicing](./invoicing/analytics#finance-analytics-dashboard) for the detailed finance dashboard · [Projects](./projects#project-health) for health scoring · [Clients](./clients/crm#client-health-scoring) for client health analytics
