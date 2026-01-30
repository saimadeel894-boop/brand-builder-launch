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

export function Logo({ className, size = "md", showText = true }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <img 
        src={logo} 
        alt="BeautyChain" 
        className={cn(sizeClasses[size], "w-auto object-contain")}
      />
      {showText && (
        <span className="font-semibold text-foreground">BeautyChain</span>
      )}
    </div>
  );
}

export function LogoIcon({ className, size = "md" }: Omit<LogoProps, "showText">) {
  return (
    <img 
      src={logo} 
      alt="BeautyChain" 
      className={cn(sizeClasses[size], "w-auto object-contain", className)}
    />
  );
}
