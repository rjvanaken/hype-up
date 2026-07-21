import CustomCard from '@/components/custom/CustomCard'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'

interface ProfileSummaryCardProps {
  name: string
  initials: string
  streak: number
  tasks: number
  following: number
  followers: number
}

function ProfileSummaryCard({
  name,
  initials,
  streak,
  tasks,
  following,
  followers,
}: ProfileSummaryCardProps) {
  return (
    <CustomCard>
      className="flex flex-col items-center"

    <div className='items-center flex flex-col gap-3 w-full'>  
      <Avatar className="size-16">
        <AvatarFallback className="bg-primary text-lg font-semibold text-primary-foreground">
          {initials}
        </AvatarFallback>
      </Avatar>

      <div className="text-center">
        <p className="text-md font-semibold text-secondary">
          {name}
        </p>

        <p className="mt-1 text-sm text-muted-foreground">
          <span role="img" aria-label="fire">🔥</span>  {streak}-week streak 
        </p>
      </div>  
      </div>  

      <Separator />

      <div className="flex w-full text-center">
        <ProfileStat value={tasks} label="Tasks" />
        <ProfileStat value={following} label="Following" />
        <ProfileStat value={followers} label="Followers" />
      </div>
    </CustomCard>
  )
}

interface ProfileStatProps {
  value: number
  label: string
}

function ProfileStat({ value, label }: ProfileStatProps) {
  return (
    <div className="flex flex-col flex-1 items-center">
      <span className="text-md font-semibold text-primary">
        {value}
      </span>

      <span className="text-xs uppercase text-muted-foreground">
        {label}
      </span>
    </div>
  )
}

export default ProfileSummaryCard