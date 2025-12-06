"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";
import { siteConfig } from "@/data/siteConfig";
import { Container } from "./Container";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--card)]/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="text-base font-semibold text-gray-900">
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-gray-700 sm:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "transition hover:text-[var(--accent)]",
                  isActive && "text-[var(--accent)]",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-[var(--border)] p-2 text-gray-700 transition hover:border-[var(--accent)] hover:text-[var(--accent)] sm:hidden"
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className="sr-only">Toggle navigation</span>
          <div className="flex flex-col gap-1">
            <span className="h-0.5 w-5 bg-current" />
            <span className="h-0.5 w-5 bg-current" />
            <span className="h-0.5 w-5 bg-current" />
          </div>
        </button>
      </Container>

      {open && (
        <div className="border-t border-[var(--border)] bg-[var(--card)] sm:hidden">
          <Container className="flex flex-col gap-2 py-3 text-sm font-medium text-gray-700">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    "rounded-md px-2 py-2 transition hover:bg-[color-mix(in_srgb,var(--accent)_8%,white)]",
                    isActive && "text-[var(--accent)]",
                  )}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </Container>
        </div>
      )}
    </header>
  );
}

