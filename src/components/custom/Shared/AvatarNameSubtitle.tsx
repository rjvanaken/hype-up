import { Link } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";


interface AvatarNameSubtitleProps {
user_id: string
firstname : string
lastname : string
subtitle?: string
initials: string
avatarColor?: string | null
fullName?: boolean

}

function AvatarNameSubtitle ({
    user_id,
    firstname,
    lastname,
    subtitle,
    initials,
    avatarColor,
    fullName = false

}: AvatarNameSubtitleProps) {


return(
    <Link to={`/profile/${user_id}`} className="flex flex-row gap-2 justify-start w-full">
<Avatar className="h-9 w-9">
    <AvatarFallback
        className={avatarColor ? "text-xs font-semibold text-white" : "text-xs font-semibold"}
        style={avatarColor ? { backgroundColor: avatarColor } : undefined}
    >
        {initials}
    </AvatarFallback>
</Avatar>
    <div className="flex flex-col gap-0 w-full justify-center">
<p className="font-semibold text-sm text-secondary items-center mb-0">{firstname} {fullName ? lastname : `${lastname.charAt(0).toUpperCase()}.`}</p>
<p className='text-xs text-muted-foreground'>{subtitle}</p>
</div>
    </Link>

)
}


export default AvatarNameSubtitle
