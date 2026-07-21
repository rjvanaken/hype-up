import { Dropdown } from '@/components/custom/Dropdown'
import CustomCard from '@/components/custom/CustomCard'
import { Separator } from '@/components/ui/separator'

type FeedProps = {
    title?: string
}

function FeedBox({ title = "title" }: FeedProps) {

    return (
        <CustomCard padding="">
            <div className='flex flex-1 justify-between h-auto px-6'>
                <p className='font-medium text-md text-neutral-600 '>{title}</p>
                <Dropdown></Dropdown>
            </div>
            <Separator />
            <p>remember that when you add other content they need their own padding</p>
            <p>so either we put this stuff in a container with it or we give the post boxes padding</p>
        </CustomCard>
    )
}

export default FeedBox