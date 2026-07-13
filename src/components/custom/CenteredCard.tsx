// src/components/custom/CenteredCard.tsx
import { Card } from '@/components/ui/card'
import type { ReactNode } from 'react'

interface CenteredCardProps {
  width?: string
  children: ReactNode
}

function CenteredCard({ width = '400px', children }: CenteredCardProps) {
  return (
    <Card className="w-full pt-8 pb-8 pl-3.5 pr-3.5 shadow-lg !border-none" style={{ maxWidth: width }}>
      {children}
    </Card>
  )
}

export default CenteredCard