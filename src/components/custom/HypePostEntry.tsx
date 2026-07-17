import CenteredCard from '@/components/custom/CenteredCard'
import { CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { Check, PartyPopper, X } from 'lucide-react'
import TopPage from './TopPage'
import FormSelectField from './FormSelectField'
import FormField from '@/components/custom/FormField'
import { useState } from 'react'



type HypePostEntryProps = {
    onClose: () => void
}

function HypePostEntry({ onClose}: HypePostEntryProps) {

  const navigate = useNavigate()
  const [task, setTask] = useState('')
  const [image, uploadImage] = useState('')

  return (
    <TopPage>
    <CenteredCard>
      <CardHeader className="flex items-center justify-between border-b pb-4">
        <span className="flex items-center gap-2.5">
          <span className="flex items-center justify-center size-6.5 rounded-full bg-primary">
            <PartyPopper className="size-4 text-primary-foreground"aria-hidden="true" />
          </span>
          <CardTitle className='text-md font-semibold'>What did you do?</CardTitle>
        </span>
          <Button variant='ghost' className='w-5 h-5' aria-label="Close" onClick={() => {onClose()}} >
        <X className="size-5" aria-hidden="true" />
            </Button>
      </CardHeader>
      <CardContent className='mt-2 flex flex-col gap-5'>
        <FormSelectField
          onValueChange={(value) => setTask(value ?? '')}
          label="Task"
          id="task"
          placeholder="Pick a task..."
          options={[
            { value: 'laundry', label: 'Laundry' },
            { value: 'dishes', label: 'Dishes' },
            { value: 'cleaning', label: 'Cleaning' },
            { value: 'grocery-shopping', label: 'Grocery shopping' },
            { value: 'exercise', label: 'Exercise' },
            { value: 'studying', label: 'Studying' },
            { value: 'cooking', label: 'Cooking' },
            { value: 'taking-out-trash', label: 'Taking out trash' },
            { value: 'send-email', label: 'Sent an email' },
            { value: 'other', label: 'Other' },
          ]}
        />
        <FormField
        className='border-1 placeholder:text-sm'
          id="note"
          multiline
          label={<>Note <span className="text-primary">(optional)</span></>}
          placeholder="How did it feel?"
          />

          <FormField
          className='border-1 placeholder:text-sm'
          id="picture"
          file
          label={<>Add an image <span className="text-primary">(optional)</span></>}
          value={image}
          onChange={(e) => uploadImage(e.target.value)}
          />



      </CardContent>
      <CardFooter className="flex flex-col gap-3 mt-2">
        <Button size="lg" className="w-full" disabled={!task} onClick={() => navigate('/home')}>  {/* temporary */}
          Post
        </Button>
      </CardFooter>
    </CenteredCard>
    </TopPage>
  )
}

export default HypePostEntry