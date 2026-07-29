import { useEffect, useState } from 'react'
import Nav from '@/components/custom/Nav'
import CustomCard from '@/components/custom/CustomCard'
import PageLayout from '@/components/custom/PageLayout'
import TwoColumnLayout from '@/components/custom/TwoColumnLayout'
// import { Sidebar } from '@/components/ui/sidebar'
import FeedBox from '@/components/custom/FeedBox'
import AchievementsCard, { type Achievement } from '@/components/custom/AchievementsCard'
import { supabase } from '@/lib/client'

function Home() {
    // const navigate = useNavigate()
    const [achievements, setAchievements] = useState<Achievement[]>([])

useEffect(() => {
    async function fetchBadges() {
        const { data: { user } } = await supabase.auth.getUser()

        const [{ data: badges, error: badgesError }, { data: userBadges, error: userBadgesError }] = await Promise.all([
            supabase
                .from('badges')
                .select('key, label, emoji, description, task_threshold')
                .order('task_threshold', { ascending: true }),
            user
                ? supabase
                    .from('user_badges')
                    .select('badge_key')
                    .eq('user_id', user.id)
                : Promise.resolve({ data: [], error: null })
        ])

        if (badgesError) {
            console.error('Error fetching badges:', badgesError)
            return
        }

        if (userBadgesError) {
            console.error('Error fetching user_badges:', userBadgesError)
        }

        const earnedKeys = new Set((userBadges ?? []).map((row) => row.badge_key))

        setAchievements(badges.map((badge) => ({ ...badge, unlocked: earnedKeys.has(badge.key) })))
    }

    fetchBadges()
}, [])

    return (
        <>
            <div>
                <PageLayout maxWidth={1000}>
                    <TwoColumnLayout
                        main={
                            <>
                                <CustomCard><p>IntroBox</p></CustomCard> {/*placeholder*/}
                                <FeedBox title='YOUR FEED'></FeedBox>
                            </>
                        }
                        rightColumn={
                            <>
                                    <CustomCard><p>HomeStats</p></CustomCard> {/*placeholder*/}
                                    <CustomCard><p>HomeTodos</p></CustomCard> {/*placeholder*/}
                                    <AchievementsCard achievements={achievements} />
                                    <CustomCard><p>HomeReminders</p></CustomCard> {/*placeholder*/}
                            </>
                        }>
                    </TwoColumnLayout>
                </PageLayout>
            </div>
        </>
    )
}


export default Home