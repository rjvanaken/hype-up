import { useState } from 'react'
import CustomCard from '@/components/custom/Shared/CustomCard'
import AppButton from '@/components/custom/Shared/AppButton'
import { cn } from '@/lib/utils'

// Shape mirrors the `badges` table in Supabase (key, label, emoji, description, task_threshold).
// `unlocked` isn't a column on that table — it's derived in useAchievements by joining
// against `user_badges` for the current user.
export interface StreakProps {
//   activityDays: ActivityDays[]
    streak : number
    isActive : boolean
    isToday : boolean
}

const WEEKDAY_LETTERS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'] // Date.getDay(): 0=Sun ... 6=Sat

function getLast28Days(): Date[] {
  const today = new Date()
  today.setHours(0, 0, 0, 0) // normalize so time-of-day doesn't affect comparisons

  return Array.from({ length: 28 }, (_, i) => {
    const date = new Date(today)
    date.setDate(today.getDate() - (27 - i))
    return date
  })
}

const days = getLast28Days()
const headerLabels = days.slice(0, 7).map((date) => WEEKDAY_LETTERS[date.getDay()])



function StreakCard({ 
    streak
 }: StreakProps) {
     const [showAll, setShowAll] = useState(false)
     const days = getLast28Days() // [{ date, isActive, isToday }, ...] oldest → newest

  return (
    <CustomCard padding="flex flex-col gap-1">
      <div className="flex flex-1 items-center justify-between h-auto px-6">
        <p className="font-semibold text-sm text-neutral-600">STREAK</p>
        <AppButton
          variant="link"
          onClick={() => setShowAll(true)}
        >
          See all
        </AppButton>
      </div>

      <p className='font-bold font-primary'><span>🔥 </span>{streak}-week streak</p>

<div className="grid grid-cols-7 gap-1.5">
    {headerLabels.map((letter, i) => (
    <span key={i} className="text-center text-xs font-medium text-neutral-500">
      {letter}
    </span>
  ))}
  {days.map((day) => (
    <div
      key={day.date.toISOString()}
      className={cn(
        'aspect-square rounded-sm',
        day.isActive ? 'bg-primary' : 'bg-muted',
        day.isToday && 'ring-2 ring-cool-brand-700'
      )}
    />
  ))}
</div>

      </CustomCard>
)
}

export default StreakCard