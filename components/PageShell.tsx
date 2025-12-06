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
};

export function PageShell({
  title,
  description,
  children,
  className,
  titleClassName,
  animateTitle = false,
}: PageShellProps) {
  const { ref, visible } = useFadeInOnScroll();

  return (
    <main className={clsx("flex-1 py-12 sm:py-16", className)}>
      <Container>
        <div
          ref={ref as RefObject<HTMLDivElement>}
          className={clsx("fade-section", visible && "is-visible")}
        >
          {(title || description) && (
            <header className="mb-8 flex flex-col gap-3 sm:mb-10">
              {title && (
                <h1
                  className={clsx(
                    "text-3xl font-semibold leading-tight text-gray-900 sm:text-4xl",
                    animateTitle && "heading-underline",
                    titleClassName,
                  )}
                >
                  {title}
                </h1>
              )}
              {description && <p className="max-w-3xl text-lg text-gray-600">{description}</p>}
            </header>
          )}
          {children}
        </div>
      </Container>
    </main>
  );
}

