"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <Container className="flex h-20 items-center justify-between">
        {/* Logo / Name */}
        <Link
          href="/"
          className="group flex items-center gap-3"
        >
          {/* Animated accent mark */}
          <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent)] transition-transform duration-300 group-hover:scale-110">
            <span className="font-display text-lg font-bold text-[var(--background)]">
              {siteConfig.name.charAt(0)}
            </span>
          </span>
          <span className="text-lg font-medium tracking-tight text-[var(--foreground)] transition-colors duration-200 group-hover:text-[var(--accent)]">
            {siteConfig.name}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 sm:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "relative px-4 py-2 text-sm font-medium transition-colors duration-200",
                  isActive
                    ? "text-[var(--accent)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--foreground)]"
                )}
              >
                {item.label}
                {/* Active indicator */}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-[var(--accent)]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className={clsx(
            "relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg border transition-all duration-200 sm:hidden",
            open
              ? "border-[var(--accent)] bg-[var(--accent)]/10"
              : "border-[var(--border)] hover:border-[var(--accent)]"
          )}
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span
            className={clsx(
              "h-0.5 w-5 rounded-full bg-current transition-all duration-300",
              open ? "translate-y-2 rotate-45 bg-[var(--accent)]" : "bg-[var(--foreground)]"
            )}
          />
          <span
            className={clsx(
              "h-0.5 w-5 rounded-full bg-current transition-all duration-300",
              open ? "opacity-0" : "bg-[var(--foreground)]"
            )}
          />
          <span
            className={clsx(
              "h-0.5 w-5 rounded-full bg-current transition-all duration-300",
              open ? "-translate-y-2 -rotate-45 bg-[var(--accent)]" : "bg-[var(--foreground)]"
            )}
          />
        </button>
      </Container>

      {/* Mobile Menu */}
      {open && (
        <div className="mobile-menu-animate absolute inset-x-0 top-full border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur-xl sm:hidden">
          <Container className="flex flex-col py-4">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    "flex items-center justify-between rounded-lg px-4 py-3 text-base font-medium transition-all duration-200",
                    isActive
                      ? "bg-[var(--accent)]/10 text-[var(--accent)]"
                      : "text-[var(--foreground)] hover:bg-[var(--muted)]"
                  )}
                  onClick={() => setOpen(false)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.label}
                  {isActive && (
                    <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                  )}
                </Link>
              );
            })}
          </Container>
        </div>
      )}
    </header>
  );
}
