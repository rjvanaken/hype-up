import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import ActionDialog from '@/components/custom/Shared/ActionDialog'
import FormField from '@/components/custom/Shared/FormField'
import AppButton from '@/components/custom/Shared/AppButton'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const

export type ReminderDraft = {
  label: string
  time: string
  days: boolean[]
}

type SetReminderDialogProps = {
  open: boolean
  initialLabel?: string
  onOpenChange: (open: boolean) => void
  onSave: (reminder: ReminderDraft) => void
}

function SetReminderDialog({
  open,
  initialLabel,
  onOpenChange,
  onSave,
}: SetReminderDialogProps) {
  const [label, setLabel] = useState('')
  const [time, setTime] = useState('')
  const [selectedDays, setSelectedDays] = useState<boolean[]>(
    Array(7).fill(false)
  )

  useEffect(() => {
    if (open) {
      setLabel(initialLabel ?? '')
      setTime('')
      setSelectedDays(Array(7).fill(false))
    }
  }, [open, initialLabel])

  function toggleDay(index: number) {
    setSelectedDays((currentDays) =>
      currentDays.map((isSelected, dayIndex) =>
        dayIndex === index ? !isSelected : isSelected
      )
    )
  }

  const canSave =
    label.trim().length > 0 && time.length > 0 && selectedDays.some(Boolean)

  function handleSubmit() {
    if (!canSave) {
      return
    }

    onSave({ label: label.trim(), time, days: selectedDays })
  }

  return (
    <ActionDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Set Reminder"
      footer={
        <>
          <AppButton variant="alternate" onClick={() => onOpenChange(false)}>
            Cancel
          </AppButton>
          <AppButton variant="default" disabled={!canSave} onClick={handleSubmit}>
            Save
          </AppButton>
        </>
      }
    >
      <FormField
        className="border-1 placeholder:text-sm"
        id="reminder-label"
        label="Reminder"
        value={label}
        maxLength={200}
        autoFocus
        onChange={(event) => setLabel(event.target.value)}
      />

      <FormField
        className="border-1 placeholder:text-sm"
        id="reminder-time"
        type="time"
        label="Time"
        value={time}
        onChange={(event) => setTime(event.target.value)}
      />

      <div>
        <Label id="reminder-days-label">Repeat on</Label>

        <div
          className="mt-2 flex gap-1.5"
          role="group"
          aria-labelledby="reminder-days-label"
        >
          {DAYS.map((day, index) => (
            <Button
              key={day}
              type="button"
              variant={selectedDays[index] ? 'default' : 'outline'}
              size="icon-sm"
              aria-pressed={selectedDays[index]}
              aria-label={day}
              onClick={() => toggleDay(index)}
            >
              {day[0]}
            </Button>
          ))}
        </div>
      </div>
    </ActionDialog>
  )
}

export default SetReminderDialog
