import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Slot } from "radix-ui"

const buttonVariants = cva(
  'inline-flex shrink-0 items-center justify-center gap-2 rounded-[8px] text-sm font-medium whitespace-normal text-center transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\'size-\'])]:size-4',
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          'bg-destructive text-background hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: 'min-h-11 min-w-11 px-4 py-2 has-[>svg]:px-3',
        xs: 'min-h-11 min-w-11 gap-1 px-2 py-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*=\'size-\'])]:size-3',
        sm: 'min-h-11 min-w-11 gap-1.5 px-3 py-2 has-[>svg]:px-2.5',
        lg: 'min-h-11 min-w-11 px-6 py-3 has-[>svg]:px-4',
        icon: 'size-11',
        'icon-xs': 'size-11 [&_svg:not([class*=\'size-\'])]:size-3',
        'icon-sm': 'size-11',
        'icon-lg': 'size-11',
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
