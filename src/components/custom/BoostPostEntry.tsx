import CustomCard from '@/components/custom/CustomCard'
import { CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import FormSelectField from '@/components/custom/FormSelectField'
import FormField from '@/components/custom/FormField'
import { Button } from '@/components/ui/button'
import { X, LifeBuoy } from 'lucide-react'
import TopPage from './TopPage'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


type BoostPostEntryProps = {
  onClose: () => void
}

function BoostPostEntry({ onClose }: BoostPostEntryProps) {
  const navigate = useNavigate()
  const [task, setTask] = useState('')
  const [note, setNote] = useState('')
  const [description, setDescription] = useState('')
  const [image, uploadImage] = useState('')
  return (
    <TopPage>
      <CustomCard>
        <CardHeader className="flex items-center justify-between border-b pb-4">
          <span className="flex items-center gap-2.5">
            <span className="flex items-center justify-center size-6.5 rounded-full bg-primary">
              <LifeBuoy className="size-4.5 text-primary-foreground" aria-hidden="true" />
            </span>
            <CardTitle className='text-md font-semibold'>What do you need help with?</CardTitle>
          </span>
          <Button variant='ghost' className='w-5 h-5' aria-label="Close" onClick={() => onClose()} >
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

          {task === 'other' && (
            <FormField
            className='border-1 placeholder:text-sm'
            id="description"
            label={<>Description</>}
            placeholder="Describe it"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />
          )}
          

          <FormField
            className='border-1 placeholder:text-sm'
            id="note"
            multiline
            label={<>Note <span className="text-primary text-sm">(optional)</span></>}
            placeholder="Ask for some encouragement..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <FormField
            className='border-1 placeholder:text-sm'
            id="picture"
            file
            label={<>Add an image <span className="text-primary text-sm">(optional)</span></>}
            value={image}
            onChange={(e) => uploadImage(e.target.value)}
          />


        </CardContent>
        <CardFooter className="flex flex-col gap-3 mt-2">
          <Button size="lg" className="w-full" disabled={!task} onClick={() => navigate('/home')}>  {/* temporary */}
            Post
          </Button>
        </CardFooter>
      </CustomCard>
    </TopPage>
  )
}

export default BoostPostEntry
