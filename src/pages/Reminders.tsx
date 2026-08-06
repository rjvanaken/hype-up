import { useState } from 'react'
import { Plus } from 'lucide-react'
import CustomCard from '@/components/custom/Shared/CustomCard'
import PageLayout from '@/components/custom/Shared/PageLayout'
import TwoColumnLayout from '@/components/custom/Shared/TwoColumnLayout'
import AppButton from '@/components/custom/Shared/AppButton'
import ReminderRow from '@/components/custom/Reminders/ReminderRow'
import DeleteReminderDialog from '@/components/custom/Reminders/DeleteReminderDialog'
import SetReminderDialog, {
  type ReminderDraft,
} from '@/components/custom/Reminders/SetReminderDialog'
import { useReminders, type Reminder } from '@/hooks/useReminders'

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
            <CustomCard>
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <h1 className="text-xl font-bold">Reminders</h1>
                  <p className="text-sm text-muted-foreground">
                    Schedule nudges at times that work for you
                  </p>
                </div>

                <AppButton
                  className="flex-none"
                  icon={Plus}
                  onClick={() => setIsAddDialogOpen(true)}
                >
                  Add Reminder
                </AppButton>
              </div>
            </CustomCard>

            <CustomCard>
              <p className="mb-3 text-xs font-medium uppercase text-neutral-600">
                All Reminders
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

      <DeleteReminderDialog
        reminder={reminderToDelete}
        onOpenChange={handleDeleteDialogOpenChange}
        onConfirm={handleConfirmDelete}
      />
    </PageLayout>
  )
}

export default Reminders
