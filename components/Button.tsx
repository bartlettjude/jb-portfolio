import Link from "next/link";
import clsx from "clsx";
import { ComponentProps } from "react";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
} & Omit<ComponentProps<typeof Link>, "href">;

export function Button({
  href,
  children,
  variant = "primary",
  external = false,
  className,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-md px-4 py-2.5 text-sm font-medium transition-all duration-200 ease-out focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--card)] hover:scale-[1.02] hover:shadow-md active:scale-[0.98]";
  const styles =
    variant === "primary"
      ? "bg-[var(--accent)] text-white shadow-sm hover:brightness-95"
      : "border border-[var(--border)] bg-white text-gray-900 hover:border-[var(--accent)] hover:text-[var(--accent)]";

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

