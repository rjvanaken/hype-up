import { Avatar, AvatarFallback } from "@/components/ui/avatar";


interface AvatarNameSubtitleProps {
user_id: string
firstname : string
lastname : string
subtitle?: string
initials: string
avatarColor: string

}

function AvatarNameSubtitle ({
    firstname,
    lastname,
    subtitle,
    initials,
    avatarColor

}: AvatarNameSubtitleProps) {
    
    
    
return(
    <div className="flex flex-row gap-2 justify-start w-full">
<Avatar className="h-9 w-9">
            <AvatarFallback
                className="text-md font-semibold text-primary-foreground"
                style={avatarColor ? { backgroundColor: avatarColor } : undefined}
            >
                {initials}
            </AvatarFallback>
</Avatar>
    <div className="flex flex-col gap-0 w-full justify-center">
<p className="font-semibold text-sm text-secondary items-center mb-0">{firstname} {lastname.charAt(0).toUpperCase()}.</p>
<p className='text-xs text-muted-foreground'>{subtitle}</p> 
</div>
    </div>

)
}


export default AvatarNameSubtitle

