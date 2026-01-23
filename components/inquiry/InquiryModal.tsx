"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import { StepButtons } from "./StepButtons";

export type ContactFormData = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  buildRequest: string;
  details?: string;
};

const initialData: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  company: "",
  buildRequest: "",
  details: "",
};

type InquiryModalProps = {
  open: boolean;
  onClose: () => void;
};

type FieldErrors = Partial<Record<keyof ContactFormData, string>>;

export function InquiryModal({ open, onClose }: InquiryModalProps) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<ContactFormData>(initialData);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const steps = ["Contact", "Project", "Details", "Review"];
  const isLastStep = step === steps.length - 1;

  const validateStep = (currentStep: number, data: ContactFormData): FieldErrors => {
    const newErrors: FieldErrors = {};
    if (currentStep === 0) {
      if (!data.name || data.name.trim().length < 2) {
        newErrors.name = "Name must be at least 2 characters.";
      }
      if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        newErrors.email = "Enter a valid email.";
      }
    }
    if (currentStep === 1) {
      if (!data.buildRequest || data.buildRequest.trim().length < 3) {
        newErrors.buildRequest = "Please describe what you want to build.";
      }
    }
    return newErrors;
  };

  const progress = useMemo(() => ((step + 1) / steps.length) * 100, [step, steps.length]);

  const stepErrors = useMemo(() => validateStep(step, formData), [step, formData]);
  const submitErrors = useMemo(() => {
    return { ...validateStep(0, formData), ...validateStep(1, formData) };
  }, [formData]);

  const reset = () => {
    setFormData(initialData);
    setErrors({});
    setStep(0);
    setSubmitted(false);
    setSubmitError(null);
    setSubmitting(false);
  };

  const closeAndReset = () => {
    reset();
    onClose();
  };

  const handleNext = () => {
    const newErrors = validateStep(step, formData);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setStep((s) => Math.min(s + 1, steps.length - 1));
    }
  };

  const handleBack = () => {
    setErrors({});
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = async () => {
    const newErrors = validateStep(step, formData);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (!res.ok || !json?.success) {
        throw new Error(json?.message || "Unable to send inquiry right now.");
      }
      setSubmitted(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      setSubmitError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyles = clsx(
    "w-full rounded-lg border border-[var(--border)] bg-[var(--muted)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition-all duration-200",
    "placeholder:text-[var(--text-secondary)]/60",
    "focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
  );

  const renderStep = () => {
    if (submitted) {
      return (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
            <svg className="h-8 w-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="mb-2 font-display text-2xl font-semibold text-[var(--foreground)]">
            Thank you!
          </h3>
          <p className="mb-8 text-[var(--text-secondary)]">
            Your inquiry has been submitted. I'll reach out soon.
          </p>
          <button
            type="button"
            onClick={closeAndReset}
            className="btn-primary rounded-lg bg-[var(--accent)] px-8 py-3 font-semibold text-[var(--background)] transition-all duration-300"
          >
            Close
          </button>
        </div>
      );
    }

    switch (step) {
      case 0:
        return (
          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--foreground)]">
                Full Name <span className="text-[var(--accent)]">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData((d) => ({ ...d, name: e.target.value }))}
                className={inputStyles}
                placeholder="Your name"
              />
              {errors.name && (
                <p className="mt-2 text-xs text-red-400">{errors.name}</p>
              )}
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--foreground)]">
                Email Address <span className="text-[var(--accent)]">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((d) => ({ ...d, email: e.target.value }))}
                className={inputStyles}
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-2 text-xs text-red-400">{errors.email}</p>
              )}
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--foreground)]">
                Phone Number <span className="text-[var(--text-secondary)]">(optional)</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData((d) => ({ ...d, phone: e.target.value }))}
                className={inputStyles}
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--foreground)]">
                Company <span className="text-[var(--text-secondary)]">(optional)</span>
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData((d) => ({ ...d, company: e.target.value }))}
                className={inputStyles}
                placeholder="Company name"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--foreground)]">
                What are you looking to build? <span className="text-[var(--accent)]">*</span>
              </label>
              <textarea
                value={formData.buildRequest}
                onChange={(e) => setFormData((d) => ({ ...d, buildRequest: e.target.value }))}
                className={clsx(inputStyles, "resize-none")}
                rows={4}
                placeholder="Describe your project idea, goals, or problem you're trying to solve..."
              />
              {errors.buildRequest && (
                <p className="mt-2 text-xs text-red-400">{errors.buildRequest}</p>
              )}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--foreground)]">
                Additional Details <span className="text-[var(--text-secondary)]">(optional)</span>
              </label>
              <textarea
                value={formData.details}
                onChange={(e) => setFormData((d) => ({ ...d, details: e.target.value }))}
                className={clsx(inputStyles, "resize-none")}
                rows={6}
                placeholder="Add any context, timelines, budget considerations, or specific requirements..."
              />
            </div>
          </div>
        );
      case 3:
      default:
        return (
          <div className="space-y-6">
            {/* Contact info */}
            <div className="rounded-xl border border-[var(--border)] bg-[var(--muted)]/50 p-5">
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                Contact Info
              </h4>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-[var(--text-secondary)]">Name</dt>
                  <dd className="font-medium text-[var(--foreground)]">{formData.name}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[var(--text-secondary)]">Email</dt>
                  <dd className="font-medium text-[var(--foreground)]">{formData.email}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[var(--text-secondary)]">Phone</dt>
                  <dd className="font-medium text-[var(--foreground)]">{formData.phone || "—"}</dd>
                </div>
              </dl>
            </div>

            {/* Project info */}
            <div className="rounded-xl border border-[var(--border)] bg-[var(--muted)]/50 p-5">
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                Project Details
              </h4>
              <dl className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <dt className="text-[var(--text-secondary)]">Company</dt>
                  <dd className="font-medium text-[var(--foreground)]">{formData.company || "—"}</dd>
                </div>
                <div>
                  <dt className="mb-2 text-[var(--text-secondary)]">What they want to build</dt>
                  <dd className="rounded-lg bg-[var(--background)] p-3 text-[var(--foreground)]">
                    {formData.buildRequest}
                  </dd>
                </div>
                {formData.details && (
                  <div>
                    <dt className="mb-2 text-[var(--text-secondary)]">Additional details</dt>
                    <dd className="rounded-lg bg-[var(--background)] p-3 text-[var(--foreground)]">
                      {formData.details}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            {submitError && (
              <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
                {submitError}
              </div>
            )}
          </div>
        );
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
      {/* Backdrop */}
      <div
        className="modal-backdrop absolute inset-0 bg-black/70 backdrop-blur-sm"
        aria-hidden
        onClick={closeAndReset}
      />

      {/* Modal */}
      <div className="modal-content relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[var(--border)] bg-[var(--muted)]/30 px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
              Inquiry
            </p>
            <h2 className="mt-1 font-display text-xl font-semibold text-[var(--foreground)]">
              Start a conversation
            </h2>
          </div>
          <button
            type="button"
            onClick={closeAndReset}
            className="rounded-lg border border-[var(--border)] p-2 text-[var(--text-secondary)] transition-all duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]"
            aria-label="Close modal"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-1 w-full bg-[var(--muted)]">
          <div
            className="h-1 bg-[var(--accent)] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Step indicators */}
        {!submitted && (
          <div className="flex items-center gap-2 border-b border-[var(--border)] px-6 py-4">
            {steps.map((label, idx) => (
              <button
                key={label}
                type="button"
                onClick={() => {
                  if (idx < step) {
                    setStep(idx);
                    setErrors({});
                  }
                }}
                disabled={idx > step}
                className={clsx(
                  "rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200",
                  idx === step
                    ? "bg-[var(--accent)] text-[var(--background)]"
                    : idx < step
                    ? "bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--accent)]/20 cursor-pointer"
                    : "bg-[var(--muted)]/50 text-[var(--text-secondary)] cursor-not-allowed"
                )}
              >
                {label}
              </button>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="px-6 py-6">
          {renderStep()}
        </div>

        {/* Footer with buttons */}
        {!submitted && (
          <div className="border-t border-[var(--border)] bg-[var(--muted)]/30 px-6 py-4">
            <StepButtons
              onBack={handleBack}
              onNext={handleNext}
              onSubmit={handleSubmit}
              isFirstStep={step === 0}
              isLastStep={isLastStep}
              disableNext={Object.keys(stepErrors).length > 0}
              disableSubmit={Object.keys(submitErrors).length > 0}
              submitting={submitting}
            />
          </div>
        )}
      </div>
    </div>
  );
}
