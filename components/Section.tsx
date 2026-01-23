"use client";

import { ReactNode, RefObject } from "react";
import { Container } from "./Container";
import clsx from "clsx";
import { useFadeInOnScroll } from "@/hooks/useFadeInOnScroll";

type SectionProps = {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  headingSize?: "sm" | "md" | "lg";
  eyebrow?: string;
};

const headingStyles = {
  sm: "text-2xl sm:text-3xl",
  md: "text-3xl sm:text-4xl",
  lg: "text-4xl sm:text-5xl",
};

export function Section({
  title,
  description,
  children,
  className,
  headingSize = "md",
  eyebrow,
}: SectionProps) {
  const { ref, visible } = useFadeInOnScroll();

  return (
    <section
      ref={ref as RefObject<HTMLElement>}
      className={clsx(
        "fade-section py-16 sm:py-24",
        visible && "is-visible",
        className
      )}
    >
      <Container>
        {(title || description) && (
          <div className="mb-10 flex flex-col gap-4 sm:mb-14">
            {eyebrow && (
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2
                className={clsx(
                  "font-display font-semibold leading-tight text-[var(--foreground)]",
                  headingStyles[headingSize]
                )}
              >
                {title}
              </h2>
            )}
            {description && (
              <p className="max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
