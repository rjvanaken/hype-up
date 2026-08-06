import { useState } from 'react'
import ReminderRow from '@/components/custom/Reminders/ReminderRow'
import DeleteReminderDialog from '@/components/custom/Reminders/DeleteReminderDialog'
import { useReminders, type Reminder } from '@/hooks/useReminders'

function RemindersSettingsContent() {
  const { reminders, updateReminder, toggleReminder, deleteReminder } =
    useReminders()
  const [reminderToDelete, setReminderToDelete] = useState<Reminder | null>(
    null
  )

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

  if (reminders.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No reminders yet.
      </p>
    )
  }

  return (
    <>
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

      <DeleteReminderDialog
        reminder={reminderToDelete}
        onOpenChange={handleDeleteDialogOpenChange}
        onConfirm={handleConfirmDelete}
      />
    </>
  )
}

export default RemindersSettingsContent
