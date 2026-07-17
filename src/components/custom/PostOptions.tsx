import CenteredCard from '@/components/custom/CenteredCard'
import { Button } from '@/components/ui/button'
import { Plus, LifeBuoy, PartyPopper } from 'lucide-react'

type PostOptionsProps = {
    onSelect: (mode: 'did-it' | 'need-help') => void
}

function PostOptions({ onSelect }: PostOptionsProps) {

    return (
    <CenteredCard width='max-w-[640px]' padding='p-[16px]' className='!flex !flex-row gap-4 h-full' >
        <Button size="lg" variant='outline' className='border-neutral-300 text-sm bg-transparent hover:bg-background border-1 font-medium w-full justify-between flex-1' onClick={() => onSelect('did-it')}>
            <span className="flex items-center gap-2.5">
                <span className="flex items-center justify-center size-6.5 rounded-full bg-primary">
                    <PartyPopper className="size-4 text-primary-foreground" aria-hidden="true" />
                </span>
                I did the thing!
            </span>
            <Plus className="size-4" aria-hidden="true" />
        </Button>
        <Button size="lg" variant='outline' className='border-neutral-300 text-sm bg-transparent hover:bg-background font-medium w-full justify-between flex-1' onClick={() => onSelect('need-help')}>
            <span className="flex items-center gap-2.5">
                <span className="flex items-center justify-center size-6.5 rounded-full bg-primary">
                    <LifeBuoy className="size-4.5 text-primary-foreground" aria-hidden="true" />
                </span>
                I need help!
            </span>
            <Plus className="size-4" aria-hidden="true" />
        </Button>
    </CenteredCard>


    )
}



export default PostOptions