import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-white text-[#080b19] shadow-[0_0_30px_rgba(124,58,237,.3)] hover:-translate-y-0.5 hover:bg-violet-100 hover:shadow-[0_0_38px_rgba(124,58,237,.5)]",
        glow:
          "bg-gradient-to-r from-violet-600 to-blue-500 text-white shadow-[0_0_30px_rgba(124,58,237,.36)] hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(59,130,246,.5)]",
        outline:
          "border border-white/12 bg-white/[.035] text-white backdrop-blur-xl hover:-translate-y-0.5 hover:border-cyan-300/35 hover:bg-white/[.075]",
        ghost: "text-slate-300 hover:bg-white/[.06] hover:text-white",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-4 text-xs",
        lg: "h-13 px-6",
        icon: "size-10 p-0",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { buttonVariants };
