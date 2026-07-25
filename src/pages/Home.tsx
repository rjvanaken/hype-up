

import HomeTodos from '@/components/custom/HomeTodos'
import CustomCard from '@/components/custom/CustomCard'
import PageLayout from '@/components/custom/PageLayout'
import TwoColumnLayout from '@/components/custom/TwoColumnLayout'
// import { Sidebar } from '@/components/ui/sidebar'
import FeedBox from '@/components/custom/FeedBox'

const mockTodos = [
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
    text: 'Reply to Maya about weekend plans',
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
                                    <HomeTodos todos={mockTodos} /> {/*placeholder*/}
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