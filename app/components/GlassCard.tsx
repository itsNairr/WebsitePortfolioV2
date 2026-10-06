import type { ElementType, ReactNode } from "react";

// Liquid glass card (styles in globals.css) shared across pages.
// `interactive` adds the hover lift; turn it off for cards like forms.
export default function GlassCard({
  as: Tag = "div",
  className = "",
  interactive = true,
  children,
}: {
  as?: ElementType;
  className?: string;
  interactive?: boolean;
  children: ReactNode;
}) {
  return (
    <Tag
      className={`liquid-glass rounded-3xl ${
        interactive ? "liquid-glass-hover hover:-translate-y-0.5" : ""
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
