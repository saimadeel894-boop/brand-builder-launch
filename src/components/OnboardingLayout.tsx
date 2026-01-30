import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/Logo";

interface OnboardingLayoutProps {
  children: ReactNode;
  currentStep: number;
  totalSteps: number;
  title: string;
  subtitle?: string;
}

export function OnboardingLayout({
  children,
  currentStep,
  totalSteps,
  title,
  subtitle,
}: OnboardingLayoutProps) {
  return (
    <div className="min-h-screen bg-secondary/30">
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="mb-8 flex items-center justify-center">
          <Logo size="lg" />
        </div>

        {/* Step indicator */}
        <div className="mb-8 flex items-center justify-center gap-2">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className={cn(
                "step-indicator-dot",
                index < currentStep && "completed",
                index === currentStep && "active"
              )}
            />
          ))}
        </div>

        {/* Title section */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">{title}</h1>
          {subtitle && (
            <p className="mt-2 text-muted-foreground">{subtitle}</p>
          )}
        </div>

        {/* Content */}
        <div className="page-transition">{children}</div>
      </div>
    </div>
  );
}