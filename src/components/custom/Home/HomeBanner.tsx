import { Hand } from "lucide-react"
import CustomCard from "../Shared/CustomCard"

export interface HomeBannerProps {
  firstname: string
  quote: string
}

function HomeBanner({
  firstname,
  quote,
//   UnlikedPostUpdates
}: HomeBannerProps) {

    

  return (
    <CustomCard>
        <div className="flex-col flex gap-1">
        <p className="text-secondary text-lg font-semibold">Hey, {firstname}! <span role="img" aria-label="fire">🔥</span>
        </p>
        <p className="text-muted-foreground text-sm">{quote}</p>
        </div>

    </CustomCard>

  )

  }

  export default HomeBanner