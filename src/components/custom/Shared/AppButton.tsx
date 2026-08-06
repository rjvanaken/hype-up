import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

function AppButton({
  variant = 'default',
  icon: Icon,
  className,
  children,
  ...props
}: {
  variant?: 'default' | 'outline' | 'alternate' | 'link'
  icon?: LucideIcon
  className?: string
  children: React.ReactNode
} & React.ComponentProps<'button'>) {
  return (
    <button 
      className={cn(
        'app-button rounded-md text-sm font-semibold transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
        'flex items-center justify-center gap-2 cursor-pointer',
        variant !== 'link' && 'flex-1 h-11 px-4 py-3',
        variant === 'default' && 'bg-primary text-primary-foreground hover:bg-cool-brand-600/80 border-0 active:bg-cool-brand-700',
        variant === 'outline' && 'bg-transparent border-2 border-primary text-primary hover:bg-primary/20 active:bg-primary/30 active:text-cool-brand-700',
        variant === 'alternate' && 'bg-neutral-300 border-2 border-neutral-400 text-neutral-600 hover:bg-neutral-400/50 active:bg-neutral-400/80',
        variant === 'link' && 'text-xs font-semibold text-primary hover:underline cursor-pointer active:text-cool-brand-800',
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