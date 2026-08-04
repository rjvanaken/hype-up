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
    const { achievements, tasksCompleted } = useAchievements()
    const posts = usePosts('own')
    const profile = useProfile()
    if (!profile) {
    // decide what renders while data hasn't loaded yet — a spinner, null, a skeleton, etc.
    return null
    }

    const {firstName, lastName, initials, avatarColor, streakCount, location, bio} = profile

    return (
        <>
            <div>
                <PageLayout maxWidth={1000}>
                    <TwoColumnLayout
                        main={
                            <>
                                <ProfileBanner firstname={firstName} lastname={lastName} avatarColor={avatarColor} location={location} bio={bio} initials={initials}></ProfileBanner>
                                <FeedBox title='YOUR POSTS' posts={posts}></FeedBox>
                            </>
                        }
                        rightColumn={
                            <>
                                <NextAchievementCard achievements={achievements} tasksCompleted={tasksCompleted} />
                                <CustomCard><p>ProfileDetails</p></CustomCard> {/*placeholder*/}
                            </>
                        }>
                    </TwoColumnLayout>
                </PageLayout>
            </div>
        </>
    )
}

export default Profile
