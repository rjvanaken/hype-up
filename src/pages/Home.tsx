import HomeTodos, { type Todo } from '@/components/custom/Todos/HomeTodos'
import HomeReminders from '@/components/custom/Reminders/HomeReminders'
import type { ReminderDraft } from '@/components/custom/Reminders/SetReminderDialog'
import CustomCard from '@/components/custom/Shared/CustomCard'
import PageLayout from '@/components/custom/Shared/PageLayout'
import TwoColumnLayout from '@/components/custom/Shared/TwoColumnLayout'
import FeedBox from '@/components/custom/Feed/FeedBox'

import { useTodos } from '@/hooks/useTodos'
import { useReminders } from '@/hooks/useReminders'
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
  const { reminders, addReminder } = useReminders()

  function handleSetReminder(_todo: Todo, reminder: ReminderDraft) {
    addReminder(reminder.label, reminder.time, reminder.days)
  }

  function handleAddReminder(reminder: ReminderDraft) {
    addReminder(reminder.label, reminder.time, reminder.days)
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
                                    <HomeReminders reminders={reminders} onAddReminder={handleAddReminder} />
                            </>
                        }>
                    </TwoColumnLayout>
                </PageLayout>
            </div>
        </>
    )
}


export default Home