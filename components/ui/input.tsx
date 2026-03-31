import * as React from "react";
import { cn } from "@/lib/utils";

export function Input({
  className,
  type = "text",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-2xl border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-900",
        "placeholder:text-neutral-400",
        "transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-neutral-300 focus:border-neutral-400",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}