import CustomCard from '@/components/custom/CustomCard'
import { Separator } from '@/components/ui/separator'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

// Shape mirrors the `badges` table in Supabase (key, label, emoji, description, task_threshold).
// `unlocked` isn't a column on that table — it should be derived by joining against
// `user_badges` for the current user. Defaults to true until that join is wired in.
export interface Achievement {
  key: string
  label: string
  emoji: string
  description?: string
  task_threshold?: number
  unlocked?: boolean
}

interface AchievementsCardProps {
  achievements: Achievement[]
  viewAllHref?: string
}

function AchievementsCard({ achievements, viewAllHref = '/achievements' }: AchievementsCardProps) {
  return (
    <CustomCard padding="">
      <div className="flex flex-1 items-center justify-between h-auto px-6">
        <p className="font-semibold text-md text-secondary">ACHIEVEMENTS</p>
        <Link to={viewAllHref} className="text-sm font-medium text-primary hover:underline">
          View all
        </Link>
      </div>

      <Separator />

      <div className="grid grid-cols-3 gap-y-4 px-6">
        {achievements.map(({ key, ...achievement }) => (
          <AchievementItem key={key} {...achievement} />
        ))}
      </div>
    </CustomCard>
  )
}

function AchievementItem({ label, emoji, unlocked = true }: Achievement) {
  return (
    <div className="flex flex-col items-center gap-1.5 text-center">
      <div
        className={cn(
          'flex items-center justify-center size-12 rounded-full bg-accent text-xl',
          !unlocked && 'opacity-40 grayscale'
        )}
      >
        <span role="img" aria-label={label}>{emoji}</span>
      </div>
      <span className="text-xxs text-muted-foreground leading-tight">{label}</span>
    </div>
  )
}

export default AchievementsCard