import { ReactNode } from "react";
import { Container } from "./Container";
import clsx from "clsx";

type PageShellProps = {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export function PageShell({ title, description, children, className }: PageShellProps) {
  return (
    <main className={clsx("flex-1 py-12 sm:py-16", className)}>
      <Container>
        {(title || description) && (
          <header className="mb-8 flex flex-col gap-3 sm:mb-10">
            {title && (
              <h1 className="text-3xl font-semibold leading-tight text-gray-900 sm:text-4xl">
                {title}
              </h1>
            )}
            {description && <p className="max-w-3xl text-lg text-gray-600">{description}</p>}
          </header>
        )}
        {children}
      </Container>
    </main>
  );
}

