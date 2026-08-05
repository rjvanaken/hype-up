import { useEffect, useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { Todo } from './HomeTodos'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const

export type ReminderDraft = {
  label: string
  time: string
  days: boolean[]
}

type SetReminderDialogProps = {
  todo: Todo | null
  onOpenChange: (open: boolean) => void
  onSave: (todo: Todo, reminder: ReminderDraft) => void
}

function SetReminderDialog({
  todo,
  onOpenChange,
  onSave,
}: SetReminderDialogProps) {
  const [label, setLabel] = useState('')
  const [time, setTime] = useState('')
  const [selectedDays, setSelectedDays] = useState<boolean[]>(
    Array(7).fill(false)
  )

  useEffect(() => {
    if (todo) {
      setLabel(todo.text)
      setTime('')
      setSelectedDays(Array(7).fill(false))
    }
  }, [todo])

  function toggleDay(index: number) {
    setSelectedDays((currentDays) =>
      currentDays.map((isSelected, dayIndex) =>
        dayIndex === index ? !isSelected : isSelected
      )
    )
  }

  const canSave =
    label.trim().length > 0 && time.length > 0 && selectedDays.some(Boolean)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!todo || !canSave) {
      return
    }

    onSave(todo, { label: label.trim(), time, days: selectedDays })
  }

  return (
    <Dialog open={todo !== null} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Set Reminder
            </DialogTitle>

            <DialogDescription className="sr-only">
              Set a repeating reminder for this todo.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 py-5">
            <div>
              <Label htmlFor="reminder-label">Reminder</Label>

              <Input
                id="reminder-label"
                value={label}
                maxLength={200}
                className="mt-2"
                autoFocus
                onChange={(event) => setLabel(event.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="reminder-time">Time</Label>

              <Input
                id="reminder-time"
                type="time"
                value={time}
                className="mt-2"
                onChange={(event) => setTime(event.target.value)}
              />
            </div>

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
          </div>

          <DialogFooter className="grid grid-cols-2 gap-2 sm:grid sm:grid-cols-2">
            <Button
              type="button"
              variant="outline"
              className="font-semibold"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="font-semibold"
              disabled={!canSave}
            >
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default SetReminderDialog
