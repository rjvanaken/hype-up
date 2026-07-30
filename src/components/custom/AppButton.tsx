import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

function AppButton({
  variant = 'default',
  icon: Icon,
  className,
  children,
  ...props
}: {
  variant?: 'default' | 'outline' | 'alternate' | 'primary'
  icon?: LucideIcon
  className?: string
  children: React.ReactNode
} & React.ComponentProps<'button'>) {
  return (
    <button
      className={cn(
        'flex-1 h-11 rounded-md text-sm font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
        'flex items-center justify-center gap-2',
        variant === 'default' && 'bg-secondary text-white hover:bg-secondary/90 border-0',
        variant === 'outline' && 'bg-transparent border border-primary text-primary font-semibold hover:bg-primary/10',
        variant === 'alternate' && 'bg-neutral-200 text-secondary font-semibold border-0 hover:bg-neutral-300',
        variant === 'primary' && 'bg-primary text-white font-semibold border-0 hover:bg-primary/90',
        className
      )}
      {...props}
    >
      {Icon && <Icon className="size-4" />}
      {children}
    </button>
  )
}

export default AppButton