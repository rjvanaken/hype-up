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
    <AlertDialog open={reminder !== null} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete reminder?</AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to delete
            {reminder
              ? ` the ${formatTime(reminder.time)} reminder?`
              : ' this reminder?'}{' '}
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={onConfirm}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteReminderDialog
