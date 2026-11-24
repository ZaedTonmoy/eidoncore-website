import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata("blog/mcp-ai-workflows-for-digital-agencies");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
