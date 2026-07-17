import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface FormFieldProps extends React.ComponentProps<'input'> {
  label: React.ReactNode
  id: string
  multiline?: boolean
  file?: boolean
}

function FormField({ label, id, className, multiline = false, file = false, ...props }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} className="text-left text-sm font-medium text-secondary placeholder:text-text-neutral-500">
        {label}
      </Label>
      {file ? (
        <Input
          id={id}
          type="file"
          accept="image/*"
          className={className ?? 'mb-2 w-full border-0.25 border-neutral-300 px-2.5 py-2 h-11'}
          {...props}
        />
      ) : multiline ? (
        <Textarea
          id={id}
          className={className ?? 'mb-2 w-full border-0.25 border-neutral-300 px-2.5 py-2'}
          {...(props as React.ComponentProps<'textarea'>)}
        />
      ) : (
        <Input
          id={id}
          className={className ?? 'mb-2 w-full border-0.25 border-neutral-300 px-2.5 py-2 h-11'}
          {...props}
        />
      )}
    </div>
  )
}

export default FormField