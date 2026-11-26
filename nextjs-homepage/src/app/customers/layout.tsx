import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = {
  ...pageMetadata("customers"),
  robots: { index: false, follow: false },
};

export default function PageLayout({ children }: { children: ReactNode }) {
  return children;
}
