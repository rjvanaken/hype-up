import { Card } from '@/components/ui/card'
import type { ReactNode } from 'react'

interface CenteredCardProps {
  width?: string
  children: ReactNode
}

function CenteredCard({ width = '380px', children }: CenteredCardProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Card className="w-full gap-3 pb-6" style={{ maxWidth: width }}>
        {children}
      </Card>
    </div>
  )
}

export default CenteredCard