import Link from "next/link";
import clsx from "clsx";
import { ComponentProps } from "react";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  size?: "sm" | "md" | "lg";
  external?: boolean;
} & Omit<ComponentProps<typeof Link>, "href">;

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  external = false,
  className,
  ...props
}: ButtonProps) {
  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const base = clsx(
    "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-300",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
    sizeStyles[size]
  );

  const styles =
    variant === "primary"
      ? "btn-primary bg-[var(--accent)] text-[var(--background)] font-semibold"
      : "btn-ghost border border-[var(--border)] text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)]";

  return (
    <Link
      href={href}
      className={clsx(base, styles, className)}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      {...props}
    >
      {children}
    </Link>
  );
}
