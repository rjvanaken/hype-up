import ActionDialog from '@/components/custom/Shared/ActionDialog'
import AppButton from '@/components/custom/Shared/AppButton'
import { formatTime } from './ReminderRow'
import type { Reminder } from '@/hooks/useReminders'

type DeleteReminderDialogProps = {
  reminder: Reminder | null
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

function DeleteReminderDialog({
  reminder,
  onOpenChange,
  onConfirm,
}: DeleteReminderDialogProps) {
  return (
    <ActionDialog
      open={reminder !== null}
      onOpenChange={onOpenChange}
      title="Delete reminder?"
      footer={
        <>
          <AppButton variant="alternate" onClick={() => onOpenChange(false)}>
            Cancel
          </AppButton>
          <AppButton variant="destructive" onClick={onConfirm}>
            Delete
          </AppButton>
        </>
      }
    >
      <p className="text-sm text-muted-foreground">
        Are you sure you want to delete
        {reminder ? ` the ${formatTime(reminder.time)} reminder?` : ' this reminder?'}{' '}
        This action cannot be undone.
      </p>
    </ActionDialog>
  )
}

export default DeleteReminderDialog
