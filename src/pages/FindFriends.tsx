import { useState } from 'react'
import CustomCard from '@/components/custom/Shared/CustomCard'
import PageLayout from '@/components/custom/Shared/PageLayout'
import TwoColumnLayout from '@/components/custom/Shared/TwoColumnLayout'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import AvatarNameSubtitle from '@/components/custom/Shared/AvatarNameSubtitle'
import { useProfileSearch } from '@/hooks/useProfileSearch'
import { useFollowActions } from '@/hooks/useFollowActions'

function FindFriends() {
    const [searchTerm, setSearchTerm] = useState('')
    const { results, loading } = useProfileSearch(searchTerm)
    const { followingIds, pendingIds, follow, unfollow } = useFollowActions()

    return (
        <PageLayout maxWidth={1000}>
            <TwoColumnLayout
                main={
                    <>
                        <CustomCard className="mb-4">
                            <h1 className="text-xl font-semibold text-secondary">Find Friends</h1>
                            <p className="text-sm text-muted-foreground mb-4">Search for people to follow and hype</p>
                            <Input
                                placeholder="Search by name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </CustomCard>

                        <CustomCard className="px-0 py-2">
                            <div className="max-h-[520px] overflow-y-auto">
                                {loading && (
                                    <p className="px-6 py-4 text-sm text-muted-foreground">Searching...</p>
                                )}
                                {!loading && results.length === 0 && (
                                    <div className="flex flex-col items-center text-center gap-1 py-6">
                                        <p className="font-semibold text-secondary">No matches</p>
                                        <p className="text-sm text-muted-foreground">Try searching a different name</p>
                                    </div>
                                )}
                                {results.map((profile, index) => {
                                    const isFollowing = followingIds.has(profile.id)
                                    const isPending = pendingIds.has(profile.id)

                                    return (
                                        <div key={profile.id}>
                                            <div className="px-6 py-3 flex items-center justify-between gap-3">
                                                <AvatarNameSubtitle
                                                    user_id={profile.id}
                                                    firstname={profile.firstName}
                                                    lastname={profile.lastName}
                                                    initials={profile.initials}
                                                    subtitle={`🔥 ${profile.streakCount}-week streak`}
                                                    avatarColor={profile.avatarColor}
                                                    fullName
                                                />
                                                <Button
                                                    variant={isFollowing ? 'outline' : 'default'}
                                                    disabled={isPending}
                                                    onClick={() => (isFollowing ? unfollow(profile.id) : follow(profile.id))}
                                                >
                                                    {isFollowing ? 'Unfollow' : 'Follow'}
                                                </Button>
                                            </div>
                                            {index < results.length - 1 && <Separator />}
                                        </div>
                                    )
                                })}
                            </div>
                        </CustomCard>
                    </>
                }
                rightColumn={
                    <>
                    </>
                }>
            </TwoColumnLayout>
        </PageLayout>
    )
}

export default FindFriends
