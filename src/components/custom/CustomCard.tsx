import { Card } from '@/components/ui/card'
import type { ReactNode } from 'react'

interface CardProps {
  className?: string
  padding?: string
  glass?: boolean
  children: ReactNode
}

function CenteredCard({ className = '', padding = 'pt-8 pb-8 pl-3.5 pr-3.5', glass=false, children }: CardProps) {
  return (
    <Card className={`w-full ${padding} shadow-lg !border-none ${glass} ? 'card-glass' : ''} ${className}`}>
      {children}
    </Card>
  )
}

export default CenteredCard