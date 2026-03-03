import { cn } from "@/utils/cn";
import { forwardRef } from "react";
import type { InputProps } from "./@types/Input.interface";

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-[#A0A0B0]">{label}</label>
      )}
      <input
        ref={ref}
        className={cn(
          "w-full px-4 py-2.5 rounded-lg bg-[#0D0E1A] border border-white/7 text-white placeholder:text-[#606070]",
          "focus:outline-none focus:border-[#C9A84C]/50 focus:ring-1 focus:ring-[#C9A84C]/30 transition-all",
          error && "border-red-500/60",
          className,
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
      {hint && !error && <p className="text-xs text-[#606070]">{hint}</p>}
    </div>
  ),
);

Input.displayName = "Input";

export default Input;
