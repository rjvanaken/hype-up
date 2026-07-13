// src/components/custom/CenteredPage.tsx
import type { ReactNode } from 'react'

interface CenteredPageProps {
  children: ReactNode
}

function CenteredPage({ children }: CenteredPageProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-2">
      {children}
    </div>
  )
}

export default CenteredPage