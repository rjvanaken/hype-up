import { Switch } from '@/components/ui/switch'
import SettingsRowLabel from '@/components/custom/Shared/SettingsRowLabel'

function SettingsToggleRow({
  id,
  label,
  subtitle,
  checked,
  onCheckedChange,
}: {
  id: string
  label: string
  subtitle?: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <SettingsRowLabel id={id} label={label} subtitle={subtitle} />
      <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  )
}

export default SettingsToggleRow