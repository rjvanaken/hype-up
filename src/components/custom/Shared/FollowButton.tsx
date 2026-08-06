import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

function FollowButton({
  variant = 'follow',
  icon: Icon,
  className,
  children,
  ...props
}: {
  variant?: 'follow' | 'unfollow' | 'follow-alt' | 'unfollow-alt'
  icon?: LucideIcon
  className?: string
  children: React.ReactNode
} & React.ComponentProps<'button'>) {
  return (
    <button 
      className={cn(
        'app-button rounded-full px-6 py-1 w-22 h-8 text-sm font-semibold transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
        'flex items-center justify-center gap-2 cursor-pointer',
        variant === 'follow' && 'bg-primary border-0 text-primary-foreground hover:bg-cool-brand-600/80 active:bg-cool-brand-700',
        variant === 'unfollow' && 'bg-transparent inset-ring-2 inset-ring-primary text-primary hover:bg-primary/20 active:bg-primary/30 active:text-cool-brand-700',
        variant === 'follow-alt' && 'bg-secondary border-0 text-secondary-foreground hover:bg-secondary/50',
        variant === 'unfollow-alt' && 'bg-card inset-ring-2 inset-ring-primary text-primary hover:bg-primary/20 active:bg-primary/30 active:text-cool-brand-700',
        className
      )}
      {...props}
    >
      {Icon && <Icon className="size-4" />}
      {children}
    </button>
  )
}

export default FollowButton