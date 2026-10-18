import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Page not found — Eidoncore",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white text-[#0B0B0F] flex flex-col">
      <Navbar />
      <main id="main-content" className="flex-1 flex items-center justify-center px-4 sm:px-6 py-24">
        <div className="max-w-md text-center">
          <p className="font-mono text-xs font-semibold tracking-wider uppercase text-[#3F72AF]">Error 404</p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A]">
            This page doesn&apos;t exist
          </h1>
          <p className="mt-3 text-base text-[#64748B] leading-relaxed">
            The link may be broken or the page may have moved. Try one of these instead.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center h-11 px-6 rounded-full bg-[#0B0B0F] text-white text-sm font-medium hover:bg-neutral-800 transition-colors w-full sm:w-auto"
            >
              Back to home
            </Link>
            <Link
              href="/features/"
              className="inline-flex items-center justify-center h-11 px-6 rounded-full border border-[#E7E7EA] text-sm font-medium hover:border-[#0B0B0F]/30 transition-colors w-full sm:w-auto"
            >
              Explore features
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
