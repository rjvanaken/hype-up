import { Card } from '@/components/ui/card'
import type { ReactNode } from 'react'

interface CardProps {
  className?: string
  padding?: string
  glass?: boolean
  children: ReactNode
}

function CustomCard({ className = '', padding = 'py-6 px-6', glass=true, children }: CardProps) {
  return (
    <Card className={`w-full flex flex-col ${padding} shadow-lg text-white !border-none ${glass ? 'card-glass' : ''} ${className}`}>
      {children}
    </Card>
  )
}

export default CustomCard