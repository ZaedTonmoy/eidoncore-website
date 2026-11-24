import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata("blog/how-to-scale-a-digital-agency-without-tool-sprawl");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
