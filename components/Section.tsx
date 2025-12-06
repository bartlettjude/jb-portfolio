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
};

const headingStyles = {
  sm: "text-xl sm:text-2xl",
  md: "text-2xl sm:text-3xl",
  lg: "text-3xl sm:text-4xl",
};

export function Section({
  title,
  description,
  children,
  className,
  headingSize = "md",
}: SectionProps) {
  const { ref, visible } = useFadeInOnScroll();

  return (
    <section
      ref={ref as RefObject<HTMLElement>}
      className={clsx(
        "fade-section py-10 sm:py-14",
        visible && "is-visible",
        className,
      )}
    >
      <Container>
        {(title || description) && (
          <div className="mb-6 flex flex-col gap-2 sm:mb-8">
            {title && (
              <h2 className={clsx("font-semibold text-gray-900", headingStyles[headingSize])}>
                {title}
              </h2>
            )}
            {description && (
              <p className="max-w-3xl text-base text-gray-600">{description}</p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}

