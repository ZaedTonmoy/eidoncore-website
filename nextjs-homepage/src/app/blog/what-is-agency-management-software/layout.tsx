import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata("blog/what-is-agency-management-software");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
