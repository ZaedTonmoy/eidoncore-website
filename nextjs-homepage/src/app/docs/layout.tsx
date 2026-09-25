import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eidoncore Docs — Help Center & Documentation",
  description:
    "Comprehensive guides for every Eidoncore feature — from workspace setup to AI workflows, automations, billing, and developer tools.",
  alternates: {
    canonical: "/docs/",
  },
  openGraph: {
    title: "Documentation — Eidoncore Help Center",
    description:
      "Comprehensive guides for every Eidoncore feature — from workspace setup to AI workflows, automations, billing, and developer tools.",
    url: "https://eidoncore.com/docs/",
  },
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
