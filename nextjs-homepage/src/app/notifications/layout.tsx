import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata("notifications");

export default function PageLayout({ children }: { children: ReactNode }) {
  return children;
}
