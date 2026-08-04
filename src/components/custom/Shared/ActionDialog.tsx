import { Dialog, DialogPortal, DialogOverlay } from '@/components/ui/dialog'
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { XIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

function ActionDialog({
  open,
  onOpenChange,
  title,
  children,
  footer,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: React.ReactNode
  children: React.ReactNode
  footer: React.ReactNode
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="z-999"/>
        <DialogPrimitive.Popup
          className={cn(
            "fixed top-1/2 left-1/2 z-999 -translate-x-1/2 -translate-y-1/2",
            "w-full max-w-[400px] rounded-xl border border-neutral-300 bg-popover shadow-md outline-none p-6",
            "data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0"
          )}
        >
          <div className="flex items-start justify-between mb-4">
            <p className="text-lg font-bold">{title}</p>
            <DialogPrimitive.Close className="cursor-pointer">
              <XIcon className="size-5" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          </div>

          <div className="flex flex-col gap-3">
            {children}
          </div>

          <div className="flex gap-3 mt-6">
            {footer}
          </div>
        </DialogPrimitive.Popup>
      </DialogPortal>
    </Dialog>
  )
}

export default ActionDialog