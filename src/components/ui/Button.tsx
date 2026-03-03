import { cn } from "@/utils/cn";
import type { ButtonProps } from "./@types/Button.interface";

const variants = {
  gold: "bg-gradient-to-r from-[#C9A84C] to-[#E2C16A] text-[#07080F] font-semibold shadow-[0_4px_20px_rgba(201,168,76,.3)] hover:shadow-[0_8px_30px_rgba(201,168,76,.45)] hover:-translate-y-0.5",
  outline:
    "border border-white/10 text-white hover:border-[#C9A84C]/40 hover:text-[#E2C16A] bg-transparent",
  ghost: "text-[#A0A0B0] hover:text-white hover:bg-white/5 bg-transparent",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

export const Button = ({
  variant = "gold",
  size = "md",
  isLoading,
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        "inline-flex items-center gap-2 rounded-lg font-medium transition-all duration-200 cursor-pointer disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? <span className="animate-spin"> </span> : children}
    </button>
  );
};
