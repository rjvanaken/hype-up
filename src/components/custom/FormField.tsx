import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

interface FormFieldProps extends React.ComponentProps<'input'> {
  label: string
  id: string
  multiline?: boolean
}

function FormField({ label, id, className, multiline = false, ...props }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} className="text-left text-sm font-medium text-secondary placeholder:text-text-neutral-500">
        {label}
      </Label>
      {multiline ? (
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