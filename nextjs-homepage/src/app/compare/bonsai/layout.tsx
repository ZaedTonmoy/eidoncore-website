import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata("compare/bonsai");

export default function PageLayout({ children }: { children: ReactNode }) {
  return children;
}
