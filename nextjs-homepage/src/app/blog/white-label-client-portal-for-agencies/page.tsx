import BlogArticleTemplate from "@/components/BlogArticleTemplate";

export default function WhiteLabelClientPortalPage() {
  return (
    <BlogArticleTemplate
      slug="white-label-client-portal-for-agencies"
      title="Why Every Agency Needs a White-Label Client Portal"
      description="Discover how a custom-domain white-label client portal centralizes deliverables, approvals, files, tickets, and invoices while keeping your agency brand front and center."
      tag="Client Portal"
      readTime="5 min read"
      displayDate="Nov 2026"
      isoDate="2026-11-24"
      keyTakeaway="A white-label client portal gives clients one branded destination on your own domain (e.g. portal.youragency.com) to check project progress, approve deliverables, download files, submit tickets, and pay invoices—replacing scattered email threads and third-party vendor branding."
      sections={[
        {
          heading: "The Hidden Cost of Scattered Client Communication",
          paragraphs: [
            "When client updates live across email threads, chat channels, shared drive folders, and standalone invoice links, clients naturally lose track of where to look. That friction turns into frequent status-check messages and delayed deliverable approvals.",
            "Sending clients to a portal branded with another software vendor's logo and domain also undermines the premium experience agencies work hard to build.",
          ],
        },
        {
          heading: "What Belongs Inside an Agency Client Portal",
          paragraphs: [
            "An effective client portal surfaces only what clients need to see—while keeping internal team discussions, drafts, and operational notes private.",
          ],
          bullets: [
            "Custom Domain & Branding: Point a CNAME like portal.youragency.com with automatic SSL, your agency logo, color palette, and custom SMTP emails.",
            "Deliverable & Milestone Visibility: Share approved milestones and progress without exposing internal-only tasks.",
            "Structured Support Tickets: Replace ad-hoc inbox requests with prioritized tickets and SLA response tracking.",
            "Self-Serve Billing & Service Ordering: Let clients view invoice history, pay via Stripe, or purchase productized service offerings.",
            "Centralized File Vault: Deliver brand kits, design files, and contracts with organized folders and access controls.",
          ],
        },
        {
          heading: "Connecting the Portal Directly to Internal Operations",
          paragraphs: [
            "The biggest mistake agencies make is bolting on a standalone portal that isn't connected to their internal task board or billing engine. In Eidoncore, the client portal reads directly from the same project, ticket, file, and invoice records your team works in—so updates appear in real time without duplicate data entry.",
          ],
        },
      ]}
      relatedLinks={[
        {
          label: "Explore Client Portal",
          href: "/portal/",
          description: "See how Eidoncore's white-label portal works for agency clients.",
        },
        {
          label: "White-Label & Custom Domains",
          href: "/white-label/",
          description: "Configure CNAME domains, custom logos, and SMTP email routing.",
        },
        {
          label: "Support Tickets & SLAs",
          href: "/tickets/",
          description: "Turn client requests into tracked tickets with SLA timers.",
        },
        {
          label: "Productized Services Catalog",
          href: "/services/",
          description: "Let clients browse and order standardized service packages online.",
        },
      ]}
      faqs={[
        {
          q: "Can I host Eidoncore's client portal on my own domain?",
          a: "Yes. You can map a custom CNAME domain such as portal.youragency.com with automatic SSL certificate provisioning and custom branding.",
        },
        {
          q: "Can clients see internal agency tasks or notes?",
          a: "No. Eidoncore separates internal-only tasks and team discussions from client-visible milestones, deliverables, and portal threads.",
        },
      ]}
    />
  );
}
