import HomeTodos, { type Todo } from '@/components/custom/Todos/HomeTodos'
import CustomCard from '@/components/custom/Shared/CustomCard'
import PageLayout from '@/components/custom/Shared/PageLayout'
import TwoColumnLayout from '@/components/custom/Shared/TwoColumnLayout'
import FeedBox from '@/components/custom/Feed/FeedBox'

import { useTodos } from '@/hooks/useTodos'
import { usePosts } from '@/hooks/usePosts'
import { useProfile } from '@/hooks/useProfile'
import HomeBanner from '@/components/custom/Home/HomeBanner'
import AvatarNameSubtitle from '@/components/custom/Shared/AvatarNameSubtitle'
import AchievementsCard from '@/components/custom/Achievements/AchievementsCard'
import { useAchievements } from '@/hooks/use-Achievements'
import ProfileSummaryCard from '@/components/custom/Home/ProfileSummaryCard'
import { Avatar } from '@/components/ui/avatar'
import { useProfileSummary } from '@/hooks/useProfileSummary'

function Home() {
    // const navigate = useNavigate()
    const { achievements, tasksCompleted } = useAchievements()
    const posts = usePosts('feed')
    const profile = useProfile()
    const profileSummary = useProfileSummary()

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
                                firstname="name"
                                quote="Idk here's a quote"
                                
                                ></HomeBanner>
                                <FeedBox title='YOUR FEED' posts={posts}></FeedBox>
                                    

                            </>
                        }
                        rightColumn={
                            <>
                                    <ProfileSummaryCard name={profile ? `${profile.firstName} ${profile.lastName}` : ''} initials={profile?.initials ?? ''} streak={0} tasks={0} following={0} followers={0}></ProfileSummaryCard>
                                    {profileSummary && (
                                        <ProfileSummaryCard
                                            name={profileSummary.name}
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