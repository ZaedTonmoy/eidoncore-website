import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata("blog/automated-agency-onboarding-workflows");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
