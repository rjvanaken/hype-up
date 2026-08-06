import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PageLayout from '@/components/custom/Shared/PageLayout'
import TwoColumnLayout from '@/components/custom/Shared/TwoColumnLayout'
import CustomCard from '@/components/custom/Shared/CustomCard'
import { Button } from '@/components/ui/button'
import SettingsDialog from '@/components/custom/Shared/SettingsDialog'
import NextAchievementCard from '@/components/custom/Achievements/NextAchievementCard'
import FeedBox from '@/components/custom/Feed/FeedBox'
import ConnectionsCard from '@/components/custom/Profile/ConnectionsCard'
import ProfileBanner from '@/components/custom/Profile/ProfileBanner'
import { useAchievements } from '@/hooks/useAchievements'
import { usePosts } from '@/hooks/usePosts'
import { usePublicProfile } from '@/hooks/usePublicProfile'
import { useFollowStatus } from '@/hooks/useFollowStatus'
import { settingsTabs } from '@/lib/settingsTabs'

function Profile() {
    const { userId } = useParams<{ userId?: string }>()
    const navigate = useNavigate()
    const [editProfileOpen, setEditProfileOpen] = useState(false)
    const { achievements, tasksCompleted } = useAchievements(userId)
    const { posts, isLoading: postsLoading } = usePosts(userId ? 'user' : 'own', userId)
    const profile = usePublicProfile(userId)
    const { isFollowing, toggleFollow, pending } = useFollowStatus(userId)

    if (!profile) {
    // decide what renders while data hasn't loaded yet — a spinner, null, a skeleton, etc.
    return null
    }

    const {firstName, lastName, initials, avatarColor, streakCount, location, bio, isOwnProfile} = profile

    return (
        <>
            <div>
                <PageLayout maxWidth={1000}>
                    <TwoColumnLayout
                        main={
                            <>
                                {!isOwnProfile && (
                                    <Button onClick={() => navigate(-1)}>
                                        Back
                                    </Button>
                                )}
                                <ProfileBanner
                                    firstname={firstName}
                                    lastname={lastName}
                                    avatarColor={avatarColor}
                                    location={location}
                                    bio={bio}
                                    initials={initials}
                                    achievements={achievements}
                                    tasksCompleted={tasksCompleted}
                                    isFollowing={!isOwnProfile ? isFollowing : undefined}
                                    followPending={!isOwnProfile ? pending : undefined}
                                    onFollowToggle={!isOwnProfile ? toggleFollow : undefined}
                                    onEditProfileClick={isOwnProfile ? () => setEditProfileOpen(true) : undefined}
                                    streak={streakCount}
                                ></ProfileBanner>
                                <FeedBox title='POSTS' posts={posts} isLoading={postsLoading}></FeedBox>
                            </>
                        }
                        rightColumn={isOwnProfile ? (
                            <>
                                <NextAchievementCard achievements={achievements} tasksCompleted={tasksCompleted} />
                                <ConnectionsCard />
                                <CustomCard><p>ProfileDetails</p></CustomCard> {/*placeholder*/}
                            </>
                        ) : undefined}>
                    </TwoColumnLayout>
                </PageLayout>
            </div>
            <SettingsDialog open={editProfileOpen} onOpenChange={setEditProfileOpen} tabs={settingsTabs} defaultTabKey="profile" />
        </>
    )
}

export default Profile
