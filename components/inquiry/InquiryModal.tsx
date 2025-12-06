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

  const progress = useMemo(() => ((step + 1) / steps.length) * 100, [step, steps.length]);

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

  const renderStep = () => {
    if (submitted) {
      return (
        <div className="space-y-4 text-center">
          <h3 className="text-xl font-semibold text-gray-900">Thanks!</h3>
          <p className="text-sm text-gray-600">
            Your inquiry has been submitted. I’ll reach out soon.
          </p>
          <button
            type="button"
            onClick={closeAndReset}
            className="inline-flex items-center justify-center rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-95"
          >
            Close
          </button>
        </div>
      );
    }

    switch (step) {
      case 0:
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-800">Full Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData((d) => ({ ...d, name: e.target.value }))}
                className="mt-1 w-full rounded-md border border-[var(--border)] bg-white px-3 py-2 text-sm outline-none transition focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
                placeholder="Your name"
              />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-800">Email Address *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((d) => ({ ...d, email: e.target.value }))}
                className="mt-1 w-full rounded-md border border-[var(--border)] bg-white px-3 py-2 text-sm outline-none transition focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
                placeholder="you@example.com"
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>
            <div>
              <label className="text-sm font-medium text-gray-800">Phone Number (optional)</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData((d) => ({ ...d, phone: e.target.value }))}
                className="mt-1 w-full rounded-md border border-[var(--border)] bg-white px-3 py-2 text-sm outline-none transition focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
                placeholder="(optional)"
              />
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-800">Company (optional)</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData((d) => ({ ...d, company: e.target.value }))}
                className="mt-1 w-full rounded-md border border-[var(--border)] bg-white px-3 py-2 text-sm outline-none transition focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
                placeholder="Company name"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-800">What are you looking to build? *</label>
              <textarea
                value={formData.buildRequest}
                onChange={(e) => setFormData((d) => ({ ...d, buildRequest: e.target.value }))}
                className="mt-1 w-full rounded-md border border-[var(--border)] bg-white px-3 py-2 text-sm outline-none transition focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
                rows={3}
                placeholder="Describe the project"
              />
              {errors.buildRequest && (
                <p className="mt-1 text-xs text-red-500">{errors.buildRequest}</p>
              )}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-800">Tell me more (optional)</label>
              <textarea
                value={formData.details}
                onChange={(e) => setFormData((d) => ({ ...d, details: e.target.value }))}
                className="mt-1 w-full rounded-md border border-[var(--border)] bg-white px-3 py-2 text-sm outline-none transition focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
                rows={5}
                placeholder="Add context, timelines, or goals"
              />
            </div>
          </div>
        );
      case 3:
      default:
        return (
          <div className="space-y-4 text-sm text-gray-800">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">Contact</p>
              <p className="mt-1">Name: {formData.name}</p>
              <p>Email: {formData.email}</p>
              <p>Phone: {formData.phone || "Not provided"}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">Project</p>
              <p className="mt-1">Company: {formData.company || "Not provided"}</p>
              <p className="mt-2 font-medium text-gray-900">What they want to build</p>
              <p className="text-gray-700">{formData.buildRequest || "Not provided"}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                Additional details
              </p>
              <p className="mt-1 text-gray-700">{formData.details || "Not provided"}</p>
            </div>
            {submitError && <p className="text-sm text-red-500">{submitError}</p>}
          </div>
        );
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-10">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        aria-hidden
        onClick={closeAndReset}
      />
      <div className="relative z-10 w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
              Inquiry
            </p>
            <h2 className="text-xl font-semibold text-gray-900">Start an inquiry</h2>
          </div>
          <button
            type="button"
            onClick={closeAndReset}
            className="rounded-md border border-[var(--border)] px-2 py-1 text-sm text-gray-600 transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            Close
          </button>
        </div>

        <div className="mb-4 h-2 w-full rounded-full bg-gray-100">
          <div
            className="h-2 rounded-full bg-[var(--accent)] transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
          {steps.map((label, idx) => (
            <span
              key={label}
              className={clsx(
                "rounded-full px-2 py-1",
                idx === step ? "bg-[color-mix(in_srgb,var(--accent)_15%,white)] text-[var(--accent)]" : "text-gray-500",
              )}
            >
              {label}
            </span>
          ))}
        </div>

        <div className="space-y-6">{renderStep()}</div>

        {!submitted && (
          <div className="mt-8">
            <StepButtons
              onBack={handleBack}
              onNext={handleNext}
              onSubmit={handleSubmit}
              isFirstStep={step === 0}
              isLastStep={isLastStep}
              submitting={submitting}
            />
          </div>
        )}
      </div>
    </div>
  );
}

