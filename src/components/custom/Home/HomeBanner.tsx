import { useMemo } from "react"
import CustomCard from "../Shared/CustomCard"
import { Separator } from "@/components/ui/separator"
import RecentPoster from "./RecentPoster"
import type { RecentPoster as RecentPosterData } from "@/hooks/useHomeRecents"
import { bannerQuotes } from "@/lib/bannerQuotes"

export interface HomeBannerProps {
  firstname: string
  recentPosters: RecentPosterData[]
}

function getRandomQuote(items: string[]) {
    const index = Math.floor(Math.random() * items.length)
    return items[index]
}

function HomeBanner({
  firstname,
  recentPosters
}: HomeBannerProps) {

  const quote = useMemo(() => getRandomQuote(bannerQuotes), [])

  return (
    <CustomCard className="banner">
        <div className="flex-col flex gap-6">
        <div className="flex-col flex gap-1">
        <p className="text-secondary text-lg font-semibold">Hey, {firstname}! <span role="img" aria-label="hand waving">👋</span>
        </p>
        <p className="text-muted-foreground text-sm p-2 ">"{quote}"</p>
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