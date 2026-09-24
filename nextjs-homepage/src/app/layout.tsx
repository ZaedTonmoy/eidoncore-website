import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  themeColor: "#f6f8fb",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Eidoncore — AI-Powered Agency Management Platform",
  description:
    "The all-in-one system for client portals, projects, billing, CRM, and autonomous AI workflows — beautifully unified in a single platform.",
  metadataBase: new URL("https://eidoncore.com"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/images/favicon-32.png",
    apple: "/images/apple-touch-icon.png",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <body className="font-sans bg-white text-[#0B0B0F] antialiased selection:bg-[#3F72AF]/15 selection:text-[#0B0B0F] overflow-x-clip">
        {children}
      </body>
    </html>
  );
}
