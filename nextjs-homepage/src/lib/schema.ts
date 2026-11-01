/**
 * Structured Data (Schema.org) JSON-LD generator for Eidoncore.
 * Fully compliant with Google Rich Results, Schema.org Validator,
 * and AI search engine discovery specifications.
 */

const BASE_URL = "https://eidoncore.com";

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: "Eidoncore",
    legalName: "Eidoncore Technologies Inc.",
    url: BASE_URL,
    logo: {
      "@type": "ImageObject",
      "@id": `${BASE_URL}/#logo`,
      url: `${BASE_URL}/images/apple-touch-icon.png`,
      caption: "Eidoncore Logo",
      width: 180,
      height: 180,
    },
    image: `${BASE_URL}/images/og-image.webp`,
    description:
      "All-in-one AI-native agency management platform connecting white-label client portals, project delivery, billing, CRM, and autonomous workflows.",
    foundingDate: "2024",
    sameAs: [
      "https://twitter.com/eidoncore",
      "https://github.com/eidoncore",
      "https://linkedin.com/company/eidoncore",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "support@eidoncore.com",
      url: `${BASE_URL}/contact/`,
      availableLanguage: ["en"],
    },
  };
}

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: `${BASE_URL}/`,
    name: "Eidoncore",
    description: "The Unified Operating System for Modern Agencies",
    publisher: {
      "@id": `${BASE_URL}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/docs/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function getSoftwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${BASE_URL}/#software`,
    name: "Eidoncore",
    operatingSystem: "All (Web-based Cloud SaaS)",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Agency Management Platform & Client Portal",
    url: BASE_URL,
    author: {
      "@id": `${BASE_URL}/#organization`,
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "29",
      highPrice: "199",
      offerCount: "3",
      offers: [
        {
          "@type": "Offer",
          name: "Starter",
          price: "29",
          priceCurrency: "USD",
          priceValidUntil: "2026-12-31",
          availability: "https://schema.org/InStock",
          url: `${BASE_URL}/pricing/`,
          description: "Essential agency management with up to 5 team members and 15 active projects.",
        },
        {
          "@type": "Offer",
          name: "Pro",
          price: "79",
          priceCurrency: "USD",
          priceValidUntil: "2026-12-31",
          availability: "https://schema.org/InStock",
          url: `${BASE_URL}/pricing/`,
          description: "Scale your agency with 25 team members, custom domain client portal, and full AI workspace.",
        },
        {
          "@type": "Offer",
          name: "Agency",
          price: "199",
          priceCurrency: "USD",
          priceValidUntil: "2026-12-31",
          availability: "https://schema.org/InStock",
          url: `${BASE_URL}/pricing/`,
          description: "Unlimited team members, enterprise SLA, custom integrations, and dedicated account support.",
        },
      ],
    },
    featureList: [
      "White-label client portal with custom domain CNAME and automated SSL",
      "Project management with milestone budgets and health score telemetry",
      "Kanban task boards with integrated billable time tracking",
      "Client relationship management (CRM) & communication timelines",
      "Recurring retainer billing, credit card processing via Stripe",
      "Interactive proposals with legal e-signatures",
      "Automated intake forms with auto-project kickoff",
      "AI Workspace with Model Context Protocol (MCP) tool orchestration",
    ],
  };
}

export function getBreadcrumbSchema(breadcrumbs: Array<{ label: string; href?: string }>) {
  if (!breadcrumbs || breadcrumbs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, idx) => {
      let itemUrl: string | undefined;
      if (crumb.href) {
        itemUrl = crumb.href.startsWith("http")
          ? crumb.href
          : `${BASE_URL}${crumb.href.startsWith("/") ? crumb.href : `/${crumb.href}`}`;
        // Ensure trailing slash for directory URLs (unless it has a file extension or anchor)
        if (!itemUrl.endsWith("/") && !itemUrl.includes("#") && !itemUrl.includes(".")) {
          itemUrl = `${itemUrl}/`;
        }
      }

      return {
        "@type": "ListItem",
        position: idx + 1,
        name: crumb.label,
        ...(itemUrl ? { item: itemUrl } : {}),
      };
    }),
  };
}

export function getFAQSchema(items: Array<{ q: string; a: string }>) {
  if (!items || items.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function getServiceSchema(name: string, description: string, path: string) {
  const url = `${BASE_URL}/${path.replace(/^\/|\/$/g, "")}/`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${name} — Eidoncore`,
    serviceType: name,
    provider: {
      "@id": `${BASE_URL}/#organization`,
    },
    url,
    description,
    areaServed: "Global",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Eidoncore Platform Plans",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: `${name} on Eidoncore`,
          },
        },
      ],
    },
  };
}

export function getPricingProductSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Eidoncore Agency Management Platform",
    image: `${BASE_URL}/images/og-image.webp`,
    description:
      "All-in-one agency operating system with white-label client portals, project tracking, invoices, CRM, and AI workspace.",
    brand: {
      "@type": "Brand",
      name: "Eidoncore",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "0",
      highPrice: "199",
      offerCount: "4",
      offers: [
        {
          "@type": "Offer",
          name: "Free Plan",
          price: "0",
          priceCurrency: "USD",
          priceValidUntil: "2026-12-31",
          availability: "https://schema.org/InStock",
          url: `${BASE_URL}/pricing/`,
          description: "Free permanent plan for freelancers and small teams getting started.",
        },
        {
          "@type": "Offer",
          name: "Starter Plan",
          price: "29",
          priceCurrency: "USD",
          priceValidUntil: "2026-12-31",
          availability: "https://schema.org/InStock",
          url: `${BASE_URL}/pricing/`,
        },
        {
          "@type": "Offer",
          name: "Pro Plan",
          price: "79",
          priceCurrency: "USD",
          priceValidUntil: "2026-12-31",
          availability: "https://schema.org/InStock",
          url: `${BASE_URL}/pricing/`,
        },
        {
          "@type": "Offer",
          name: "Agency Plan",
          price: "199",
          priceCurrency: "USD",
          priceValidUntil: "2026-12-31",
          availability: "https://schema.org/InStock",
          url: `${BASE_URL}/pricing/`,
        },
      ],
    },
  };
}

export function getBlogPostingSchema(article: {
  title: string;
  summary: string;
  date: string;
  href: string;
  author?: string;
}) {
  const articleUrl = article.href.startsWith("http")
    ? article.href
    : `${BASE_URL}${article.href.startsWith("/") ? article.href : `/${article.href}`}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.summary,
    url: articleUrl,
    datePublished: article.date,
    dateModified: article.date,
    publisher: {
      "@id": `${BASE_URL}/#organization`,
    },
    author: {
      "@type": "Organization",
      name: article.author || "Eidoncore Editorial Team",
      url: BASE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    image: `${BASE_URL}/images/og-image.webp`,
  };
}
