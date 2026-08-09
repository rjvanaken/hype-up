import { Label } from '@/components/ui/label'
import {
  Combobox,
  ComboboxInputGroup,
  ComboboxInput,
  ComboboxTrigger,
  ComboboxContent,
  ComboboxItem,
} from '@/components/ui/combobox'

interface FormComboboxFieldOption {
  value: string
  label: string
}

interface FormComboboxFieldProps {
  label: string
  id: string
  placeholder: string
  options: FormComboboxFieldOption[]
  value?: string
  onValueChange?: (value: string | null) => void
}

function FormComboboxField({ label, id, placeholder, options, value, onValueChange }: FormComboboxFieldProps) {
  const selected = options.find((option) => option.value === value) ?? null

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} className="text-left text-sm font-medium text-secondary">
        {label}
      </Label>
      <Combobox
        items={options}
        value={selected}
        onValueChange={(next) => onValueChange?.(next ? next.value : null)}
        itemToStringLabel={(item) => item.label}
      >
        <ComboboxInputGroup>
          <ComboboxInput id={id} placeholder={placeholder} />
          <ComboboxTrigger />
        </ComboboxInputGroup>
        <ComboboxContent>
          {(item: FormComboboxFieldOption) => (
            <ComboboxItem key={item.value} value={item}>
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxContent>
      </Combobox>
    </div>
  )
}

export default FormComboboxField
