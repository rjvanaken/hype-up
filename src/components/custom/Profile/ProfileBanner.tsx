import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import CustomCard from "../Shared/CustomCard"
import { avatarColorMappings } from "@/lib/avatarColorMappings"

export interface ProfileBannerProps {
  firstname: string
  lastname: string
  avatarColor: string 
  location: string | ''
  bio: string | ''
  initials: string
  streak: number

}

function ProfileBanner({
  firstname,
  lastname,
  avatarColor,
  location,
  bio,
  initials,
  streak,
}: ProfileBannerProps) {

    var hexMatch = avatarColorMappings.find(m => m.hex === avatarColor)
    const gradiantClass = hexMatch?.color ?? avatarColorMappings[0].color




  return (
    <CustomCard className="p-0">
        <div className={`h-24 ${gradiantClass}`}>
           

        </div>

        <div className="px-6 pb-6 flex flex-row w-full">
        <div className="flex flex-col gap-5 w-2/3 -mt-15 pb-6">
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
            <p className="text-sm font-regular"><span role="img" aria-label="fire">🔥</span>{streak}-week streak</p>
            </div>
            <div className="h-16">
                <p>{bio}</p>
            </div>
        </div>
        <div>
            <p className="pt-4">Achievements Stuff</p>
        </div>
        

        </div>
    </CustomCard>
  )
  
}

export default ProfileBanner