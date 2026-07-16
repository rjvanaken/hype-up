// import { useNavigate } from 'react-router-dom'
import TopPage from '@/components/custom/TopPage'
import Nav from '@/components/custom/Nav'
import CenteredCard from '@/components/custom/CenteredCard'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Plus, Check, LifeBuoy } from 'lucide-react'
function Home() {
    // const navigate = useNavigate()


    return (
        <TopPage className='flex flex-col gap-8'>
            <Nav></Nav>
            <TopPage className='items-center'>
                <Tabs defaultValue="account" className="w-[640px]">
                    <TabsList className="w-full mb-4" variant="line">
                        <TabsTrigger value="my-feed">My Feed</TabsTrigger>
                        <TabsTrigger value="global-feed">Global Feed</TabsTrigger>
                    </TabsList>
                        <CenteredCard width='max-w-[640px]' padding='p-[16px]' className='!flex !flex-row gap-4 h-full' >
                            <Button size="lg" variant='outline' className='text-sm font-medium w-full justify-between flex-1'>
                                <span className="flex items-center gap-2.5">
                                    <span className="flex items-center justify-center size-6.5 rounded-full bg-primary">
                                        <Check className="size-4.5 text-primary-foreground" aria-hidden="true" />
                                    </span>
                                    I did the thing!
                                </span>
                                <Plus className="size-4" aria-hidden="true" />
                            </Button>
                            <Button size="lg" variant='outline' className='text-sm font-medium w-full justify-between flex-1'>
                                <span className="flex items-center gap-2.5">
                                    <span className="flex items-center justify-center size-6.5 rounded-full bg-primary">
                                        <LifeBuoy className="size-4.5 text-primary-foreground" aria-hidden="true" />
                                    </span>
                                    I need help!
                                </span>
                                <Plus className="size-4" aria-hidden="true" />
                            </Button>
                        </CenteredCard>
                    <TabsContent value="my-feed">Make changes to your account here.</TabsContent>
                    <TabsContent value="global-feed">
                    </TabsContent>
                </Tabs>

            </TopPage>
        </TopPage>
    )
}





export default Home