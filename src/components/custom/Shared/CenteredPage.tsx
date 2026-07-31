import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CenteredPageProps {
  children: ReactNode
  className?: string
}

function CenteredPage({ children, className }: CenteredPageProps) {
  return (
    <div
      className={cn(
        'flex min-h-screen flex-col items-center justify-center gap-2',
        className
      )}
    >
      {children}
    </div>
  )
}

export default CenteredPage