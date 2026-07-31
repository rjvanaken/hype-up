import Nav from '@/components/custom/Nav'
import HomeTodos, { type Todo } from '@/components/custom/HomeTodos'
import CustomCard from '@/components/custom/CustomCard'
import PageLayout from '@/components/custom/PageLayout'
import TwoColumnLayout from '@/components/custom/TwoColumnLayout'
// import { Sidebar } from '@/components/ui/sidebar'
import FeedBox from '@/components/custom/FeedBox'

import { useTodos } from '@/hooks/useTodos'


import AchievementsCard from '@/components/custom/Achievements/AchievementsCard'
import { useAchievements } from '@/hooks/use-Achievements'
import ProfileSummaryCard from '@/components/custom/ProfileSummaryCard'
import { useProfileSummary } from '@/hooks/useProfileSummary'

function Home() {
    // const navigate = useNavigate()
    const { achievements, tasksCompleted } = useAchievements()
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
                                <CustomCard><p>IntroBox</p></CustomCard> {/*placeholder*/}
                                <FeedBox title='YOUR FEED'></FeedBox>
                            </>
                        }
                        rightColumn={
                            <>
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
                                    <CustomCard><p>HomeAchievements</p></CustomCard> {/*placeholder*/}
                                    <CustomCard><p>HomeTodos</p></CustomCard> {/*placeholder*/}
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