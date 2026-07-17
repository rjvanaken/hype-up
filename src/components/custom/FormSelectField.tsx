import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { SelectRootChangeEventDetails } from '@base-ui/react/select'

interface FormSelectFieldOption {
  value: string
  label: string
}

interface FormSelectFieldProps {
  label: string
  id: string
  placeholder: string
  options: FormSelectFieldOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string | null, eventDetails: SelectRootChangeEventDetails) => void
}

function FormSelectField({ label, id, placeholder, options, value, defaultValue, onValueChange }: FormSelectFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} className="text-left text-sm font-medium text-secondary">
        {label}
      </Label>
      <Select items={options} value={value} defaultValue={defaultValue} onValueChange={onValueChange}>
        <SelectTrigger id={id} className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default FormSelectField
