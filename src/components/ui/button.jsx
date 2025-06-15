import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all cursor-pointer disabled:pointer-events-auto disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
        primary: 'bg-[#0F31AD] text-white hover:bg-[#0D2790]',
        secondary: 'bg-[#E8EFFF] text-[#0F31AD] hover:bg-[#D0E7FF]',
        success: 'bg-[#E5FCE8] text-green-800 hover:bg-[#CFF9D3]',
        info: 'bg-[#5856D6] text-white hover:bg-[#4844B3]',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
      withIcon: {
        true: 'flex items-center gap-2',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
      withIcon: 'false',
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  icon,
  isLoading = false,
  children,
  ...props
}) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({ variant, size, withIcon: !!icon, className }),
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-1">
          <span className="dot dot1" />
          <span className="dot dot2" />
          <span className="dot dot3" />
        </span>
      ) : (
        <>
          {icon && <span className="icon">{icon}</span>}
          {children}
        </>
      )}
    </Comp>
  );
}

export { Button, buttonVariants };
