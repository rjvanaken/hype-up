

import HomeTodos, { type Todo } from '@/components/custom/HomeTodos'
import CustomCard from '@/components/custom/CustomCard'
import PageLayout from '@/components/custom/PageLayout'
import TwoColumnLayout from '@/components/custom/TwoColumnLayout'
// import { Sidebar } from '@/components/ui/sidebar'
import FeedBox from '@/components/custom/FeedBox'

import { useState } from 'react'

// temp for testing
const mockTodos: Todo[] = [
  {
    id: '1',
    text: 'Pack gym bag for tomorrow',
    completed: false,
  },
  {
    id: '2',
    text: 'Schedule dentist appointment',
    completed: false,
  },
  {
    id: '3',
    text: 'Reply to Maya about weekend plans as;fghnawejlkgbhajs;gwa;gja;fawuefh;lwa',
    completed: false,
  },
  {
    id: '4',
    text: 'Laundry',
    completed: true,
  },
  {
    id: '5',
    text: 'Gym',
    completed: true,
  },
]


function Home() {
    // const navigate = useNavigate()


  const [todos, setTodos] = useState<Todo[]>(mockTodos)

  function handleToggleTodo(id: string) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    )
  }

  function handleAddTodo(text: string) {
  setTodos((currentTodos) => [
    {
      id: crypto.randomUUID(),
      text,
      completed: false,
    },
    ...currentTodos,
  ])
}

  function handleDeleteTodo(id: string) {
    setTodos((currentTodos) =>
      currentTodos.filter((todo) => todo.id !== id)
    )
  }

  function handleSetReminder(todo: Todo) {
  console.log('Set reminder for:', todo.text)
}

  function handleEditTodo(id: string, text: string) {
  setTodos((currentTodos) =>
    currentTodos.map((todo) =>
      todo.id === id
        ? { ...todo, text }
        : todo
    )
  )
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
                                    <CustomCard><p>HomeStats</p></CustomCard> {/*placeholder*/}
                                    <HomeTodos todos={todos} onToggleTodo={handleToggleTodo} onAddTodo={handleAddTodo} onDeleteTodo={handleDeleteTodo} onSetReminder={handleSetReminder} onEditTodo={handleEditTodo} /> {/*placeholder*/}
                                    <CustomCard><p>HomeAchievements</p></CustomCard> {/*placeholder*/}
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