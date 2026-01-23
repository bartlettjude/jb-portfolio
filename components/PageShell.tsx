"use client";

import { ReactNode, RefObject } from "react";
import { Container } from "./Container";
import clsx from "clsx";
import { useFadeInOnScroll } from "@/hooks/useFadeInOnScroll";

type PageShellProps = {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  titleClassName?: string;
  animateTitle?: boolean;
  eyebrow?: string;
};

export function PageShell({
  title,
  description,
  children,
  className,
  titleClassName,
  animateTitle = false,
  eyebrow,
}: PageShellProps) {
  const { ref, visible } = useFadeInOnScroll();

  return (
    <div className={clsx("flex-1 py-16 sm:py-24", className)}>
      <Container>
        <div
          ref={ref as RefObject<HTMLDivElement>}
          className={clsx("fade-section", visible && "is-visible")}
        >
          {(title || description) && (
            <header className="mb-12 flex flex-col gap-4 sm:mb-16">
              {eyebrow && (
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">
                  {eyebrow}
                </p>
              )}
              {title && (
                <h1
                  className={clsx(
                    "font-display text-4xl font-semibold leading-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl",
                    animateTitle && "heading-underline",
                    visible && animateTitle && "is-visible",
                    titleClassName
                  )}
                >
                  {title}
                </h1>
              )}
              {description && (
                <p className="max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)]">
                  {description}
                </p>
              )}
            </header>
          )}
          {children}
        </div>
      </Container>
    </div>
  );
}
