import { useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import CustomCard from '@/components/custom/Shared/CustomCard'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import AvatarNameSubtitle from '@/components/custom/Shared/AvatarNameSubtitle'
import ConnectionsModal from '@/components/custom/Profile/ConnectionsModal'
import { useConnections, type ConnectionProfile } from '@/hooks/useConnections'

const PREVIEW_LIMIT = 4

function ConnectionsCard() {
  const navigate = useNavigate()
  const { followers, following } = useConnections()
  const [activeTab, setActiveTab] = useState<'followers' | 'following'>('followers')
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <CustomCard>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-bold uppercase tracking-wide text-secondary">Connections</p>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="text-xs font-semibold text-primary hover:underline cursor-pointer"
        >
          See all
        </button>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as 'followers' | 'following')}
      >
        <TabsList className="w-full mb-4">
          <TabsTrigger value="followers" className="flex-1">Followers · {followers.length}</TabsTrigger>
          <TabsTrigger value="following" className="flex-1">Following · {following.length}</TabsTrigger>
        </TabsList>

        <TabsContent value="followers">
          {followers.length === 0 ? (
            <EmptyConnections
              heading="No followers yet"
              subtitle="When someone follows you, they'll show up here."
            />
          ) : (
            <ConnectionsPreviewList profiles={followers} />
          )}
        </TabsContent>

        <TabsContent value="following">
          {following.length === 0 ? (
            <EmptyConnections
              heading="Not following anyone yet"
              subtitle="Find friends to follow."
            >
              <Button className="mt-2" onClick={() => navigate('/find-friends')}>
                Find Friends
              </Button>
            </EmptyConnections>
          ) : (
            <ConnectionsPreviewList profiles={following} />
          )}
        </TabsContent>
      </Tabs>

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

function EmptyConnections({
  heading,
  subtitle,
  children
}: {
  heading: string
  subtitle: string
  children?: ReactNode
}) {
  return (
    <div className="flex flex-col items-center text-center gap-1 py-4">
      <p className="font-semibold text-secondary">{heading}</p>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
      {children}
    </div>
  )
}

function ConnectionsPreviewList({ profiles }: { profiles: ConnectionProfile[] }) {
  return (
    <div className="flex flex-col gap-3">
      {profiles.slice(0, PREVIEW_LIMIT).map((profile) => (
        <AvatarNameSubtitle
          key={profile.id}
          user_id={profile.id}
          firstname={profile.firstName}
          lastname={profile.lastName}
        />
      ))}
    </div>
  )
}

export default ConnectionsCard
