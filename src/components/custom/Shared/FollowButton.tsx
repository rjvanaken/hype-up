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
        variant === 'follow-alt' && 'bg-card border-0 text-primary hover:bg-cool-brand-300/80 hover:text-cool-brand-800 active:bg-cool-brand-400/80 active:text-cool-bran',
        variant === 'unfollow-alt' && 'bg-transparent inset-ring-2 inset-ring-white text-white hover:bg-white/20 active:bg-white/30',
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