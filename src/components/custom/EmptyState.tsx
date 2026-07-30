import AppButton from "./AppButton"

function EmptyState({
  image,
  emoji,
  title,
  subtitle,
  actionLabel,
  onAction,
  actionDisabled,
}: {
  image?: string
  emoji?: string
  title: string
  subtitle?: string
  actionLabel?: string
  onAction?: () => void
  actionDisabled?: boolean
}) {
  return (
    <div className="flex flex-col items-center text-center py-10 px-6">
      <div className="flex items-center justify-center size-20 rounded-full bg-neutral-200 overflow-hidden mb-4">
        {emoji ? (
          <span role="img" className="text-4xl">{emoji}</span>
        ) : image ? (
          <img src={image} alt="" className="w-full h-full object-cover" />
        ) : null}
      </div>

      <p className="text-base font-bold">{title}</p>
      {subtitle && <p className="text-sm text-secondary mt-1">{subtitle}</p>}

      {actionLabel && onAction && (
        <AppButton onClick={onAction} disabled={actionDisabled} className="flex-none mt-4 px-4">
          {actionLabel}
        </AppButton>
      )}
    </div>
  )
}

export default EmptyState
