import { useState } from 'react'
import { Dropdown, type FeedFilter } from '@/components/custom/Feed/FeedFilterDropdown'
import CustomCard from '@/components/custom/Shared/CustomCard'
import { Separator } from '@/components/ui/separator'
import Post from './Post'
import type { PostData } from '@/hooks/usePosts'
import { getTimestamp } from '@/lib/formatRelativeTime'

type FeedProps = {
    title?: string
    posts: PostData[]

    // taskCategory : string
}

function FeedBox({ title = "title", posts }: FeedProps) {
    const [filter, setFilter] = useState<FeedFilter>('all')

    const filteredPosts = posts.filter((post) => {
        if (filter === 'hypes') return post.postType === 'share'
        if (filter === 'helps') return post.postType === 'ask'
        return true
    })

    return (
        <CustomCard className='px-0 pt-6 pb-0'>
            <div className='flex flex-1 justify-between h-auto px-6'>
                <p className='font-medium text-md text-neutral-600 '>{title}</p>
                <Dropdown value={filter} onValueChange={setFilter} />
            </div>
            <Separator />
            {filteredPosts.map((post) => (
                <Post
                    key={post.id}
                    userId={post.userId}
                    firstname={post.authorFirstName}
                    lastname={post.authorLastName}
                    initials={post.authorInitials}
                    avatarColor={post.authorAvatarColor}
                    subtitle={getTimestamp(post.createdAt)}
                    postType={post.postType}
                    taskType={post.taskType}
                    postNote={post.postNote ?? undefined}
                    customTask={post.customTask ?? undefined}
                    imageUrl={post.imageUrl ?? undefined}
                    likeCount={post.likeCount}
                />
            ))}
            {/* <Separator className="m-3"></Separator> */}
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