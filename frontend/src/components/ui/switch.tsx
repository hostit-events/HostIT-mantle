"use client";

import React from "react";
import { cn } from "@/lib/utils";

type SwitchProps = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
  label?: string;
};

const sizes = {
  sm: { track: "w-10 h-5", knob: "w-4 h-4", translate: "translate-x-5" },
  md: { track: "w-12 h-6", knob: "w-5 h-5", translate: "translate-x-6" },
  lg: { track: "w-16 h-8", knob: "w-7 h-7", translate: "translate-x-8" },
};

export function Switch({ checked, onCheckedChange, disabled, className, size = "md", label }: SwitchProps) {
  const s = sizes[size];
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => !disabled && onCheckedChange(!checked)}
      className={cn(
        "group inline-flex items-center select-none",
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        className
      )}
    >
      <span
        className={cn(
          "relative rounded-full transition-colors duration-300",
          s.track,
          checked ? "bg-subsidiary" : "bg-gray-600",
          "shadow-[0_0_20px_rgba(19,25,57,0.6)]"
        )}
      >
        <span
          className={cn(
            "absolute left-1 top-1 rounded-full bg-white transition-transform duration-300",
            s.knob,
            checked ? s.translate : "translate-x-0",
            "shadow-md"
          )}
        />
        {/* Decorative glow */}
        <span
          aria-hidden
          className={cn(
            "absolute inset-0 rounded-full blur-md", checked ? "bg-white/10" : "bg-transparent"
          )}
        />
      </span>
      {label && (
        <span className="ml-2 text-white/90 text-sm md:text-base">{label}</span>
      )}
    </button>
  );
}

export default Switch;