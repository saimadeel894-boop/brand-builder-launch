import { useMemo } from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface PasswordStrengthProps {
  password: string;
  showRequirements?: boolean;
}

interface PasswordRequirement {
  label: string;
  regex: RegExp;
}

const requirements: PasswordRequirement[] = [
  { label: "At least 8 characters", regex: /.{8,}/ },
  { label: "One uppercase letter", regex: /[A-Z]/ },
  { label: "One lowercase letter", regex: /[a-z]/ },
  { label: "One number", regex: /\d/ },
  { label: "One special character (!@#$%^&*)", regex: /[!@#$%^&*(),.?":{}|<>]/ },
];

export function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  for (const req of requirements) {
    if (!req.regex.test(password)) {
      errors.push(req.label);
    }
  }
  
  return { valid: errors.length === 0, errors };
}

export function PasswordStrength({ password, showRequirements = true }: PasswordStrengthProps) {
  const checks = useMemo(() => {
    return requirements.map((req) => ({
      ...req,
      met: req.regex.test(password),
    }));
  }, [password]);

  const strength = useMemo(() => {
    const metCount = checks.filter((c) => c.met).length;
    if (metCount === 0) return { level: 0, label: "", color: "" };
    if (metCount <= 2) return { level: 1, label: "Weak", color: "bg-destructive" };
    if (metCount <= 3) return { level: 2, label: "Fair", color: "bg-yellow-500" };
    if (metCount <= 4) return { level: 3, label: "Good", color: "bg-blue-500" };
    return { level: 4, label: "Strong", color: "bg-green-500" };
  }, [checks]);

  if (!password) return null;

  return (
    <div className="space-y-3 mt-2">
      {/* Strength bar */}
      <div className="space-y-1">
        <div className="flex gap-1">
          {[1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors",
                level <= strength.level ? strength.color : "bg-secondary"
              )}
            />
          ))}
        </div>
        {strength.label && (
          <p className={cn(
            "text-xs font-medium",
            strength.level <= 1 ? "text-destructive" :
            strength.level === 2 ? "text-yellow-600" :
            strength.level === 3 ? "text-blue-600" :
            "text-green-600"
          )}>
            {strength.label}
          </p>
        )}
      </div>

      {/* Requirements list */}
      {showRequirements && (
        <ul className="space-y-1">
          {checks.map((check, index) => (
            <li
              key={index}
              className={cn(
                "flex items-center gap-2 text-xs transition-colors",
                check.met ? "text-green-600" : "text-muted-foreground"
              )}
            >
              {check.met ? (
                <Check className="h-3 w-3" />
              ) : (
                <X className="h-3 w-3" />
              )}
              {check.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
