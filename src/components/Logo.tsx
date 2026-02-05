import { forwardRef } from "react";
import logo from "@/assets/logo.png";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

const sizeClasses = {
  sm: "h-8",
  md: "h-10",
  lg: "h-12",
};

export const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ className, size = "md", showText = true }, ref) => (
    <div ref={ref} className={cn("flex items-center gap-2", className)}>
      <img 
        src={logo} 
        alt="BeautyChain" 
        className={cn(sizeClasses[size], "w-auto object-contain")}
      />
      {showText && (
        <span className="font-semibold text-foreground">BeautyChain</span>
      )}
    </div>
  )
);
Logo.displayName = "Logo";

export const LogoIcon = forwardRef<HTMLImageElement, Omit<LogoProps, "showText">>(
  ({ className, size = "md" }, ref) => (
    <img 
      ref={ref}
      src={logo} 
      alt="BeautyChain" 
      className={cn(sizeClasses[size], "w-auto object-contain", className)}
    />
  )
);
LogoIcon.displayName = "LogoIcon";
