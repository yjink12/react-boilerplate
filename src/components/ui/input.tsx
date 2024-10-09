import * as React from "react";

import { cn } from "../../utils/cn";
import { cva, VariantProps } from "class-variance-authority";

const InputVariants = cva(
  "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm  file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-xl",
      },
      size: {
        default: "h-10",
        sm: "h-8",
        md: "h-11",
        lg: "h-12",
        xl: "h-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof InputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(InputVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
