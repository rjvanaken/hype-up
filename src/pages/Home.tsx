// import { useNavigate } from 'react-router-dom'
import TopPage from '@/components/custom/TopPage'
import Nav from '@/components/custom/Nav'
import CenteredCard from '@/components/custom/CenteredCard'
import PostOptions from '@/components/custom/PostOptions'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Plus, Check, LifeBuoy } from 'lucide-react'
import { useState } from 'react'
import HypePostEntry from '@/components/custom/HypePostEntry'
import BoostPostEntry from '@/components/custom/BoostPostEntry'
function Home() {
    // const navigate = useNavigate()
    
    const [activeMode, setActiveMode] = useState<'did-it' | 'need-help' | null>(null)





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

                        {!activeMode && <PostOptions onSelect={setActiveMode} />}

                        {activeMode === 'did-it' && <HypePostEntry></HypePostEntry>}
                        {activeMode === 'need-help' && <BoostPostEntry></BoostPostEntry>}


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