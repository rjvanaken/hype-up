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
            <Avatar className="size-12">
                <AvatarFallback
                    className="font-medium text-primary-foreground"
                    style={avatarColor ? { backgroundColor: avatarColor } : undefined}
                >
                    {initials}
                </AvatarFallback>
                <AvatarBadge className={`!size-4.5 [&>svg]:!size-3 ${latestPostType === 'ask' ? 'bg-secondary' : 'bg-primary'}`}>
                    {latestPostType === 'ask' ?
                    <LifeBuoy className="text-secondary-foreground"/>
                    : <PartyPopper className="text-primary-foreground"/>}
                </AvatarBadge>
            </Avatar>
            <p className="text-xs text-muted-foreground">{firstName}</p>
        </div>
    )
}

export default RecentPoster
