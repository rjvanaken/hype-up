import { Dialog, DialogPortal, DialogOverlay } from '@/components/ui/dialog'
import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { XIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import AvatarNameSubtitle from '@/components/custom/Shared/AvatarNameSubtitle'
import type { ConnectionProfile } from '@/hooks/useConnections'

interface ConnectionsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  followers: ConnectionProfile[]
  following: ConnectionProfile[]
  defaultTab?: 'followers' | 'following'
}

function ConnectionsModal({
  open,
  onOpenChange,
  followers,
  following,
  defaultTab = 'followers'
}: ConnectionsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="z-999" />
        <DialogPrimitive.Popup
          className={cn(
            'fixed top-1/2 left-1/2 z-999 -translate-x-1/2 -translate-y-1/2',
            'w-full max-w-[420px] rounded-xl border border-neutral-300 bg-popover shadow-md outline-none p-6',
            'data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0'
          )}
        >
          <div className="flex items-start justify-between mb-4">
            <p className="text-lg font-bold text-secondary">Connections</p>
            <DialogPrimitive.Close className="cursor-pointer">
              <XIcon className="size-5" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          </div>

          <Tabs defaultValue={defaultTab}>
            <TabsList className="w-full">
              <TabsTrigger value="following">Following ({following.length})</TabsTrigger>
              <TabsTrigger value="followers">Followers ({followers.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="following">
              <ConnectionsList profiles={following} emptyLabel="Not following anyone yet." />
            </TabsContent>
            <TabsContent value="followers">
              <ConnectionsList profiles={followers} emptyLabel="No followers yet." />
            </TabsContent>
          </Tabs>
        </DialogPrimitive.Popup>
      </DialogPortal>
    </Dialog>
  )
}

function ConnectionsList({ profiles, emptyLabel }: { profiles: ConnectionProfile[]; emptyLabel: string }) {
  if (profiles.length === 0) {
    return (
      <div className="flex h-[320px] items-center justify-center">
        <p className="text-sm text-muted-foreground text-center">{emptyLabel}</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[320px] overflow-y-auto -mx-1">
      {profiles.map((profile, index) => (
        <div key={profile.id}>
          <div className="px-1 py-3">
            <AvatarNameSubtitle
              user_id={profile.id}
              firstname={profile.firstName}
              lastname={profile.lastName}
              fullName
            />
          </div>
          {index < profiles.length - 1 && <Separator />}
        </div>
      ))}
    </div>
  )
}

export default ConnectionsModal
