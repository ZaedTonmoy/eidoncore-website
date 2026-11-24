import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata("blog/white-label-client-portal-for-agencies");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
