"use client";

// BlendMockupCard.tsx
// Wraps a dashboard/mockup UI so its edges fade smoothly into the page
// background instead of showing a hard card border/edge.
// Works for light OR dark themes — it just fades to transparent, so
// whatever background color sits behind it "shows through" naturally.

type BlendMockupCardProps = {
  children: React.ReactNode;
  className?: string; // set background color, padding, rounded corners here
};

export default function BlendMockupCard({
  children,
  className = "",
}: BlendMockupCardProps) {
  return (
    <div
      className={`relative ${className}`}
      style={{
        // Center of the card stays fully visible.
        // Toward the edges it fades to transparent (both -webkit and
        // standard versions needed for browser support).
        WebkitMaskImage:
          "radial-gradient(ellipse 85% 80% at 50% 45%, black 45%, transparent 92%)",
        maskImage:
          "radial-gradient(ellipse 85% 80% at 50% 45%, black 45%, transparent 92%)",
      }}
    >
      {children}
    </div>
  );
}
