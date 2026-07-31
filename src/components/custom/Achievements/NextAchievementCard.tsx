import CustomCard from '@/components/custom/CustomCard'
import type { Achievement } from '@/components/custom/Achievements/AchievementsCard'

interface NextAchievementCardProps {
  achievements: Achievement[]
  tasksCompleted: number
}

function NextAchievementCard({ achievements, tasksCompleted }: NextAchievementCardProps) {
  const next = achievements.find((achievement) => !achievement.unlocked)

  return (
    <CustomCard>
      <p className="font-semibold text-md text-secondary">NEXT ACHIEVEMENT</p>

      {next ? (
        <NextAchievementProgress achievement={next} tasksCompleted={tasksCompleted} />
      ) : (
        <p className="mt-3 text-sm font-semibold text-primary">All achievements unlocked!</p>
      )}
    </CustomCard>
  )
}

function NextAchievementProgress({ achievement, tasksCompleted }: { achievement: Achievement; tasksCompleted: number }) {
  const threshold = achievement.task_threshold ?? 0
  const tasksToGo = Math.max(threshold - tasksCompleted, 0)
  const pct = threshold > 0 ? Math.min((tasksCompleted / threshold) * 100, 100) : 0

  return (
    <div className="mt-3">
      <p className="flex items-center gap-2 text-sm font-medium text-secondary">
        <span role="img" aria-label={achievement.label}>{achievement.emoji}</span>
        {tasksToGo} {tasksToGo === 1 ? 'task' : 'tasks'} until "{achievement.label}"
      </p>

      <div className="mt-2 h-2 w-full rounded-full bg-accent">
        <div className="h-2 rounded-full bg-primary" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

export default NextAchievementCard
