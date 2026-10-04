import type { Metadata } from "next";
import pages from "@/content/page-metadata.json";

// Keep search and social metadata aligned, including images: Next.js replaces
// nested openGraph objects rather than merging them with the root layout.
export function pageMetadata(route: keyof typeof pages): Metadata {
  const { title, description } = pages[route];
  const url = `https://eidoncore.com/${route}/`;
  const image = "https://eidoncore.com/images/og-image.webp";
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title, description, url,
      siteName: "Eidoncore",
      type: "website",
      locale: "en_US",
      images: [{ url: image, width: 1200, height: 630, alt: "Eidoncore Platform" }],
    },
    twitter: {
      card: "summary_large_image",
      title, description,
      images: [image],
    },
  };
}
