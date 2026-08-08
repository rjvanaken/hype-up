import AppButton from "./AppButton"
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

function EmptyState({
  imagePath,
  title,
  subtitle,
  actionLabel,
  icon: Icon,
  onAction,
  className
}: {
  imagePath?: string
  title: string
  subtitle: string
  actionLabel?: string
  icon?: LucideIcon
  onAction?: () => void
  className?: string
}) {
  return (
    <div className={cn('flex flex-col items-center justify-center text-center py-10 px-6', className)}>
      <div className="flex items-center justify-center size-30 bg-transparent overflow-hidden mb-4">
        <img src={imagePath} alt="" className="w-full h-full " />
      </div>
    <div className="gap-4 flex flex-col items-center">
<div className="flex flex-col gap-0">
      <p className="text-secondary font-bold">{title}</p>
      <p className="text-sm text-neutral-600 mt-1">{subtitle}</p>
</div>
      {actionLabel && (
        <AppButton onClick={onAction} className="flex-none mx-4">
        {Icon && <Icon className="size-4" />}
          {actionLabel}
        </AppButton>
      )}
    </div>
    </div>
  )
}

export default EmptyState