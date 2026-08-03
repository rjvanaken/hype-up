import { useState } from 'react'
import CustomCard from '@/components/custom/Shared/CustomCard'
import PageLayout from '@/components/custom/Shared/PageLayout'
import TwoColumnLayout from '@/components/custom/Shared/TwoColumnLayout'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import AvatarNameSubtitle from '@/components/custom/Shared/AvatarNameSubtitle'
import { useProfileSearch } from '@/hooks/useProfileSearch'

function FindFriends() {
    const [searchTerm, setSearchTerm] = useState('')
    const { results, loading } = useProfileSearch(searchTerm)

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
                                    <p className="px-6 py-4 text-sm text-muted-foreground">No profiles found.</p>
                                )}
                                {results.map((profile, index) => (
                                    <div key={profile.id}>
                                        <div className="px-6 py-3 flex items-center justify-between gap-3">
                                            <AvatarNameSubtitle
                                                user_id={profile.id}
                                                firstname={profile.firstName}
                                                lastname={profile.lastName}
                                                subtitle={`🔥 ${profile.streakCount}-week streak`}
                                                avatarColor={profile.avatarColor}
                                            />
                                            <Button>Follow</Button>
                                        </div>
                                        {index < results.length - 1 && <Separator />}
                                    </div>
                                ))}
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
