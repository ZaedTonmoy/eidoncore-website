import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Eidoncore — AI-Powered Agency Management Platform",
  description:
    "The all-in-one system for client portals, projects, billing, CRM, and autonomous AI workflows — beautifully unified in a single platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <body className="font-sans bg-white text-[#0B0B0F] antialiased selection:bg-[#3F72AF]/15 selection:text-[#0B0B0F]">
        {children}
      </body>
    </html>
  );
}
