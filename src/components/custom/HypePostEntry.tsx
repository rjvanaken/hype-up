import CenteredCard from '@/components/custom/CenteredCard'
import { CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { Check, X } from 'lucide-react'
import TopPage from './TopPage'
import FormSelectField from './FormSelectField'

function HypePostEntry() {
  const navigate = useNavigate()

  return (
    <TopPage>
    <CenteredCard>
      <CardHeader className="flex items-center justify-between border-b pb-4">
        <span className="flex items-center gap-2.5">
          <span className="flex items-center justify-center size-6.5 rounded-full bg-primary">
            <Check className="size-4.5 text-primary-foreground" aria-hidden="true" />
          </span>
          <CardTitle className='text-md font-semibold'>What did you do?</CardTitle>
        </span>
        <X className="size-5" aria-hidden="true" />
      </CardHeader>
      <CardContent className='mt-2'>
        <FormSelectField
          label="What did you get done?"
          id="task"
          placeholder="Pick a task..."
          options={[
            { value: 'dishes', label: 'Dishes' },
            { value: 'laundry', label: 'Laundry' },
            { value: 'email', label: "That email you've been avoiding" },
          ]}
        />
      </CardContent>
      <CardFooter className="flex flex-col gap-3 mt-2">
        <Button size="lg" className="w-full" onClick={() => navigate('/home')}>  {/* temporary */}
          Post
        </Button>
      </CardFooter>
    </CenteredCard>
    </TopPage>
  )
}

export default HypePostEntry