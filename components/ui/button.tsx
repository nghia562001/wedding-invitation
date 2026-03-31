import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  default:
    "bg-neutral-900 text-white hover:bg-neutral-800 border border-neutral-900",
  outline:
    "bg-white text-neutral-900 border border-neutral-300 hover:bg-neutral-50",
  ghost:
    "bg-transparent text-neutral-900 border border-transparent hover:bg-neutral-100",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-8 text-sm tracking-[0.12em] uppercase",
};

export function Button({
  className,
  variant = "default",
  size = "md",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50",
        "focus:outline-none focus:ring-2 focus:ring-neutral-300 focus:ring-offset-2",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    />
  );
}