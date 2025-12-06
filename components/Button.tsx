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
    "inline-flex items-center justify-center rounded-md px-4 py-2.5 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";
  const styles =
    variant === "primary"
      ? "bg-[var(--accent)] text-white shadow-sm hover:brightness-95 focus-visible:outline-[var(--accent)]"
      : "border border-[var(--border)] bg-white text-gray-900 hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline-[var(--accent)]";

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

