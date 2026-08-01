import { Dropdown } from '@/components/custom/Feed/FeedFilterDropdown'
import CustomCard from '@/components/custom/Shared/CustomCard'
import { Separator } from '@/components/ui/separator'
import AvatarNameSubtitle from '../Shared/AvatarNameSubtitle'
import { Badge } from '@/components/ui/badge'
import { Command, MessageCircle, ThumbsUp } from 'lucide-react'
import Post from './Post'
import type { PostData } from '@/hooks/usePosts'

type FeedProps = {
    title?: string
    posts: PostData[]
    firstname: string
    lastname: string

    // taskCategory : string
}

const taskCategory = "Laundry"

function FeedBox({ title = "title", posts, firstname, lastname }: FeedProps) {

    return (
        <CustomCard padding="">
            <div className='flex flex-1 justify-between h-auto px-6'>
                <p className='font-medium text-md text-neutral-600 '>{title}</p>
                <Dropdown></Dropdown>
            </div>
            <Separator />
            {posts.map((post) => (
                <Post
                    key={post.id}
                    userId={post.userId}
                    firstname={firstname}
                    lastname={lastname}
                    subtitle=""
                    taskType={post.taskType}
                    postNote={post.postNote ?? undefined}
                    customTask={post.customTask ?? undefined}
                    likeCount={post.likeCount}
                />
            ))}
            </CustomCard>
    )
}

export default FeedBox

//    const title = boostMode ? "Asking for a boost" : "What did you do?"
//   const taskLabel = boostMode ? "What do you need to do?" : "Task type"
//   const noteLabel = boostMode ? "What's got you stuck?" : "Note"
//   const notePlaceholder = boostMode ? "Ask for some encouragement..." : "How does it feel?"
//   const photoSubtext = boostMode ? "optional, if it helps explain" : "optional proof of the deed"
//   const submitLabel = boostMode ? "Ask for hype" : "Post it"