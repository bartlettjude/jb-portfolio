import clsx from "clsx";

type TagProps = {
  label: string;
  variant?: "default" | "muted" | "accent";
};

export function Tag({ label, variant = "default" }: TagProps) {
  const variants = {
    default: "bg-[var(--muted)] text-[var(--foreground)] border-[var(--border)]",
    muted: "bg-[var(--muted)]/50 text-[var(--text-secondary)] border-[var(--border)]/50",
    accent: "bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/30",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium transition-colors duration-200",
        variants[variant]
      )}
    >
      {label}
    </span>
  );
}
