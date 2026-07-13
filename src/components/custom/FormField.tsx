import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface FormFieldProps extends React.ComponentProps<'input'> {
  label: string
  id: string
}

function FormField({ label, id, className, ...props }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} className="text-left text-sm font-medium text-secondary placeholder:text-text-neutral-500">
        {label}
      </Label>
      <Input
        id={id}
        className={className ?? 'mb-2 w-full border-0.25 border-neutral-300 px-2 py-2 h-11'}
        {...props}
      />
    </div>
  )
}

export default FormField