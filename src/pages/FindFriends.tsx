import { useState } from 'react'
import CustomCard from '@/components/custom/Shared/CustomCard'
import PageLayout from '@/components/custom/Shared/PageLayout'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import AvatarNameSubtitle from '@/components/custom/Shared/AvatarNameSubtitle'
import { useProfileSearch } from '@/hooks/useProfileSearch'

function FindFriends() {
    const [searchTerm, setSearchTerm] = useState('')
    const { results, loading } = useProfileSearch(searchTerm)

    return (
        <PageLayout maxWidth={700}>
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
                {loading && (
                    <p className="px-6 py-4 text-sm text-muted-foreground">Searching...</p>
                )}
                {!loading && searchTerm.trim() && results.length === 0 && (
                    <p className="px-6 py-4 text-sm text-muted-foreground">No profiles found.</p>
                )}
                {results.map((profile, index) => (
                    <div key={profile.id}>
                        <div className="px-6 py-3">
                            <AvatarNameSubtitle
                                user_id={profile.id}
                                firstname={profile.firstName}
                                lastname={profile.lastName}
                            />
                        </div>
                        {index < results.length - 1 && <Separator />}
                    </div>
                ))}
            </CustomCard>
        </PageLayout>
    )
}

export default FindFriends
