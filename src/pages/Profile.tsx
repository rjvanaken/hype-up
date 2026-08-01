import PageLayout from '@/components/custom/Shared/PageLayout'
import TwoColumnLayout from '@/components/custom/Shared/TwoColumnLayout'
import CustomCard from '@/components/custom/Shared/CustomCard'
import NextAchievementCard from '@/components/custom/Achievements/NextAchievementCard'
import FeedBox from '@/components/custom/Feed/FeedBox'

import { useAchievements } from '@/hooks/use-Achievements'
import { usePosts } from '@/hooks/usePosts'

function Profile() {
    const { achievements, tasksCompleted } = useAchievements()
    const posts = usePosts('own')

    return (
        <>
            <div>
                <PageLayout maxWidth={1000}>
                    <TwoColumnLayout
                        main={
                            <>
                                <CustomCard><p>IntroBox</p></CustomCard> {/*placeholder*/}
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
