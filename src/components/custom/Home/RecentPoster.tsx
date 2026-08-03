import { LifeBuoy, PartyPopper } from "lucide-react"
import { Avatar, AvatarBadge, AvatarFallback } from "@/components/ui/avatar"

export interface RecentPosterProps {
    firstName: string
    initials: string
    avatarColor: string | null
    latestPostType: 'share' | 'ask'
}

function RecentPoster({ firstName, initials, avatarColor, latestPostType }: RecentPosterProps) {
    return (
        <div className="flex flex-col items-center gap-1">
            <Avatar>
                <AvatarFallback
                    className="font-medium text-primary-foreground"
                    style={avatarColor ? { backgroundColor: avatarColor } : undefined}
                >
                    {initials}
                </AvatarFallback>
                <AvatarBadge>
                    {latestPostType === 'ask' ? 
                    
                    <div className="rounded-full bg-secondary">
                    <LifeBuoy className="text-secondary-foreground"/> 
                    </div>
                :   <div className="rounded-full bg-primary">
                    <PartyPopper className="text-primary-foreground"/> 
                    </div>}
                
                </AvatarBadge>
            </Avatar>
            <p className="text-xs text-muted-foreground">{firstName}</p>
        </div>
    )
}

export default RecentPoster
