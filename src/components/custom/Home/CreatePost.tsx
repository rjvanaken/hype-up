import FormSelectField from '@/components/custom/Shared/FormSelectField'
import FormField from '@/components/custom/Shared/FormField'
import AppButton from '@/components/custom/Shared/AppButton'
import { LifeBuoy, PartyPopper } from 'lucide-react'
import { useState } from 'react'
import ActionDialog from '../Shared/ActionDialog'
import { cn } from '@/lib/utils'
import { taskOptions } from '@/lib/taskOptions'
import { useCreatePost } from '@/hooks/useCreatePost'
import { usePostsRefresh } from '@/hooks/usePostsRefresh'


const generalTaskPlaceholder = "Pick a task...";
const generalOtherDescription = "Describe it";
const generalPhotoLabel = "Add photos";


type CreatePostProps = {
  boostMode: boolean
  open: boolean
  onOpenChange: (open: boolean) => void
}

function CreatePost({ boostMode, open, onOpenChange }: CreatePostProps) {
  const { createPost, isSubmitting } = useCreatePost()
  const { triggerRefresh } = usePostsRefresh()
  const [task, setTask] = useState('')
  const [note, setNote] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState<File | null>(null)

  const title = boostMode ? "Asking for a boost" : "What did you do?"
  const taskLabel = boostMode ? "What do you need to do?" : "Task type"
  const noteLabel = boostMode ? "What's got you stuck?" : "Note"
  const notePlaceholder = boostMode ? "Ask for some encouragement..." : "How does it feel?"
  const photoSubtext = boostMode ? "optional, if it helps explain" : "optional proof of the deed"
  const submitLabel = boostMode ? "Ask for hype" : "Post it"

  async function handleSubmit() {
    const success = await createPost({ boostMode, task, description, note, image })

    if (success) {
      setTask('')
      setNote('')
      setDescription('')
      setImage(null)
      onOpenChange(false)
      triggerRefresh()
    }
  }


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
          <AppButton variant="default" disabled={!task || isSubmitting} onClick={handleSubmit}>
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
        options={taskOptions}
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
        onChange={(e) => setImage(e.target.files?.[0] ?? null)}
      />
    </ActionDialog>
  )
}

export default CreatePost
