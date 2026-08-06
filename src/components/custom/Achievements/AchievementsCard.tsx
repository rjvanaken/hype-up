import { useState } from 'react'
import CustomCard from '@/components/custom/Shared/CustomCard'
import AllAchievementsDialog from '@/components/custom/Achievements/AllAchievementsDialog'
import { cn } from '@/lib/utils'

// Shape mirrors the `badges` table in Supabase (key, label, emoji, description, task_threshold).
// `unlocked` isn't a column on that table — it's derived in useAchievements by joining
// against `user_badges` for the current user.
export interface Achievement {
  key: string
  label: string
  emoji: string
  description?: string
  task_threshold?: number
  unlocked?: boolean
  earnedAt?: string | null
}

interface AchievementsCardProps {
  achievements: Achievement[]
  tasksCompleted?: number
}

function AchievementsCard({ achievements, tasksCompleted = 0 }: AchievementsCardProps) {
  const [showAll, setShowAll] = useState(false)

  return (
    <CustomCard padding="">
      <div className="flex flex-1 items-center justify-between h-auto px-6">
        <p className="font-semibold text-md text-secondary">ACHIEVEMENTS</p>
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="text-sm font-medium text-primary hover:underline cursor-pointer"
        >
          View all
        </button>
      </div>

      <div className="grid grid-cols-3 gap-y-4 px-6">
        {achievements.slice(0, 6).map(({ key, ...achievement }) => (
          <AchievementItem key={key} {...achievement} />
        ))}
      </div>

      <AllAchievementsDialog
        open={showAll}
        onOpenChange={setShowAll}
        achievements={achievements}
        tasksCompleted={tasksCompleted}
      />
    </CustomCard>
  )
}

export function AchievementItem({ label, emoji, unlocked = true }: Achievement) {
  return (
    <div className="flex flex-col items-center gap-1.5 text-center">
      <div
        className={cn(
          'flex items-center justify-center size-12 rounded-full bg-accent text-xl',
          !unlocked && 'opacity-40'
        )}
      >
        <span role="img" aria-label={label}>{emoji}</span>
      </div>
      <span className="text-xxs text-muted-foreground leading-tight">{label}</span>
    </div>
  )
}

export default AchievementsCard