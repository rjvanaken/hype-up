import CustomCard from "../Shared/CustomCard"
import { Separator } from "@/components/ui/separator"
import RecentPoster from "./RecentPoster"
import type { RecentPoster as RecentPosterData } from "@/hooks/useHomeRecents"

export interface HomeBannerProps {
  firstname: string
  quote: string
  recentPosters: RecentPosterData[]
}

function HomeBanner({
  firstname,
  quote,
  recentPosters
}: HomeBannerProps) {

    

  return (
    <CustomCard>
        <div className="flex-col flex gap-6">
        <div className="flex-col flex gap-1">
        <p className="text-secondary text-lg font-semibold">Hey, {firstname}! <span role="img" aria-label="hand waving">👋</span>
        </p>
        <p className="text-muted-foreground text-sm">{quote}</p>
        </div>
        <Separator></Separator>
        <div className="flex gap-3">
        {recentPosters.map(p => <RecentPoster key={p.id} {...p} />)}
        </div>
        </div>

    </CustomCard>

  )

  }

  export default HomeBanner