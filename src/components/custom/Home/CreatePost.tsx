import FormSelectField from '@/components/custom/Shared/FormSelectField'
import FormField from '@/components/custom/Shared/FormField'
import AppButton from '@/components/custom/Shared/AppButton'
import { LifeBuoy, PartyPopper } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ActionDialog from '../Shared/ActionDialog'
import { cn } from '@/lib/utils'


const generalTaskPlaceholder = "Pick a task...";
const generalOtherDescription = "Describe it";
const generalPhotoLabel = "Add photos";


type CreatePostProps = {
  boostMode: boolean
  open: boolean
  onOpenChange: (open: boolean) => void
}

function CreatePost({ boostMode, open, onOpenChange }: CreatePostProps) {
  const navigate = useNavigate()
  const [task, setTask] = useState('')
  const [note, setNote] = useState('')
  const [description, setDescription] = useState('')
  const [image, uploadImage] = useState('')

  const title = boostMode ? "Asking for a boost" : "What did you do?"
  const taskLabel = boostMode ? "What do you need to do?" : "Task type"
  const noteLabel = boostMode ? "What's got you stuck?" : "Note"
  const notePlaceholder = boostMode ? "Ask for some encouragement..." : "How does it feel?"
  const photoSubtext = boostMode ? "optional, if it helps explain" : "optional proof of the deed"
  const submitLabel = boostMode ? "Ask for hype" : "Post it"


  return (
    <ActionDialog
      open={open}
      onOpenChange={onOpenChange}
      title={
        <span className="flex items-center gap-2.5">
          <span className={cn(
            "flex items-center justify-center size-6.5 rounded-full",
            boostMode ? "bg-secondary" : "bg-primary"
          )}>
            {boostMode ? (
              <LifeBuoy className="size-4.5 text-secondary-foreground" aria-hidden="true" />
            ) : (
              <PartyPopper className="size-4.5 text-primary-foreground" aria-hidden="true" />
            )}
          </span>
          {title}
        </span>
      }
      footer={
        <>
          <AppButton variant="alternate" onClick={() => onOpenChange(false)}>
            Cancel
          </AppButton>
          <AppButton variant="default" disabled={!task} onClick={() => navigate('/home')}>  {/* temporary */}
            {submitLabel}
          </AppButton>
        </>
      }
    >
      <FormSelectField
        onValueChange={(value) => setTask(value ?? '')}
        label={taskLabel}
        id="task"
        placeholder={generalTaskPlaceholder}
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
        placeholder={generalOtherDescription}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        />
      )}

      <FormField
        className='border-1 placeholder:text-sm'
        id="note"
        multiline
        label={<>{noteLabel} <span className="text-primary text-sm">(optional)</span></>}
        placeholder={notePlaceholder}
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <FormField
        className='border-1 placeholder:text-sm'
        id="picture"
        file
        label={<>{generalPhotoLabel} <span className="text-primary text-sm">{photoSubtext}</span></>}
        value={image}
        onChange={(e) => uploadImage(e.target.value)}
      />
    </ActionDialog>
  )
}

export default CreatePost
