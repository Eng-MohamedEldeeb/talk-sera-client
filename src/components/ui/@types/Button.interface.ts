import type { ButtonHTMLAttributes } from "react";

export enum ButtonVariant {
  gold = "gold",
  outline = "outline",
  ghost = "ghost",
}

export enum ButtonSize {
  sm = "sm",
  md = "md",
  lg = "lg",
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof ButtonVariant;
  size?: keyof typeof ButtonSize;
  isLoading?: boolean;
}
