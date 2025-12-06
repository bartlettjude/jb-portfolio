import clsx from "clsx";

type TagProps = {
  label: string;
  variant?: "accent" | "muted";
  className?: string;
};

export function Tag({ label, variant = "muted", className }: TagProps) {
  const base =
    "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-all duration-200 ease-out hover:scale-[1.03] hover:shadow-sm";
  const styles =
    variant === "accent"
      ? "bg-[color-mix(in_srgb,var(--accent)_12%,white)] text-[var(--accent)]"
      : "bg-[var(--muted)] text-gray-700 hover:bg-[color-mix(in_srgb,var(--accent)_8%,#e5e7eb)]";

  return <span className={clsx(base, styles, className)}>{label}</span>;
}

