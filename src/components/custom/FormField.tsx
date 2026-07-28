import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import SettingsRowLabel from './SettingsRowLabel'

interface FormFieldProps extends React.ComponentProps<'input'> {
  label: React.ReactNode
  id: string
  multiline?: boolean
  file?: boolean
  subtitle?: string
  variant?: 'vertical' | 'horizontal'
}

function FormField({
  label,
  id,
  className,
  multiline = false,
  file = false,
  subtitle,
  variant = 'vertical',
  ...props
}: FormFieldProps) {
  const horizontal = variant === 'horizontal'

  const control = file ? (
    <Input
      id={id}
      type="file"
      accept="image/*"
      className={className ?? (horizontal ? 'w-64 border-1 border-input px-2.5 py-2 h-11' : 'mb-2 w-full border-1 border-input px-2.5 py-2 h-11')}
      {...props}
    />
  ) : multiline ? (
    <Textarea
      id={id}
      className={className ?? (horizontal ? 'w-64 placeholder:text-sm border-1 border-input px-2.5 py-2' : 'mb-2 w-full placeholder:text-sm border-1 border-input px-2.5 py-2')}
      {...(props as React.ComponentProps<'textarea'>)}
    />
  ) : (
    <Input
      id={id}
      className={className ?? (horizontal ? 'w-64 placeholder:text-sm border-1 border-input px-2.5 py-2 h-11' : 'mb-2 w-full placeholder:text-sm border-1 border-input px-2.5 py-2 h-11')}
      {...props}
    />
  )

if (variant === 'horizontal') {
  return (
    <div className="flex items-center justify-between gap-4">
      <SettingsRowLabel id={id} label={label} subtitle={subtitle} />
      {control}
    </div>
  )
}

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} className="text-left text-sm font-medium text-secondary placeholder:text-text-neutral-500">
        {label}
      </Label>
      {control}
    </div>
  )
}

export default FormField