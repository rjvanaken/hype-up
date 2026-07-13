// src/components/custom/CenteredCard.tsx
import { Card } from '@/components/ui/card'
import type { ReactNode } from 'react'

interface CenteredCardProps {
  width?: string
  children: ReactNode
}

function CenteredCard({ width = '425px', children }: CenteredCardProps) {
  return (
    <Card className="w-full" style={{ maxWidth: width }}>
      {children}
    </Card>
  )
}

export default CenteredCard