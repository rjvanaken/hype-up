import { useParams } from 'react-router-dom'
import PageLayout from '@/components/custom/Shared/PageLayout'
import TwoColumnLayout from '@/components/custom/Shared/TwoColumnLayout'
import CustomCard from '@/components/custom/Shared/CustomCard'
import NextAchievementCard from '@/components/custom/Achievements/NextAchievementCard'
import FeedBox from '@/components/custom/Feed/FeedBox'
import ProfileBanner from '@/components/custom/Profile/ProfileBanner'
import { useAchievements } from '@/hooks/use-Achievements'
import { usePosts } from '@/hooks/usePosts'
import { useProfile } from '@/hooks/useProfile'

function Profile() {
    const { userId } = useParams<{ userId?: string }>()
    const { achievements, tasksCompleted } = useAchievements(userId)
    const posts = usePosts(userId ? 'user' : 'own', userId)
    const profile = useProfile(userId)

    if (!profile) {
    // decide what renders while data hasn't loaded yet — a spinner, null, a skeleton, etc.
    return null
    }

    const {firstName, lastName, initials, avatarColor, location, bio, isOwnProfile} = profile

    return (
        <>
            <div>
                <PageLayout maxWidth={1000}>
                    <TwoColumnLayout
                        main={
                            <>
                                <ProfileBanner
                                    firstname={firstName}
                                    lastname={lastName}
                                    avatarColor={avatarColor}
                                    location={location}
                                    bio={bio}
                                    initials={initials}
                                    achievements={achievements}
                                    tasksCompleted={tasksCompleted}
                                ></ProfileBanner>
                                <FeedBox title={isOwnProfile ? 'YOUR POSTS' : `${firstName}'s POSTS`} posts={posts}></FeedBox>
                            </>
                        }
                        rightColumn={isOwnProfile ? (
                            <>
                                <NextAchievementCard achievements={achievements} tasksCompleted={tasksCompleted} />
                                <CustomCard><p>ProfileDetails</p></CustomCard> {/*placeholder*/}
                            </>
                        ) : undefined}>
                    </TwoColumnLayout>
                </PageLayout>
            </div>
        </>
    )
}

export default Profile
