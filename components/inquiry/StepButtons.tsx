"use client";

import { ReactNode } from "react";
import clsx from "clsx";

type StepButtonsProps = {
  onBack?: () => void;
  onNext?: () => void;
  onSubmit?: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  disableNext?: boolean;
  disableSubmit?: boolean;
  submitting?: boolean;
  children?: ReactNode;
};

export function StepButtons({
  onBack,
  onNext,
  onSubmit,
  isFirstStep,
  isLastStep,
  disableNext,
  disableSubmit,
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
          "inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--border)] px-5 py-2.5 text-sm font-medium text-[var(--foreground)] transition-all duration-200",
          isFirstStep || submitting
            ? "cursor-not-allowed opacity-40"
            : "hover:border-[var(--accent)] hover:text-[var(--accent)] hover:bg-[var(--accent)]/5"
        )}
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <div className="flex items-center gap-3">
        {children}
        {isLastStep ? (
          <button
            type="button"
            onClick={onSubmit}
            disabled={disableSubmit || submitting}
            className={clsx(
              "btn-primary inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-6 py-2.5 text-sm font-semibold text-[var(--background)] transition-all duration-300",
              disableSubmit || submitting ? "opacity-50 cursor-not-allowed" : ""
            )}
          >
            {submitting ? (
              <>
                <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Sending...
              </>
            ) : (
              <>
                Submit
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </>
            )}
          </button>
        ) : (
          <button
            type="button"
            onClick={onNext}
            disabled={disableNext || submitting}
            className={clsx(
              "btn-primary inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-6 py-2.5 text-sm font-semibold text-[var(--background)] transition-all duration-300",
              disableNext || submitting ? "opacity-50 cursor-not-allowed" : ""
            )}
          >
            Next
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
