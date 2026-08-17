---
title: "Team Management"
category: "Team & Workflow"
slug: "team"
---

# Team Management

Invite colleagues to your agency workspace, assign roles with specific permissions, and monitor your team's workload.

---

## Inviting Team Members

### How to Invite

Navigate to **Team** in the sidebar and click **"Invite Member"**.

Enter the team member's **email address** and **name**

Choose a **role** (Owner, Admin, Project Manager, Accountant, or Team Member — or a custom role)

Click **Send Invite** — the invited user receives a branded email with a link to set their password and join your workspace

> If the invited user already has an account with another workspace, they can log in with their existing password.

### Member Details

When inviting or editing a team member, you can optionally set:

| Field | Purpose |
|-------|---------|
| **Department** | Categorize by team (e.g., Design, Engineering, Marketing) |
| **Employment Type** | Full-time, Contractor, or Intern |

These are displayed on member profiles and can be used for filtering on the team page.

### Invite Management

- **Resend** invites to pending members
- **Cancel** pending invites
- Pending members can be filtered and tracked on the Team page
- Agency owners are notified when an invite is sent

---

## Built-In Roles

| Role | Best For | Access Level |
|------|----------|-------------|
| **Owner** | Agency founder / principal | Full access to everything including billing, plans, and team management |
| **Admin** | Operations managers | Full operational access — settings, branding, team, projects, invoices |
| **Project Manager** | Client-facing project leads | Manages projects, tasks, team assignments, client organizations |
| **Accountant** | Finance team | Manages invoices, payments, billing, financial reports |
| **Team Member** | Individual contributors | Works on assigned tasks, logs time, manages their own work |

### Role Comparison

| Capability | Owner | Admin | PM | Accountant | Team Member |
|-----------|:-----:|:-----:|:--:|:----------:|:-----------:|
| View Dashboard (Executive) | ✓ | ✓ | ✓ | ✓ | ✓ |
| Manage Projects | ✓ | ✓ | ✓ | ✗ | ✗ |
| Manage Tasks | ✓ | ✓ | ✓ | ✗ | Own only |
| View/Create Invoices | ✓ | ✓ | ✓ | ✓ | Create only |
| Manage Billing & Plans | ✓ | ✗ | ✗ | ✗ | ✗ |
| Manage Team | ✓ | ✓ | ✓ | ✗ | ✗ |
| Manage Settings | ✓ | ✓ | Partial | ✗ | ✗ |
| Manage Branding | ✓ | ✓ | ✗ | ✗ | ✗ |
| Manage Roles & Permissions | ✓ | ✓ | ✗ | ✗ | ✗ |
| View Reports | ✓ | ✓ | ✓ | ✓ | ✗ |
| Manage Automations | ✓ | ✓ | ✗ | ✗ | ✗ |
| Manage Services | ✓ | ✓ | ✓ | ✗ | ✗ |
| View Clients | ✓ | ✓ | ✓ | ✓ | ✗ |
| Messaging | ✓ | ✓ | ✓ | ✓ | ✓ |

---

## Custom Roles

Create custom roles tailored to your agency's needs:

1. Go to **Settings → Agency → Roles & Permissions**
2. Click **"Create Role"**
3. Name the role and toggle individual permissions on/off

### Available Permissions

Permissions are organized by feature area:

| Area | Permissions |
|------|------------|
| **Projects** | View, Create, Edit, Delete, Archive, Manage Members, Manage Docs |
| **Tasks** | View, Create, Edit, Delete, Manage Labels |

| Area | Permissions |
|------|------------|
| **Invoices** | View, Create, Edit, Send, Void, Delete, Record Payment, Bad Debt, Refund |

| Area | Permissions |
|------|------------|
| **Team** | View, Manage |
| **Clients** | View, Create, Edit, Delete |
| **Messaging** | View, Send, Delete Any, Manage Channels, Browse All Channels |

| Area | Permissions |
|------|------------|
| **Services** | View, Create, Edit, Delete, Manage Access, Manage Templates |
| **Automations** | View, Create, Edit, Delete |

| Area | Permissions |
|------|------------|
| **Reports** | View, Export |
| **Settings** | Manage Organization Settings, Manage Branding, Manage Roles, Manage Domains, Manage Plan |
| **Files** | Upload, Delete, Manage |
| **Time Tracking** | Log Time, Manage All Entries |

Custom roles cannot be deleted if any team members are currently assigned to them.

The Comments permission includes a special **View Internal** sub-permission. Roles with this enabled can see internal comments on projects, tasks, clients, and invoices. Client roles (Organization Owner/Member) never have this permission.

---

## Managing Members

### Changing Roles

Administrators can change a member's role at any time. The affected user receives a notification showing their old and new role.

### Removing Members

Remove team members who no longer need access:

- The removed member and all agency owners are notified
- Agency owners cannot be removed — they must transfer ownership first

### Account Deletion

Team members can request their own account deletion:

- A **7-day grace period** applies before the account is actually deleted
- Agency owners must transfer ownership before deleting their account

---

## Workload Dashboard

The workload view gives managers visibility into how tasks are distributed:

- See each team member's active task count and status breakdown (To Do, In Progress, In Review)
- **Capacity status** is automatically calculated:

| Capacity | Condition |
|---------|-----------|
| **Normal** | Manageable task load |
| **High** | Approaching capacity |
| **Overloaded** | 10 or more active tasks — flagged with a visual indicator |

- View completion rate percentages per team member
- Track overdue tasks per member
- See estimated vs. logged hours per member
- Filter by project, status, and date range

### Member Profiles

Click on any team member to see their detailed profile:

| Section | What It Shows |
|---------|--------------|
| **Identity** | Name, email, avatar, role, department, employment type |
| **Status** | Active, Invited, or Suspended — with join date and last active |
| **Work Metrics** | Total tasks assigned, completed, overdue, and completion rate |
| **Billable Hours** | Total time logged across all projects |
| **Active Projects** | Projects where the member is currently assigned |
| **Recent Activity** | Last 20 actions taken by this member |

If a user belongs to multiple workspaces, they can set a different display name and avatar for each. This ensures data isolation between workspaces — e.g., a freelancer working with two agencies sees a separate identity in each.

### Member Status Lifecycle

| Status | Meaning |
|--------|---------|
| **Invited** | Invite sent, waiting for the member to log in |
| **Active** | Member has logged in and is actively working |
| **Suspended** | Temporarily deactivated — can be re-activated |

> Suspended members cannot log in but their data (tasks, time entries, etc.) is preserved.

---

## Notifications

| Event | Who Gets Notified |
|-------|------------------|
| Team member invited | All agency owners |
| Invite accepted (welcome) | Newly joined member |
| Invite reminder resent | Invited user |
| Role changed | Affected user |
| Member removed | Removed user + agency owners |

> **See also:** [Settings](./settings/overview) for notification preferences · [Projects](./projects#project-team-members) for project-level team management
