// Profile page: banner + achievements preview, posts feed, and the
// connections/streak/next-achievement sidebar, assembled from custom/* cards.
import PageLayout from '@/components/custom/PageLayout'
import TwoColumnLayout from '@/components/custom/TwoColumnLayout'
import ProfileBanner from '@/components/custom/ProfileBanner'
import PostsCard from '@/components/custom/PostsCard'
import ConnectionsCard from '@/components/custom/ConnectionsCard'
import StreakCard from '@/components/custom/StreakCard'
import NextAchievementCard from '@/components/custom/NextAchievementCard'
import { useProfile } from '@/hooks/useProfile'
import { useAchievements } from '@/hooks/use-Achievements'
import { useConnections } from '@/hooks/useConnections'

function Profile() {
    const profile = useProfile()
    const { achievements, tasksCompleted } = useAchievements()
    const { followers, following } = useConnections()

    return (
        <PageLayout maxWidth={1000}>
            <TwoColumnLayout
                main={
                    <>
                        <ProfileBanner
                            name={profile?.name ?? ''}
                            initials={profile?.initials ?? '?'}
                            avatarColor={profile?.avatarColor ?? null}
                            achievements={achievements}
                            tasksCompleted={tasksCompleted}
                        />
                        <PostsCard />
                    </>
                }
                rightColumn={
                    <>
                        <ConnectionsCard followers={followers} following={following} />
                        <StreakCard streakCount={profile?.streakCount ?? 0} />
                        <NextAchievementCard achievements={achievements} tasksCompleted={tasksCompleted} />
                    </>
                }
            />
        </PageLayout>
    )
}

export default Profile
