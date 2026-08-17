---
title: "AI Connector"
category: "Configuration"
slug: "ai-connector"
---

# AI Connector

Integrate AI-powered coding and productivity tools directly into your workspace. The AI Connector uses the Model Context Protocol (MCP) standard to let compatible AI assistants read and manage your projects, tasks, invoices, and more.

The AI Connector is available on **Pro** and **Enterprise** plans. See [Plans & Billing](./billing) for plan comparison.

---

## Compatible Tools

The AI Connector works with any MCP-compatible AI assistant, including:

| Tool | Type | Connection |
|------|------|------------|
| **Claude** (Anthropic) | AI assistant | Direct MCP integration |
| **Cursor** | AI code editor | Built-in MCP support |
| **Windsurf** | AI code editor | Built-in MCP support |

---

## Setting Up

Navigate to **Settings → Agency → Integrations → AI Connector**.

Toggle **AI Connector** to On. This activates the MCP server for your workspace.

Use your AI tool's MCP configuration to connect to your workspace URL. The tool will redirect you to authorize access.

Review the requested permissions on the consent page. You'll see which modules the AI can access based on your role, and approve the connection.

Once connected, your AI assistant can read and interact with your workspace data using natural language.

### OAuth Authorization

The AI Connector uses **OAuth 2.1 with PKCE** for secure authentication. When connecting:

1. Your AI tool redirects to your workspace's consent page
2. You review the requested permissions — the page shows which capabilities are available and which are restricted based on your role
3. You approve the connection
4. The AI tool receives secure, time-limited tokens

Tokens are automatically rotated for security. You can revoke access at any time from your settings.

---

## Available Modules

The AI Connector provides access to **19 modules** with over **111 tools** across your workspace:

| Module | Capabilities |
|--------|-------------|
| **Projects** | List, view, create, and update projects |
| **Tasks** | Create tasks, update statuses, assign members, track time |
| **Automations** | View and manage automation workflows |
| **Templates** | Access project and service templates |

| Module | Capabilities |
|--------|-------------|
| **Invoices** | View and create invoices, record payments |
| **Recurring** | View and manage recurring invoices |
| **Proposals** | View, create, and manage proposals |
| **Services** | View service catalog and manage offerings |

| Module | Capabilities |
|--------|-------------|
| **Clients** | View and manage client organizations |
| **Team** | View team members and roles |
| **Messaging** | View and send messages in channels |
| **Tickets** | View, create, update, and resolve support tickets |
| **Notifications** | View and manage notifications |

| Module | Capabilities |
|--------|-------------|
| **Dashboard** | View workspace stats and activity overview |
| **Reports** | Access analytics and generate reports |
| **Client Reports** | Generate and view client summary reports |
| **Files** | List and manage workspace files |
| **Search** | Search across all workspace data |

Write access to modules depends on your plan configuration. Some modules may be read-only on certain plans. Enterprise plans have full write access to all modules.

---

## Managing Modules

Agency Owners and Admins can control which modules are available to AI assistants:

1. Go to **Settings → Agency → Integrations → AI Connector**
2. Scroll to **Exposed Modules**
3. Toggle individual modules on or off

When a module is disabled, AI assistants cannot read or write data in that module — even if the user has the necessary permissions.

---

## Role Eligibility

Control which team roles can use the AI Connector:

1. Go to **Settings → Agency → Integrations → AI Connector**
2. Configure **Eligible Roles**
3. Only users with eligible roles can authorize AI connections

If a user with an ineligible role tries to connect, they'll see a dedicated error page directing them to contact their admin.

---

## Rate Limiting

AI tool calls are rate-limited per workspace to prevent abuse:

| Setting | Default | Range |
|---------|---------|-------|
| **Rate Limit** | 100 calls/minute | Configurable by admin |

If the rate limit is exceeded, the AI tool receives a temporary error and can retry after a brief delay.

---

## Workspace Instructions

Provide custom instructions that AI assistants will follow when interacting with your workspace:

1. Go to **Settings → Agency → Integrations → AI Connector**
2. Enter text in the **AI Instructions** field
3. These instructions are included in every AI session

Use workspace instructions to set naming conventions, task formatting rules, preferred workflows, or any workspace-specific guidance. For example: "Always prefix task names with the project code" or "Use ISO date format in descriptions".

---

## Active Sessions

View and manage active AI connections under **Settings → Agency → Integrations → AI Connector → Active Sessions**:

- See which users have active AI connections
- View when each session was created
- Revoke individual sessions at any time

---

## Security

The AI Connector is built with enterprise-grade security:

- **OAuth 2.1 with PKCE** — Industry-standard authorization with proof key for code exchange
- **Token rotation** — Refresh tokens are single-use; old tokens are automatically revoked
- **Audit logging** — Every AI tool call is logged with the user, action, and timestamp
- **Tenant isolation** — AI assistants can only access data within your workspace
- **Live permission checks** — Permissions are verified on every request, ensuring instant revocation
- **Scope enforcement** — AI tools can only access the modules and actions you've approved

---

## Related

Workspace-wide security features, 2FA, and session management.

Configure team roles and control access levels.

Compare plan features and manage your subscription.
