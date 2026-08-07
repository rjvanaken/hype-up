import { useState } from 'react'
import CustomCard from '@/components/custom/Shared/CustomCard'
import AppButton from '@/components/custom/Shared/AppButton'
import { cn } from '@/lib/utils'
import { useStreak, toLocalDateKey } from '@/hooks/useStreak'

export interface StreakProps {
    streak: number
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

function StreakCard({ streak }: StreakProps) {
    const [showAll, setShowAll] = useState(false)
    const { activityDates } = useStreak()

    const days = getLast28Days().map((date, index, all) => ({
        date,
        isActive: activityDates.has(toLocalDateKey(date)),
        isToday: index === all.length - 1,
    }))

    const headerLabels = days.slice(0, 7).map(({ date }) => WEEKDAY_LETTERS[date.getDay()])

    return (
        <CustomCard>
            <div className='flex flex-col gap-1'>

            <div className="flex flex-1 items-center justify-between h-auto">
                <p className="font-semibold text-sm text-neutral-600">STREAK</p>
                <AppButton
                    variant="link"
                    onClick={() => setShowAll(true)}
                >
                    See all
                </AppButton>
            </div>

            <p className="font-bold text-primary"><span>🔥 </span>{streak}-week streak</p>

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
                            day.isActive ? 'bg-primary' : 'bg-primary/8',
                            day.isToday && 'ring-1 ring-cool-brand-800 border-0'
                        )}
                    />
                ))}
            </div>
            </div>
        </CustomCard>
    )
}

export default StreakCard
