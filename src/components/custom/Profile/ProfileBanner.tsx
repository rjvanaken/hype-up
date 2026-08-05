import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import CustomCard from "../Shared/CustomCard"
import { avatarColorMappings } from "@/lib/avatarColorMappings"
import { AchievementItem, type Achievement } from "@/components/custom/Achievements/AchievementsCard"

export interface ProfileBannerProps {
  firstname: string
  lastname: string
  avatarColor: string
  location: string | ''
  bio: string | ''
  initials: string
  achievements: Achievement[]
  tasksCompleted: number

}

function ProfileBanner({
  firstname,
  lastname,
  avatarColor,
  location,
  bio,
  initials,
  achievements,
  tasksCompleted,
}: ProfileBannerProps) {
    const unlockedAchievements = achievements.filter((achievement) => achievement.unlocked)
    const recentAchievements = [...unlockedAchievements]
        .sort((a, b) => new Date(b.earnedAt ?? 0).getTime() - new Date(a.earnedAt ?? 0).getTime())
        .slice(0, 3)

    var hexMatch = avatarColorMappings.find(m => m.hex === avatarColor)
    const gradiantClass = hexMatch?.color ?? avatarColorMappings[0].color




  return (
    <CustomCard className="p-0">
        <div className={`h-24 ${gradiantClass}`}>
           

        </div>

        <div className="px-6 pb-6 flex flex-row gap-8 w-full">
        <div className="flex flex-col gap-5 w-1/2 -mt-15 pb-6">
                      <Avatar className="size-20 border-5 border-card shadow-md">
                          <AvatarFallback
                              className="font-semibold text-xl text-primary-foreground"
                          style={avatarColor ? { backgroundColor: avatarColor } : undefined}
                          >
                              {initials}
                          </AvatarFallback>
                      </Avatar>
            <div className="flex flex-col gap-1">
            <p className="text-xl font-bold">{firstname} {lastname}</p>
            <p className="text-sm font-regular"><span role="img" aria-label="pin">📍</span>{location}</p>
            </div>
            <div className="h-16">
                <p>{bio}</p>
            </div>
        </div>
        <div className="flex flex-col gap-2 pt-4 w-1/2">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Achievements
            </p>
            <div className="flex gap-3 min-h-[70px]">
                {recentAchievements.map(({ key, ...achievement }) => (
                    <AchievementItem key={key} {...achievement} />
                ))}
            </div>
            <div className="text-center pt-2">
                <p className="text-2xl font-bold text-primary">{tasksCompleted}</p>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Tasks Completed
                </p>
            </div>
        </div>

        </div>
    </CustomCard>
  )
  
}

export default ProfileBanner