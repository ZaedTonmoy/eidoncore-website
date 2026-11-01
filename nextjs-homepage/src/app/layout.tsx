import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import MotionProvider from "@/components/MotionProvider";
import JsonLd from "@/components/JsonLd";
import {
  getOrganizationSchema,
  getWebSiteSchema,
  getSoftwareApplicationSchema,
} from "@/lib/schema";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Eidoncore — AI-Powered Agency Management Platform",
  description:
    "The all-in-one system for client portals, projects, billing, CRM, and autonomous AI workflows — beautifully unified in a single platform.",
  metadataBase: new URL("https://eidoncore.com"),
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/images/favicon-32.png",
    apple: "/images/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Eidoncore — AI-Powered Agency Management Platform",
    description:
      "The all-in-one system for client portals, projects, billing, CRM, and autonomous AI workflows — beautifully unified in a single platform.",
    url: "https://eidoncore.com",
    siteName: "Eidoncore",
    images: [
      {
        url: "/images/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Eidoncore Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eidoncore — AI-Powered Agency Management Platform",
    description:
      "The all-in-one system for client portals, projects, billing, CRM, and autonomous AI workflows — beautifully unified in a single platform.",
    images: ["https://eidoncore.com/images/og-image.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <head>
        <JsonLd schema={getOrganizationSchema()} />
        <JsonLd schema={getWebSiteSchema()} />
        <JsonLd schema={getSoftwareApplicationSchema()} />
      </head>
      <body className="font-sans bg-white text-[#0B0B0F] antialiased selection:bg-[#3F72AF]/15 selection:text-[#0B0B0F] overflow-x-clip">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
