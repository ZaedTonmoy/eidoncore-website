import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata("compare/scoro");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
