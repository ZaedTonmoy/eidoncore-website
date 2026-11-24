import BlogArticleTemplate from "@/components/BlogArticleTemplate";

export default function McpAiWorkflowsPage() {
  return (
    <BlogArticleTemplate
      slug="mcp-ai-workflows-for-digital-agencies"
      title="How Agencies Use MCP AI Workflows to Automate Operations"
      description="Learn how the Model Context Protocol (MCP) connects AI assistants like Claude and Cursor directly to agency projects, tasks, CRM records, and tickets with role-based permissions."
      tag="AI Workspace"
      readTime="5 min read"
      displayDate="Nov 2026"
      isoDate="2026-11-24"
      keyTakeaway="Model Context Protocol (MCP) lets AI assistants like Claude, Cursor, and Windsurf interact securely with live agency data—inspecting project status, breaking down tasks, summarizing tickets, and drafting proposals under strict role-based permissions."
      sections={[
        {
          heading: "Why Generic AI Chatbots Fall Short for Agency Operations",
          paragraphs: [
            "Copying and pasting project notes into a standalone AI chat window is slow and error-prone. Without direct context on your active projects, client timelines, and team workload, generic AI prompts only produce generic advice.",
            "Agencies need AI that can safely read real operational context and execute structured actions inside their workspace without bypassing permission boundaries.",
          ],
        },
        {
          heading: "What Model Context Protocol (MCP) Changes",
          paragraphs: [
            "Model Context Protocol (MCP) is an open standard that allows AI tools—such as Claude Desktop, Cursor, Windsurf, and custom agents—to call structured tools exposed by your software platform.",
            "Eidoncore's AI Workspace includes a native MCP server with 111+ tool calls spanning projects, tasks, CRM, invoicing, proposals, and support tickets.",
          ],
          bullets: [
            "Project & Task Orchestration: Inspect active milestones, check overdue tasks, and generate structured task breakdowns from client scopes.",
            "Ticket & Client Summarization: Summarize open support threads and recent client activity before weekly status calls.",
            "Proposal & Operations Assistance: Draft proposals and scope items grounded in your agency's service catalog.",
            "Role-Based Token Security: Every MCP connection respects workspace roles and tenant isolation so assistants cannot exceed assigned permissions.",
          ],
        },
        {
          heading: "Combining Deterministic Automations with AI Agents",
          paragraphs: [
            "AI works best alongside deterministic trigger-and-action rules. Use Eidoncore Automations for predictable workflows—like spinning up a project when a proposal is signed or an invoice is paid—and use the MCP AI Workspace for reasoning, summarization, and planning.",
          ],
        },
      ]}
      relatedLinks={[
        {
          label: "AI Workspace & MCP",
          href: "/ai-workspace/",
          description: "Explore Eidoncore's native MCP server and supported AI assistants.",
        },
        {
          label: "Workflow Automations",
          href: "/automations/",
          description: "Build trigger-and-action rules across invoices, projects, and tickets.",
        },
        {
          label: "Developer API & Docs",
          href: "/developers/",
          description: "Review REST APIs, webhook events, and MCP integration details.",
        },
        {
          label: "Security & Tenant Isolation",
          href: "/security/",
          description: "Learn how AES-256 encryption and row-level isolation protect agency data.",
        },
      ]}
      faqs={[
        {
          q: "Which AI tools work with Eidoncore's AI Workspace?",
          a: "Eidoncore's MCP server connects with MCP-compatible assistants including Claude, Cursor, Windsurf, and custom agentic workflows.",
        },
        {
          q: "Are AI actions restricted by team permissions?",
          a: "Yes. MCP connections inherit role-based access controls and multi-tenant isolation so AI assistants only access authorized workspace data.",
        },
      ]}
    />
  );
}
