import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full min-w-0 rounded-lg border border-mist/60 dark:border-dark-border bg-white dark:bg-dark-elevated px-3 py-2 text-base text-charcoal dark:text-dark-text transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-charcoal/30 dark:placeholder:text-dark-muted/50 focus-visible:border-coral dark:focus-visible:border-coral focus-visible:ring-2 focus-visible:ring-coral/20 dark:focus-visible:ring-coral/20 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-mist/20 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Input }
