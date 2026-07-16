import CenteredCard from '@/components/custom/CenteredCard'
import { CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { X, LifeBuoy } from 'lucide-react'
import TopPage from './TopPage'


type BoostPostEntryProps = {
    onClose: () => void
}

function BoostPostEntry({ onClose}: BoostPostEntryProps) {
  return (
    <TopPage>
    <CenteredCard>
      <CardHeader className="flex items-center justify-between border-b pb-4">
        <span className="flex items-center gap-2.5">
          <span className="flex items-center justify-center size-6.5 rounded-full bg-primary">
            <LifeBuoy className="size-4.5 text-primary-foreground" aria-hidden="true" />
          </span>
          <CardTitle className='text-md font-semibold'>Asking for a boost</CardTitle>
        </span>
          <Button variant='ghost' className='w-5 h-5' aria-label="Close" onClick={() => onClose()} >
        <X className="size-5" aria-hidden="true" />
            </Button>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Label>What do you need to do?</Label>
      </CardContent>
    </CenteredCard>
    </TopPage>
  )
}

export default BoostPostEntry
