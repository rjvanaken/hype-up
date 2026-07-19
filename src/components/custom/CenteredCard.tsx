// src/components/custom/CenteredCard.tsx
import { Card } from '@/components/ui/card'
import type { ReactNode } from 'react'

interface CenteredCardProps {
  width?: string
  className?: string
  padding?: string
  children: ReactNode
}

function CenteredCard({ width = 'max-w-[400px] sm:max-w-[500px] lg:max-w-[640px]', className = '', padding = 'pt-8 pb-8 pl-3.5 pr-3.5', children }: CenteredCardProps) {
  return (
    <Card
      className={`w-full ${padding} shadow-lg !border-none ${width} ${className}`}
    >
      {children}
    </Card>
  )
}

export default CenteredCard