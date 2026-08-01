import PageLayout from '@/components/custom/Shared/PageLayout'
import NextAchievementCard from '@/components/custom/Achievements/NextAchievementCard'
import FeedBox from '@/components/custom/Feed/FeedBox'
import { useAchievements } from '@/hooks/use-Achievements'
import { usePosts } from '@/hooks/usePosts'
import { useProfile } from '@/hooks/useProfile'

function Profile() {
    const { achievements, tasksCompleted } = useAchievements()
    const posts = usePosts('own')
    const profile = useProfile()

    return (
        <PageLayout maxWidth={1000}>
            <NextAchievementCard achievements={achievements} tasksCompleted={tasksCompleted} />
            <FeedBox title='YOUR POSTS' posts={posts} firstname={profile?.firstName ?? ''} lastname={profile?.lastName ?? ''} />
        </PageLayout>
    )
}

export default Profile
