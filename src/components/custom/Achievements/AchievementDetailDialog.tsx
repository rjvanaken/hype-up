import { useRef } from 'react'
import { Dialog, DialogPortal, DialogOverlay } from '@/components/ui/dialog'
import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarGroup } from '@/components/ui/avatar'
import { Pin, XIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Achievement } from '@/components/custom/Achievements/AchievementsCard'
import { useBadgeFriends } from '@/hooks/useBadgeFriends'

interface AchievementDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  achievement: Achievement | null
  tasksCompleted?: number
  pinnedBadgeKey?: string | null
  onTogglePin?: (key: string) => void
}

function AchievementDetailDialog({
  open,
  onOpenChange,
  achievement,
  tasksCompleted = 0,
  pinnedBadgeKey,
  onTogglePin
}: AchievementDetailDialogProps) {
  const lastAchievement = useRef<Achievement | null>(null)
  if (achievement) lastAchievement.current = achievement
  const shown = achievement ?? lastAchievement.current

  const friends = useBadgeFriends(shown?.key ?? '', open && !!shown)

  const unlocked = shown?.unlocked ?? true
  const isPinned = !!shown && pinnedBadgeKey === shown.key
  const tasksToGo = shown?.task_threshold !== undefined ? Math.max(shown.task_threshold - tasksCompleted, 0) : undefined

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Popup
          className={cn(
            'fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
            'w-full max-w-[380px] rounded-xl border border-neutral-300 bg-popover shadow-md outline-none p-6',
            'data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0'
          )}
        >
          {shown && (
            <>
              <div className="flex justify-end mb-2">
                <DialogPrimitive.Close className="cursor-pointer">
                  <XIcon className="size-5" />
                  <span className="sr-only">Close</span>
                </DialogPrimitive.Close>
              </div>

              <div className="flex flex-col items-center gap-3 text-center">
                <div
                  className={cn(
                    'flex items-center justify-center size-20 rounded-2xl bg-accent text-4xl',
                    !unlocked && 'opacity-40'
                  )}
                >
                  <span role="img" aria-label={shown.label}>{shown.emoji}</span>
                </div>

                <p className="text-xl font-bold text-secondary">{shown.label}</p>

                {shown.description && (
                  <p className="text-sm text-muted-foreground">{shown.description}</p>
                )}

                <div className="w-full rounded-full bg-green-600/10 py-2 text-sm font-semibold text-green-700">
                  {unlocked
                    ? 'Unlocked'
                    : tasksToGo !== undefined
                      ? `Locked · ${tasksToGo} ${tasksToGo === 1 ? 'task' : 'tasks'} to go`
                      : 'Locked'}
                </div>

                {unlocked && onTogglePin && (
                  <button
                    type="button"
                    onClick={() => onTogglePin(shown.key)}
                    className={cn(
                      'flex items-center gap-1.5 text-sm font-medium cursor-pointer',
                      isPinned ? 'text-primary' : 'text-muted-foreground'
                    )}
                  >
                    <Pin className={cn('size-4', isPinned && 'fill-primary')} />
                    {isPinned ? 'Pinned' : 'Pin to profile'}
                  </button>
                )}
              </div>

              <Separator className="my-5" />

              <div className="flex items-center gap-3">
                <AvatarGroup>
                  {friends.slice(0, 3).map((friend) => (
                    <Avatar key={friend.id} size="sm">
                      <AvatarFallback
                        className="font-medium text-primary-foreground"
                        style={friend.avatarColor ? { backgroundColor: friend.avatarColor } : undefined}
                      >
                        {friend.initials}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </AvatarGroup>
                <span className="text-sm text-muted-foreground">
                  {friends.length} {friends.length === 1 ? 'friend has' : 'friends have'} this badge
                </span>
              </div>
            </>
          )}
        </DialogPrimitive.Popup>
      </DialogPortal>
    </Dialog>
  )
}

export default AchievementDetailDialog
