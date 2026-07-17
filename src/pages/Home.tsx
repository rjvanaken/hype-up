// import { useNavigate } from 'react-router-dom'
import TopPage from '@/components/custom/TopPage'
import Nav from '@/components/custom/Nav'
import PostOptions from '@/components/custom/PostOptions'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { useState } from 'react'
import HypePostEntry from '@/components/custom/HypePostEntry'
import BoostPostEntry from '@/components/custom/BoostPostEntry'
import { Dropdown } from '@/components/custom/Dropdown'
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

                    <div className='flex flex-1 justify-end mb-1'>
                    <Dropdown></Dropdown>
                    </div>

                        {!activeMode && <PostOptions onSelect={setActiveMode} />}

                        {activeMode === 'did-it' && <HypePostEntry onClose={() => setActiveMode(null)} />}
                        {activeMode === 'need-help' && <BoostPostEntry onClose={() => setActiveMode(null)} />}


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