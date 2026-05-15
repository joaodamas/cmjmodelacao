import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Buttons CMJ — geometria retangular, sem rounded-md default do shadcn.
 * O acabamento técnico vem das CSS vars (--radius=2px) e de uma sombra interna fina,
 * não de bordas arredondadas ou ring-2 azul-violeta.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-[0.92rem] font-semibold tracking-tight transition-[background,transform,box-shadow] duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 active:translate-y-px",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[inset_0_-2px_0_rgba(0,0,0,0.12)] hover:bg-primary/92",
        accent:
          "bg-accent text-accent-foreground shadow-[inset_0_-2px_0_rgba(0,0,0,0.18)] hover:bg-accent/92",
        outline:
          "border border-input bg-transparent text-primary hover:border-primary hover:bg-secondary",
        ghost: "text-primary hover:bg-secondary"
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-3.5 text-xs uppercase tracking-[0.08em]",
        lg: "h-12 px-6 text-[0.95rem]",
        icon: "h-11 w-11"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
