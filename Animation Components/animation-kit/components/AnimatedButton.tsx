"use client";

// AnimatedButton.tsx
// A button with a smooth, minimal hover effect:
// - slight lift + scale
// - soft shadow grows
// - a color "sweep" fills in behind the text from left to right
// No extra library needed beyond Tailwind (pure CSS transitions).

type AnimatedButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
};

export default function AnimatedButton({
  children,
  onClick,
  href,
  className = "",
}: AnimatedButtonProps) {
  const baseClasses = `
    group relative inline-flex items-center justify-center
    overflow-hidden rounded-full px-7 py-3
    font-medium text-white
    bg-neutral-900
    transition-all duration-300 ease-out
    hover:-translate-y-0.5 hover:scale-[1.03]
    hover:shadow-lg hover:shadow-black/20
    ${className}
  `;

  const content = (
    <>
      {/* sweep layer: hidden circle that grows on hover */}
      <span
        className="
          absolute inset-0 -z-0 scale-0 rounded-full bg-neutral-700
          transition-transform duration-500 ease-out
          group-hover:scale-150
        "
      />
      <span className="relative z-10">{children}</span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={baseClasses}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={baseClasses}>
      {content}
    </button>
  );
}
