import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata("compare/teamwork");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
