import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'
import CustomCard from '@/components/custom/Shared/CustomCard'
import { Button } from '@/components/ui/button'
import SetReminderDialog, { type ReminderDraft } from './SetReminderDialog'
import type { Reminder } from '@/hooks/useReminders'

type HomeRemindersProps = {
  reminders: Reminder[]
  onAddReminder?: (reminder: ReminderDraft) => void
}

function formatTime(time: string) {
  const [hoursText, minutesText] = time.split(':')
  const hours = Number(hoursText)

  if (Number.isNaN(hours)) {
    return time
  }

  const period = hours >= 12 ? 'PM' : 'AM'
  const displayHours = hours % 12 === 0 ? 12 : hours % 12

  return `${displayHours}:${minutesText} ${period}`
}

function HomeReminders({ reminders, onAddReminder }: HomeRemindersProps) {
  const navigate = useNavigate()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const activeReminders = reminders.filter((reminder) => reminder.enabled)

  function handleSaveReminder(reminder: ReminderDraft) {
    onAddReminder?.(reminder)
    setIsAddDialogOpen(false)
  }

  return (
    <CustomCard>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium uppercase text-neutral-600">
            Reminders
          </h2>

          <Button
            type="button"
            variant="link"
            className="h-auto p-0 text-xs"
            onClick={() => navigate('/reminders')}
          >
            Manage
          </Button>
        </div>

        <div className="flex flex-col">
          {activeReminders.length === 0 ? (
            <p className="py-2 text-sm text-muted-foreground">
              No active reminders
            </p>
          ) : (
            activeReminders.slice(0, 3).map((reminder) => (
              <div
                key={reminder.id}
                className="flex min-w-0 items-center gap-2 border-b py-2"
              >
                <span className="min-w-0 flex-1 break-words text-sm leading-5">
                  {reminder.label}
                </span>

                <span className="shrink-0 text-xs text-muted-foreground">
                  {formatTime(reminder.time)}
                </span>
              </div>
            ))
          )}
        </div>

        <Button type="button" onClick={() => setIsAddDialogOpen(true)}>
          <Plus />
          Add Reminder
        </Button>

        <SetReminderDialog
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          onSave={handleSaveReminder}
        />
      </div>
    </CustomCard>
  )
}

export default HomeReminders
