"use client";

import { ReactNode } from "react";
import clsx from "clsx";

type StepButtonsProps = {
  onBack?: () => void;
  onNext?: () => void;
  onSubmit?: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  submitting?: boolean;
  children?: ReactNode;
};

export function StepButtons({
  onBack,
  onNext,
  onSubmit,
  isFirstStep,
  isLastStep,
  submitting,
  children,
}: StepButtonsProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <button
        type="button"
        onClick={onBack}
        disabled={isFirstStep || submitting}
        className={clsx(
          "inline-flex items-center justify-center rounded-md border border-[var(--border)] px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 ease-out",
          isFirstStep || submitting
            ? "cursor-not-allowed opacity-50"
            : "hover:border-[var(--accent)] hover:text-[var(--accent)]",
        )}
      >
        Back
      </button>

      <div className="flex items-center gap-3">
        {children}
        {isLastStep ? (
          <button
            type="button"
            onClick={onSubmit}
            disabled={submitting}
            className={clsx(
              "inline-flex items-center justify-center rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white transition-all duration-200 ease-out",
              submitting ? "opacity-60 cursor-not-allowed" : "hover:brightness-95",
            )}
          >
            {submitting ? "Sending..." : "Submit"}
          </button>
        ) : (
          <button
            type="button"
            onClick={onNext}
            disabled={submitting}
            className={clsx(
              "inline-flex items-center justify-center rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white transition-all duration-200 ease-out",
              submitting ? "opacity-60 cursor-not-allowed" : "hover:brightness-95",
            )}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

