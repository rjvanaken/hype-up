import CenteredCard from '@/components/custom/CenteredCard'
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
    <CenteredCard
      width="max-w-[280px]"
      padding="p-6"
      className="flex flex-col items-center"
    >
      <Avatar className="size-16">
        <AvatarFallback className="bg-primary text-lg font-semibold text-primary-foreground">
          {initials}
        </AvatarFallback>
      </Avatar>

      <div className="mt-3 text-center">
        <p className="text-md font-semibold text-secondary">
          {name}
        </p>

        <p className="mt-1 text-sm text-muted-foreground">
          {streak}-week streak
        </p>
      </div>

      <Separator className="my-4" />

      <div className="flex w-full justify-around text-center">
        <ProfileStat value={tasks} label="Tasks" />
        <ProfileStat value={following} label="Following" />
        <ProfileStat value={followers} label="Followers" />
      </div>
    </CenteredCard>
  )
}

interface ProfileStatProps {
  value: number
  label: string
}

function ProfileStat({ value, label }: ProfileStatProps) {
  return (
    <div className="flex flex-col items-center">
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