import type { Metadata } from "next";
import type { ReactNode } from "react";

// Internal design-review page: keep it out of search results.
export const metadata: Metadata = {
  title: "Logo concepts — Eidoncore",
  robots: { index: false, follow: false },
};

export default function LogoPreviewLayout({ children }: { children: ReactNode }) {
  return children;
}
