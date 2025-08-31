import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-lg font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0 transform-gpu will-change-transform hover:scale-105 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-gradient-primary text-primary-foreground shadow-glow hover:shadow-float animate-pulse-soft",
        destructive:
          "bg-destructive text-destructive-foreground shadow-md hover:bg-destructive/90",
        outline:
          "border-2 border-primary bg-primary/10 text-primary shadow-card hover:bg-primary hover:text-primary-foreground backdrop-blur-sm",
        secondary:
          "bg-gradient-secondary text-secondary-foreground shadow-glow hover:shadow-float animate-pulse-soft",
        success:
          "bg-gradient-success text-success-foreground shadow-glow hover:shadow-float animate-pulse-soft",
        accent:
          "bg-gradient-accent text-accent-foreground shadow-glow hover:shadow-float animate-pulse-soft",
        coral:
          "bg-gradient-coral text-coral-foreground shadow-glow hover:shadow-float animate-pulse-soft",
        pink:
          "bg-gradient-pink text-pink-foreground shadow-glow hover:shadow-float animate-pulse-soft",
        rainbow:
          "bg-gradient-rainbow text-white shadow-rainbow hover:shadow-float animate-rainbow",
        playful: "bg-gradient-primary text-primary-foreground shadow-glow hover:shadow-float animate-pulse-soft",
        fun: "bg-gradient-secondary text-secondary-foreground shadow-glow hover:shadow-float animate-pulse-soft",
        magical: "bg-gradient-accent text-accent-foreground shadow-glow hover:shadow-float animate-pulse-soft",
        ghost: "hover:bg-accent/20 hover:text-accent-foreground backdrop-blur-sm",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-14 px-8 py-3",
        sm: "h-10 rounded-full px-6 text-base",
        lg: "h-16 rounded-full px-12 text-xl",
        xl: "h-18 rounded-full px-14 text-2xl",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }