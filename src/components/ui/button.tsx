import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-[opacity,transform,background-color,color] duration-150 ease-out active:not-disabled:scale-[0.96] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal",
  {
    variants: {
      variant: {
        primary: "bg-teal text-foam hover:bg-teal-deep",
        inverse: "bg-bg text-ink hover:bg-bg-elevated",
        outline: "bg-transparent text-ink shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-lift)]",
        ghost: "bg-transparent text-ink hover:bg-surface",
        warn: "bg-warn text-bg-elevated hover:opacity-90",
      },
      size: {
        sm: "h-10 rounded-[var(--radius-sm)] px-3.5 text-sm",
        md: "h-11 rounded-[var(--radius-md)] px-5 text-sm",
        lg: "h-12 rounded-[var(--radius-md)] px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>
>(({ className, variant, size, type = "button", ...props }, ref) => (
  <button
    ref={ref}
    type={type}
    className={cn(buttonVariants({ variant, size }), className)}
    {...props}
  />
));

Button.displayName = "Button";
