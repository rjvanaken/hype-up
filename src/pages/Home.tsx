
import Nav from '@/components/custom/Nav'
import CustomCard from '@/components/custom/CustomCard'
import PageLayout from '@/components/custom/PageLayout'
import TwoColumnLayout from '@/components/custom/TwoColumnLayout'
// import { Sidebar } from '@/components/ui/sidebar'
import FeedBox from '@/components/custom/FeedBox'



function Home() {
    // const navigate = useNavigate()

    return (
        <>
            <Nav></Nav>
            <div>
                {/* Insert sidebar here */}
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