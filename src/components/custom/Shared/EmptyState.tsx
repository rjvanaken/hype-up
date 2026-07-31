import AppButton from "./AppButton"
import type { LucideIcon } from 'lucide-react'

function EmptyState({
  imagePath,
  title,
  subtitle,
  actionLabel,
  icon: Icon,
  onAction
}: {
  imagePath?: string
  title: string
  subtitle: string
  actionLabel?: string
  icon?: LucideIcon
  onAction?: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-10 px-6">
      <div className="flex items-center justify-center size-30 bg-transparent overflow-hidden mb-4">
        <img src={imagePath} alt="" className="w-full h-full " />
      </div>
    <div className="gap-4 flex flex-col ">
<div className="flex flex-col gap-0">
      <p className="text-secondary font-bold">{title}</p>
      <p className="text-sm text-neutral-600 mt-1">{subtitle}</p>
</div>
      {actionLabel && (
        <AppButton onClick={onAction} className="mx-4">
        {Icon && <Icon className="size-4" />}
          {actionLabel}
        </AppButton>
      )}
    </div>
    </div>
  )
}

export default EmptyState