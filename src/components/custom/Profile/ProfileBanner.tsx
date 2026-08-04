import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import CustomCard from "../Shared/CustomCard"
import type { RecentPoster as RecentPosterData } from "@/hooks/useHomeRecents"

export interface ProfileBannerProps {
  firstname: string
  lastname: string
  avatarColor: string

}

function ProfileBanner({
  firstname,
  lastname
}: ProfileBannerProps) {


  return (
    <CustomCard className="p-0">
        <div className="h-24 bg-primary">
        </div>

        <div className="px-6 pb-6 flex flex-row w-full">
        <div className="flex flex-col gap-5 w-2/3 -mt-15 pb-6">
                      <Avatar className="size-20 border-5 border-card shadow-sm">
                          <AvatarFallback
                              className="font-medium text-primary-foreground"
                          // style={avatarColor ? { backgroundColor: avatarColor } : undefined}
                          >
                              {/* {initials} */}
                          </AvatarFallback>
                      </Avatar>
            <div className="flex flex-col gap-1">
            <p className="text-xl font-bold">Jane Doe</p>
            <p className="text-sm font-regular"><span role="img" aria-label="pin">📍</span> Boston, MA</p>
            </div>
            <div className="h-16">
                <p>I don't know what I'm doing with my life but I mean, pizza is good so that's a plus! 🍕</p>
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