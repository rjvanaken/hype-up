import PageLayout from '@/components/custom/PageLayout'
import NextAchievementCard from '@/components/custom/Achievements/NextAchievementCard'
import { useAchievements } from '@/hooks/use-Achievements'

function Profile() {
    const { achievements, tasksCompleted } = useAchievements()

    return (
        <PageLayout maxWidth={1000}>
            <NextAchievementCard achievements={achievements} tasksCompleted={tasksCompleted} />
        </PageLayout>
    )
}

export default Profile
