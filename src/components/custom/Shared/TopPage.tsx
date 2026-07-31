import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface TopPageProps {
  children: ReactNode
    className?: string
}

function TopPage({ children, className}: TopPageProps) {
  return (
    <div 
    className={cn(
      "flex w-full flex-col items-start justify-start gap-2",
      className
    )}      
  >
      {children}
    </div>
  )
}

export default TopPage