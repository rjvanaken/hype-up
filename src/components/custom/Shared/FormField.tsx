import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import SettingsRowLabel from '@/components/custom/Shared/SettingsRowLabel'

interface FormFieldProps extends React.ComponentProps<'input'> {
  label: React.ReactNode
  id: string
  multiline?: boolean
  file?: boolean
  subtitle?: string
  variant?: 'vertical' | 'horizontal'
  leadingIcon?: LucideIcon
  trailingIcon?: LucideIcon
  onTrailingIconClick?: () => void
}

function FormField({
  label,
  id,
  className,
  multiline = false,
  file = false,
  subtitle,
  variant = 'vertical',
  leadingIcon: LeadingIcon,
  trailingIcon: TrailingIcon,
  onTrailingIconClick,
  ...props
}: FormFieldProps) {
  const horizontal = variant === 'horizontal'
  const hasLeadingIcon = !!LeadingIcon
  const hasTrailingIcon = !!TrailingIcon

  const baseInputClass = cn(
    horizontal ? 'w-64' : 'mb-2 w-full',
    'placeholder:text-sm border-1 border-input px-2.5 py-2',
    !file && 'h-11',
    hasLeadingIcon && !file && 'pl-10',
    hasTrailingIcon && !file && 'pr-10'
  )

  const control = file ? (
    <Input id={id} type="file" accept="image/*" className={cn(baseInputClass, className)} {...props} />
  ) : multiline ? (
    <Textarea id={id} className={cn(baseInputClass, className)} {...(props as React.ComponentProps<'textarea'>)} />
  ) : (
    <Input id={id} className={cn(baseInputClass, className)} {...props} />
  )

  const controlWithIcons = (hasLeadingIcon || hasTrailingIcon) ? (
    <div className="relative">
      {LeadingIcon && (
        <LeadingIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
      )}
      {control}
      {TrailingIcon && (
        <button
          type="button"
          onClick={onTrailingIconClick}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-secondary cursor-pointer"
        >
          <TrailingIcon className="size-4" />
        </button>
      )}
    </div>
  ) : (
    control
  )

  if (horizontal) {
    return (
      <div className="flex items-center gap-6">
        <div className="w-56 shrink-0">
          <SettingsRowLabel id={id} label={label} subtitle={subtitle} />
        </div>
        {controlWithIcons}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} className="text-left text-sm font-medium text-secondary placeholder:text-text-neutral-500">
        {label}
      </Label>
      {controlWithIcons}
    </div>
  )
}

export default FormField