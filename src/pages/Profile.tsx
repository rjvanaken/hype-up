import PageLayout from '@/components/custom/Shared/PageLayout'
import NextAchievementCard from '@/components/custom/Achievements/NextAchievementCard'
import FeedBox from '@/components/custom/Feed/FeedBox'
import { useAchievements } from '@/hooks/use-Achievements'
import { usePosts } from '@/hooks/usePosts'

function Profile() {
    const { achievements, tasksCompleted } = useAchievements()
    const posts = usePosts('own')

    return (
        <PageLayout maxWidth={1000}>
            <NextAchievementCard achievements={achievements} tasksCompleted={tasksCompleted} />
            <FeedBox title='YOUR POSTS' posts={posts} />
        </PageLayout>
    )
}

export default Profile
