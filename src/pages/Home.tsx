import HomeTodos, { type Todo } from '@/components/custom/Todos/HomeTodos'
import CustomCard from '@/components/custom/Shared/CustomCard'
import PageLayout from '@/components/custom/Shared/PageLayout'
import TwoColumnLayout from '@/components/custom/Shared/TwoColumnLayout'
import FeedBox from '@/components/custom/Feed/FeedBox'

import { useTodos } from '@/hooks/useTodos'
import { usePosts } from '@/hooks/usePosts'
import { useProfile } from '@/hooks/useProfile'
import HomeBanner from '@/components/custom/Home/HomeBanner'
import AchievementsCard from '@/components/custom/Achievements/AchievementsCard'
import { useAchievements } from '@/hooks/use-Achievements'
import ProfileSummaryCard from '@/components/custom/Home/ProfileSummaryCard'
import { useProfileSummary } from '@/hooks/useProfileSummary'
import { useHomeRecents } from '@/hooks/useHomeRecents'

function Home() {
    // const navigate = useNavigate()
    const { achievements, tasksCompleted } = useAchievements()
    const { posts, isLoading: postsLoading } = usePosts('feed')
    const profile = useProfile()
    const { summary: profileSummary, isLoading: profileSummaryLoading } = useProfileSummary()
    const { recentPosters, isLoading: recentPostersLoading } = useHomeRecents()

  const { todos, addTodo, deleteTodo, editTodo, toggleTodo } = useTodos()

  function handleSetReminder(todo: Todo) {
    console.log('Set reminder for:', todo.text)
}

    return (
        <>
            <div>
                <PageLayout maxWidth={1000}>
                    <TwoColumnLayout
                        main={
                            <>
                                <HomeBanner
                                firstname={profile?.firstName ?? ''}
                                recentPosters={recentPosters}
                                recentPostersLoading={recentPostersLoading}
                                ></HomeBanner>
                                <FeedBox title='YOUR FEED' posts={posts} isLoading={postsLoading}></FeedBox>
                                    

                            </>
                        }
                        rightColumn={
                            <>
                                    {profileSummaryLoading && (
                                        <CustomCard className='gap-4'>
                                            <p className='text-sm text-muted-foreground'>Loading profile...</p>
                                        </CustomCard>
                                    )}
                                    {!profileSummaryLoading && profileSummary && (
                                        <ProfileSummaryCard
                                            firstName={profileSummary.firstName}
                                            lastName={profileSummary.lastName}
                                            initials={profileSummary.initials}
                                            streak={profileSummary.streak}
                                            tasks={profileSummary.tasks}
                                            following={profileSummary.following}
                                            followers={profileSummary.followers}
                                        />
                                    )}
                                    <HomeTodos 
                                      todos={todos} 
                                      onToggleTodo={toggleTodo} 
                                      onAddTodo={addTodo} 
                                      onDeleteTodo={deleteTodo} 
                                      onSetReminder={handleSetReminder} 
                                      onEditTodo={editTodo} /> {/*placeholder*/}
                                    <AchievementsCard achievements={achievements} tasksCompleted={tasksCompleted} />
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