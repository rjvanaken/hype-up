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
      <Label htmlFor={id} className="text-left text-sm font-medium text-secondary">
        {label}
      </Label>
      {file ? (
        <Input
          id={id}
          type="file"
          accept="image/*"
          className={cn('mb-2 w-full border-[0.25px] border-neutral-300 px-2.5 py-2 h-11', className)}
          {...props}
        />
      ) : multiline ? (
        <Textarea
          id={id}
          className={cn('mb-2 w-full border-[0.25px] border-neutral-300 px-2.5 py-2 placeholder:text-sm', className)}
          {...(props as React.ComponentProps<'textarea'>)}
        />
      ) : (
        <Input
          id={id}
          className={cn('mb-2 w-full border-[0.25px] border-neutral-300 px-2.5 py-2 h-11', className)}
          {...props}
        />
      )}
    </div>
  )
}

export default FormField