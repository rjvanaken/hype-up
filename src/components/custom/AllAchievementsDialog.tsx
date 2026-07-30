// Modal opened from AchievementsCard's "View all" button. Shows every badge in
// a grid and, on click, stacks AchievementDetailDialog on top for that badge.
import { useState } from 'react'
import { Dialog, DialogPortal, DialogOverlay } from '@/components/ui/dialog'
import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'
import { Separator } from '@/components/ui/separator'
import { XIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Achievement } from '@/components/custom/AchievementsCard'
import AchievementDetailDialog from '@/components/custom/AchievementDetailDialog'

interface AllAchievementsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  achievements: Achievement[]
  tasksCompleted?: number
  pinnedBadgeKey?: string | null
  onTogglePin?: (key: string) => void
}

function AllAchievementsDialog({
  open,
  onOpenChange,
  achievements,
  tasksCompleted = 0,
  pinnedBadgeKey,
  onTogglePin
}: AllAchievementsDialogProps) {
  const [selected, setSelected] = useState<Achievement | null>(null)

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogPortal>
          <DialogOverlay />
          <DialogPrimitive.Popup
            className={cn(
              'fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
              'w-full max-w-[420px] rounded-xl border border-neutral-300 bg-popover shadow-md outline-none p-6',
              'data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0'
            )}
          >
            <div className="flex items-start justify-between mb-4">
              <p className="text-lg font-bold text-secondary">All Achievements</p>
              <DialogPrimitive.Close className="cursor-pointer">
                <XIcon className="size-5" />
                <span className="sr-only">Close</span>
              </DialogPrimitive.Close>
            </div>

            <div className="text-center mb-4">
              <p className="text-3xl font-bold text-secondary">{tasksCompleted}</p>
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                Tasks completed all-time
              </p>
            </div>

            <Separator className="mb-5" />

            <div className="grid grid-cols-3 gap-x-4 gap-y-5">
              {achievements.map(({ key, ...achievement }) => (
                <AchievementGridItem key={key} achievement={{ key, ...achievement }} onSelect={setSelected} />
              ))}
            </div>
          </DialogPrimitive.Popup>
        </DialogPortal>
      </Dialog>

      <AchievementDetailDialog
        open={selected !== null}
        onOpenChange={(next) => !next && setSelected(null)}
        achievement={selected}
        tasksCompleted={tasksCompleted}
        pinnedBadgeKey={pinnedBadgeKey}
        onTogglePin={onTogglePin}
      />
    </>
  )
}

function AchievementGridItem({ achievement, onSelect }: { achievement: Achievement; onSelect: (achievement: Achievement) => void }) {
  const { label, emoji, unlocked = true } = achievement
  return (
    <button
      type="button"
      onClick={() => onSelect(achievement)}
      className="flex flex-col items-center gap-2 text-center cursor-pointer"
    >
      <div
        className={cn(
          'flex items-center justify-center size-14 rounded-2xl bg-accent text-2xl',
          !unlocked && 'opacity-40'
        )}
      >
        <span role="img" aria-label={label}>{emoji}</span>
      </div>
      <span className="text-xs font-medium text-primary">{label}</span>
    </button>
  )
}

export default AllAchievementsDialog
