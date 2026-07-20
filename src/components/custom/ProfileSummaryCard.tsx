import CenteredCard from '@/components/custom/CenteredCard'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'

type ProfileSummaryCardProps = {
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
      width="w-[280px]"
      padding="p-6"
      className="flex flex-col items-center"
    >
      <Avatar className="h-16 w-16">
        <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
          {initials}
        </AvatarFallback>
      </Avatar>

      <div className="mt-3 text-center">
        <p className="text-secondary font-semibold">{name}</p>

        <p className="mt-1 text-sm text-neutral-600">
          {streak}-week streak
        </p>
      </div>

      <Separator className="my-4" />

      <div className="flex w-full justify-around text-center">
        <Stat value={tasks} label="Tasks" />
        <Stat value={following} label="Following" />
        <Stat value={followers} label="Followers" />
      </div>
    </CenteredCard>
  )
}

type StatProps = {
  value: number
  label: string
}

function Stat({ value, label }: StatProps) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-primary font-semibold">{value}</span>
      <span className="text-neutral-600 text-xs uppercase">
        {label}
      </span>
    </div>
  )
}

export default ProfileSummaryCard