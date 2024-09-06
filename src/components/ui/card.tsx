import * as React from "react";
import { cn } from "../../utils/cn";
import { cva, VariantProps } from "class-variance-authority";

const CardHeaderVariants = cva("flex flex-col space-y-1.5 p-6", {
  variants: {
    variant: {
      default: "flex flex-col space-y-1.5 p-1",
      // noHeader: "flex flex-col space-y-1.5 p-1",
      info: "p-3 bg-info text-info-foreground bg-slate-400 rounded-t-2xl text-left",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const CardTitleVariants = cva(
  "text-2xl font-semibold leading-none tracking-tight",
  {
    variants: {
      variant: {
        default: "font-semibold leading-none tracking-tight",
        info: "font-medium leading-none tracking-tight text-white px-2",
      },
      textSize: {
        default: "text-2xl",
        sm: "text-sm",
        md: "text-md",
        lg: "text-lg",
        xl: "text-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      textSize: "default",
    },
  }
);

interface CardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof CardHeaderVariants> {}

interface CardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof CardTitleVariants> {}

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-2xl border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(CardHeaderVariants({ variant, className }))}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, CardTitleProps>(
  ({ className, variant, textSize, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(CardTitleVariants({ variant, textSize, className }))}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
