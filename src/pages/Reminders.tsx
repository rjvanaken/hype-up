import { useState, type ChangeEvent } from 'react'
import { ChevronDown, ChevronUp, Plus } from 'lucide-react'
import CustomCard from '@/components/custom/Shared/CustomCard'
import PageLayout from '@/components/custom/Shared/PageLayout'
import TwoColumnLayout from '@/components/custom/Shared/TwoColumnLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import SetReminderDialog, {
  type ReminderDraft,
} from '@/components/custom/Reminders/SetReminderDialog'
import { useReminders, type Reminder } from '@/hooks/useReminders'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const

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

function formatDays(days: boolean[]) {
  const selectedDays = days
    .map((isSelected, index) => (isSelected ? index : -1))
    .filter((index) => index !== -1)

  if (selectedDays.length === 7) {
    return 'Daily'
  }

  if (
    selectedDays.length === 5 &&
    [1, 2, 3, 4, 5].every((day) => selectedDays.includes(day))
  ) {
    return 'Weekdays'
  }

  if (
    selectedDays.length === 2 &&
    [0, 6].every((day) => selectedDays.includes(day))
  ) {
    return 'Weekends'
  }

  return selectedDays.map((index) => DAYS[index]).join(', ')
}

type ReminderRowProps = {
  reminder: Reminder
  onToggleEnabled: (id: string) => void
  onUpdate: (
    id: string,
    updates: Partial<{ label: string; time: string; days: boolean[] }>
  ) => void
  onDeleteRequest: (reminder: Reminder) => void
}

function ReminderRow({
  reminder,
  onToggleEnabled,
  onUpdate,
  onDeleteRequest,
}: ReminderRowProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [editLabel, setEditLabel] = useState(reminder.label)
  const [editTime, setEditTime] = useState(reminder.time)
  const [editDays, setEditDays] = useState(reminder.days)

  function handleExpandToggle() {
    if (!isExpanded) {
      setEditLabel(reminder.label)
      setEditTime(reminder.time)
      setEditDays(reminder.days)
    }

    setIsExpanded((current) => !current)
  }

  function handleTimeChange(event: ChangeEvent<HTMLInputElement>) {
    const nextTime = event.target.value
    setEditTime(nextTime)
    onUpdate(reminder.id, { time: nextTime })
  }

  function handleDayToggle(index: number) {
    const nextDays = editDays.map((isSelected, dayIndex) =>
      dayIndex === index ? !isSelected : isSelected
    )
    setEditDays(nextDays)
    onUpdate(reminder.id, { days: nextDays })
  }

  function handleLabelBlur() {
    const trimmedLabel = editLabel.trim()

    if (!trimmedLabel || trimmedLabel === reminder.label) {
      setEditLabel(reminder.label)
      return
    }

    onUpdate(reminder.id, { label: trimmedLabel })
  }

  return (
    <div className="border-b last:border-b-0">
      <div className="flex items-center gap-3 py-3">
        <Switch
          checked={reminder.enabled}
          onCheckedChange={() => onToggleEnabled(reminder.id)}
          aria-label={`Toggle ${reminder.label}`}
        />

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold">
            {formatTime(reminder.time)}
          </p>
          <p className="text-xs text-muted-foreground">
            {formatDays(reminder.days)}
          </p>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label={isExpanded ? 'Collapse reminder' : 'Expand reminder'}
          onClick={handleExpandToggle}
        >
          {isExpanded ? (
            <ChevronUp className="size-4" />
          ) : (
            <ChevronDown className="size-4" />
          )}
        </Button>
      </div>

      {isExpanded && (
        <div className="flex flex-col gap-4 pb-4">
          <div>
            <Label htmlFor={`reminder-time-${reminder.id}`}>Time</Label>

            <Input
              id={`reminder-time-${reminder.id}`}
              type="time"
              value={editTime}
              className="mt-2"
              onChange={handleTimeChange}
            />
          </div>

          <div>
            <Label id={`reminder-days-label-${reminder.id}`}>
              Repeats on
            </Label>

            <div
              className="mt-2 flex gap-1.5"
              role="group"
              aria-labelledby={`reminder-days-label-${reminder.id}`}
            >
              {DAYS.map((day, index) => (
                <Button
                  key={day}
                  type="button"
                  variant={editDays[index] ? 'default' : 'outline'}
                  size="icon-sm"
                  aria-pressed={editDays[index]}
                  aria-label={day}
                  onClick={() => handleDayToggle(index)}
                >
                  {day[0]}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor={`reminder-message-${reminder.id}`}>
              Message
            </Label>

            <Textarea
              id={`reminder-message-${reminder.id}`}
              value={editLabel}
              maxLength={200}
              className="mt-2"
              onChange={(event) => setEditLabel(event.target.value)}
              onBlur={handleLabelBlur}
            />
          </div>

          <Button
            type="button"
            variant="link"
            className="h-auto justify-start p-0 text-sm font-semibold text-destructive"
            onClick={() => onDeleteRequest(reminder)}
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  )
}

function Reminders() {
  const { reminders, addReminder, updateReminder, toggleReminder, deleteReminder } =
    useReminders()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [reminderToDelete, setReminderToDelete] = useState<Reminder | null>(
    null
  )

  function handleSaveReminder(reminder: ReminderDraft) {
    addReminder(reminder.label, reminder.time, reminder.days)
    setIsAddDialogOpen(false)
  }

  function handleDeleteDialogOpenChange(open: boolean) {
    if (!open) {
      setReminderToDelete(null)
    }
  }

  function handleConfirmDelete() {
    if (!reminderToDelete) {
      return
    }

    deleteReminder(reminderToDelete.id)
    setReminderToDelete(null)
  }

  return (
    <PageLayout maxWidth={1000}>
      <TwoColumnLayout
        main={
          <>
            <CustomCard className="mb-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl font-bold">Reminders</h1>
                  <p className="text-sm text-muted-foreground">
                    Schedule nudges at times that work for you
                  </p>
                </div>

                <Button type="button" onClick={() => setIsAddDialogOpen(true)}>
                  <Plus />
                  Add Reminder
                </Button>
              </div>
            </CustomCard>

            <CustomCard>
              <p className="mb-3 text-xs font-medium uppercase text-neutral-600">
                Today
              </p>

              {reminders.length === 0 ? (
                <p className="py-2 text-sm text-muted-foreground">
                  No reminders yet.
                </p>
              ) : (
                <div className="flex flex-col">
                  {reminders.map((reminder) => (
                    <ReminderRow
                      key={reminder.id}
                      reminder={reminder}
                      onToggleEnabled={toggleReminder}
                      onUpdate={updateReminder}
                      onDeleteRequest={setReminderToDelete}
                    />
                  ))}
                </div>
              )}
            </CustomCard>
          </>
        }
      />

      <SetReminderDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSave={handleSaveReminder}
      />

      <AlertDialog
        open={reminderToDelete !== null}
        onOpenChange={handleDeleteDialogOpenChange}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete reminder?</AlertDialogTitle>

            <AlertDialogDescription>
              Are you sure you want to delete
              {reminderToDelete
                ? ` the ${formatTime(reminderToDelete.time)} reminder?`
                : ' this reminder?'}{' '}
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleConfirmDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PageLayout>
  )
}

export default Reminders
