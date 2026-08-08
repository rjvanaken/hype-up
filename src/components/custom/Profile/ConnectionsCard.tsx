import { useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import CustomCard from '@/components/custom/Shared/CustomCard'
import AppButton from '@/components/custom/Shared/AppButton'
import AvatarNameSubtitle from '@/components/custom/Shared/AvatarNameSubtitle'
import ConnectionsModal from '@/components/custom/Profile/ConnectionsModal'
import { useConnections, type ConnectionProfile } from '@/hooks/useConnections'
import { cn } from '@/lib/utils'
import EmptyState from '../Shared/EmptyState'
import { UserPlus } from 'lucide-react'
import noUsersImage from '@/assets/empty/no-users.svg'

const PREVIEW_LIMIT = 6

function ConnectionsCard() {
  const navigate = useNavigate()
  const { followers, following, isLoading } = useConnections()
  const [activeTab, setActiveTab] = useState<'followers' | 'following'>('followers')
  const [modalOpen, setModalOpen] = useState(false)

  const emptyState =
    activeTab === 'following' ? (
      <EmptyState
        imagePath={noUsersImage}
        title="Not following anyone yet"
        subtitle="Find friends to follow."
        actionLabel="Find Friends"
        icon={UserPlus}
        onAction={() => navigate('/find-friends')}
      />
    ) : (
      <EmptyState
        imagePath={noUsersImage}
        title="No followers yet"
        subtitle="When someone follows you, they'll show up here."
      />
    )

  return (
    <CustomCard>
      <div className="flex items-center justify-between mb-1">
        <p className="text-sm font-semibold uppercase tracking-wide text-neutral-600">Friends</p>
        <AppButton
          variant="link"
          onClick={() => setModalOpen(true)}
        >
          See all
        </AppButton>
      </div>

      <div className="flex w-full rounded-xl bg-primary/8 p-1.5 mb-1">
        <button
          type="button"
          onClick={() => setActiveTab('followers')}
          className={cn(
            'flex-1 rounded-lg py-1.5 text-sm font-bold transition-colors cursor-pointer',
            activeTab === 'followers' ? 'bg-card text-primary shadow-sm' : 'text-secondary'
          )}
        >
          Followers &middot; {followers.length}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('following')}
          className={cn(
            'flex-1 rounded-lg py-1.5 text-sm font-bold transition-colors cursor-pointer',
            activeTab === 'following' ? 'bg-card text-primary shadow-sm' : 'text-secondary'
          )}
        >
          Following &middot; {following.length}
        </button>
      </div>

      <ConnectionsPreview
        profiles={activeTab === 'following' ? following : followers}
        isLoading={isLoading}
        emptyState={emptyState}
      />

      <ConnectionsModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        followers={followers}
        following={following}
        defaultTab={activeTab}
      />
    </CustomCard>
  )
}

function ConnectionsPreview({
  profiles,
  isLoading,
  emptyState
}: {
  profiles: ConnectionProfile[]
  isLoading: boolean
  emptyState: ReactNode
}) {
  if (isLoading) {
    return (
      <div className="h-72 flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    )
  }

  if (profiles.length === 0) {
    return (
      <div className="h-72 flex items-center justify-center">
        {emptyState}
      </div>
    )
  }

  return (
    <div className="h-72 overflow-y-auto flex flex-col gap-3">
      {profiles.slice(0, PREVIEW_LIMIT).map((profile) => (
        <AvatarNameSubtitle
          key={profile.id}
          user_id={profile.id}
          firstname={profile.firstName}
          lastname={profile.lastName}
          initials={profile.initials}
          avatarColor={profile.avatarColor}
          fullName
        />
      ))}
    </div>
  )
}

export default ConnectionsCard
