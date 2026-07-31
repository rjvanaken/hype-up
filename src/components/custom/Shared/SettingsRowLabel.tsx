import { Label } from '@/components/ui/label'

function SettingsRowLabel({ id, label, subtitle }: { id: string; label: React.ReactNode; subtitle?: string }) {
  return (
    <div>
      <Label htmlFor={id} className="text-sm font-semibold text-secondary">
        {label}
      </Label>
      {subtitle && <p className="text-xs font-normal text-muted-foreground">{subtitle}</p>}
    </div>
  )
}

export default SettingsRowLabel