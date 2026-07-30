// Profile page's Connections card: real follower/following counts and
// lists from useConnections, with an empty state per tab when a list is empty.
import CustomCard from '@/components/custom/CustomCard'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import EmptyState from '@/components/custom/EmptyState'
import type { ConnectionProfile } from '@/hooks/useConnections'

interface ConnectionsCardProps {
  followers: ConnectionProfile[]
  following: ConnectionProfile[]
}

function ConnectionsCard({ followers, following }: ConnectionsCardProps) {
  return (
    <CustomCard>
      <div className="flex items-center justify-between">
        <p className="font-semibold text-md text-secondary">CONNECTIONS</p>
        <button type="button" disabled className="text-sm font-medium text-muted-foreground cursor-not-allowed">
          See all
        </button>
      </div>

      <Tabs defaultValue="followers" className="mt-3">
        <TabsList className="w-full">
          <TabsTrigger value="followers">Followers · {followers.length}</TabsTrigger>
          <TabsTrigger value="following">Following · {following.length}</TabsTrigger>
        </TabsList>

        <TabsContent value="followers">
          <ConnectionList connections={followers} emptyMessage="No followers yet" />
        </TabsContent>
        <TabsContent value="following">
          <ConnectionList connections={following} emptyMessage="No following yet" />
        </TabsContent>
      </Tabs>
    </CustomCard>
  )
}

function ConnectionList({ connections, emptyMessage }: { connections: ConnectionProfile[]; emptyMessage: string }) {
  if (connections.length === 0) {
    return (
      <EmptyState
        emoji="👋"
        title={emptyMessage}
        subtitle="Once people follow you, they'll show up here."
      />
    )
  }

  return (
    <div className="flex flex-col gap-3 py-2">
      {connections.map((connection) => (
        <div key={connection.id} className="flex items-center gap-3">
          <Avatar size="sm">
            <AvatarFallback
              className="font-medium text-primary-foreground"
              style={connection.avatarColor ? { backgroundColor: connection.avatarColor } : undefined}
            >
              {connection.initials}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-secondary">{connection.name}</span>
        </div>
      ))}
    </div>
  )
}

export default ConnectionsCard
