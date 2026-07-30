// Profile page's posts feed. No posts-list data source exists yet, so this
// only renders the empty state (matches FeedBox's header/filter layout).
import CustomCard from '@/components/custom/CustomCard'
import { Separator } from '@/components/ui/separator'
import { Dropdown } from '@/components/custom/Dropdown'
import EmptyState from '@/components/custom/EmptyState'

function PostsCard() {
  return (
    <CustomCard padding="">
      <div className="flex flex-1 items-center justify-between h-auto px-6">
        <p className="font-semibold text-md text-secondary">POSTS</p>
        <Dropdown />
      </div>

      <Separator />

      <EmptyState
        emoji="🌱"
        title="No posts yet"
        subtitle="Post your first task completion to start your streak."
        actionLabel="Add a task"
        onAction={() => {}}
        actionDisabled
      />
    </CustomCard>
  )
}

export default PostsCard
