import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-coral text-white [a]:hover:bg-coral-soft",
        secondary:
          "bg-mocha text-warm-white [a]:hover:bg-charcoal dark:bg-dark-elevated dark:text-dark-text dark:border-dark-border",
        destructive:
          "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
        outline:
          "border-mist text-charcoal [a]:hover:bg-mist/30 dark:border-dark-border dark:text-dark-text dark:[a]:hover:bg-dark-border",
        ghost:
          "hover:bg-coral/5 hover:text-coral dark:hover:bg-coral/10",
        link: "text-coral underline-offset-4 hover:underline",
        success: "bg-sage/20 text-sage px-2 py-0.5 rounded-full text-xs font-medium border border-sage/30 dark:bg-sage/20 dark:border-sage/40",
        pending: "bg-stone/30 text-mocha border border-stone/40 dark:bg-dark-border/40 dark:text-dark-muted dark:border-dark-border",
        rejected: "bg-coral/10 text-coral border border-coral/20 dark:bg-coral/20 dark:border-coral/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
