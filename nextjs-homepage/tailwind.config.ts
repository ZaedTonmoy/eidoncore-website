import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        page: "#FFFFFF",
        card: "#FAFAFA",
        border: "#E7E7EA",
        "text-main": "#0B0B0F",
        "text-muted": "#6B6F76",
        accent: "var(--accent, #5B5FEF)",
        highlight: "var(--highlight, #E6F23A)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.03em",
      },
    },
  },
  plugins: [],
} satisfies Config;
