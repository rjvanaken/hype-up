// Profile page's Streak card. Shows profiles.streak_count as text only —
// there's no per-day activity table to back a real weekly calendar grid.
import CustomCard from '@/components/custom/CustomCard'

interface StreakCardProps {
  streakCount: number
}

function StreakCard({ streakCount }: StreakCardProps) {
  return (
    <CustomCard>
      <div className="flex items-center justify-between">
        <p className="font-semibold text-md text-secondary">STREAK</p>
        <button type="button" disabled className="text-sm font-medium text-muted-foreground cursor-not-allowed">
          See all
        </button>
      </div>

      <p className="mt-3 text-sm font-semibold text-primary">
        {streakCount > 0 ? (
          <>
            <span role="img" aria-label="fire">🔥</span> {streakCount}-week streak
          </>
        ) : (
          'Start a streak this week'
        )}
      </p>
    </CustomCard>
  )
}

export default StreakCard
