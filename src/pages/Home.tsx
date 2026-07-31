import Nav from '@/components/custom/Nav'
import HomeTodos, { type Todo } from '@/components/custom/Todos/HomeTodos'
import CustomCard from '@/components/custom/Shared/CustomCard'
import PageLayout from '@/components/custom/Shared/PageLayout'
import TwoColumnLayout from '@/components/custom/Shared/TwoColumnLayout'
// import { Sidebar } from '@/components/ui/sidebar'
import FeedBox from '@/components/custom/Shared/FeedBox'

import { useTodos } from '@/hooks/useTodos'


import AchievementsCard from '@/components/custom/Achievements/AchievementsCard'
import { useAchievements } from '@/hooks/use-Achievements'

function Home() {
    // const navigate = useNavigate()
    const { achievements, tasksCompleted } = useAchievements()

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
                                    <Profile><p>HomeStats</p></CustomCard> {/*placeholder*/}
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