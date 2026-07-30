// Profile page header: gradient banner + avatar, name, and an achievements
// preview that reuses the same "View all" dialog flow as the Home page.
import { useState } from 'react'
import { Pencil } from 'lucide-react'
import CustomCard from '@/components/custom/CustomCard'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import AllAchievementsDialog from '@/components/custom/AllAchievementsDialog'
import { AchievementItem, type Achievement } from '@/components/custom/AchievementsCard'
import { usePinnedBadge } from '@/hooks/usePinnedBadge'

interface ProfileBannerProps {
  name: string
  initials: string
  avatarColor: string | null
  achievements: Achievement[]
  tasksCompleted: number
}

function ProfileBanner({ name, initials, avatarColor, achievements, tasksCompleted }: ProfileBannerProps) {
  const [showAll, setShowAll] = useState(false)
  const { pinnedBadgeKey, setPinned } = usePinnedBadge()
  const pinnedAchievement = achievements.find((achievement) => achievement.key === pinnedBadgeKey)

  return (
    <CustomCard padding="">
      <div className="relative h-24 rounded-t-xl bg-gradient-to-br from-primary to-primary/70">
        <button
          type="button"
          disabled
          className="absolute top-3 right-3 flex items-center justify-center size-8 rounded-full bg-white/80 text-secondary cursor-not-allowed"
        >
          <Pencil className="size-4" />
        </button>
      </div>

      <div className="px-6">
        <Avatar size="lg" className="-mt-8 size-16 ring-4 ring-background">
          <AvatarFallback
            className="text-lg font-semibold text-primary-foreground"
            style={avatarColor ? { backgroundColor: avatarColor } : undefined}
          >
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="mt-2 flex items-center gap-2">
          <p className="text-lg font-semibold text-secondary">{name}</p>
          {pinnedAchievement && (
            <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-xs font-medium text-primary">
              <span role="img" aria-label={pinnedAchievement.label}>{pinnedAchievement.emoji}</span>
              {pinnedAchievement.label}
            </span>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between px-6">
        <p className="font-semibold text-md text-secondary">ACHIEVEMENTS</p>
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="text-sm font-medium text-primary hover:underline cursor-pointer"
        >
          See all
        </button>
      </div>

      <Separator className="mt-2" />

      <div className="grid grid-cols-3 gap-y-4 px-6 py-4">
        {achievements.slice(0, 3).map(({ key, ...achievement }) => (
          <AchievementItem key={key} {...achievement} />
        ))}
      </div>

      <Separator />

      <div className="py-4 text-center">
        <p className="text-3xl font-bold text-secondary">{tasksCompleted}</p>
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">
          Tasks completed
        </p>
      </div>

      <AllAchievementsDialog
        open={showAll}
        onOpenChange={setShowAll}
        achievements={achievements}
        tasksCompleted={tasksCompleted}
        pinnedBadgeKey={pinnedBadgeKey}
        onTogglePin={(key) => setPinned(pinnedBadgeKey === key ? null : key)}
      />
    </CustomCard>
  )
}

export default ProfileBanner
