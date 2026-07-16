// import { useNavigate } from 'react-router-dom'
import TopPage from '@/components/custom/TopPage'
import Nav from '@/components/custom/Nav'
import CenteredCard from '@/components/custom/CenteredCard'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Plus, Check, LifeBuoy } from 'lucide-react'
import PostCard from '@/components/custom/HypePostEntry'
function Home() {
    // const navigate = useNavigate()


    return (
        <>
        <Nav></Nav>
        <TopPage className='flex flex-col gap-8 mt-6'>
            <TopPage className='items-center'>
                <Tabs defaultValue="account" className="w-[640px]">
                    <TabsList className="w-full mb-4" variant="line">
                        <TabsTrigger value="my-feed">My Feed</TabsTrigger>
                        <TabsTrigger value="global-feed">Global Feed</TabsTrigger>
                    </TabsList>
                        <PostCard></PostCard>
                    <TabsContent value="my-feed">Make changes to your account here.</TabsContent>
                    <TabsContent value="global-feed">
                    </TabsContent>
                </Tabs>

            </TopPage>
        </TopPage>
        </>
    )
}





export default Home