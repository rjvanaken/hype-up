import { useState } from 'react'
import { Plus, X, LifeBuoy, PartyPopper } from 'lucide-react'
import { cn } from '@/lib/utils'

type FABProps = {
  onSelect: (boostMode: boolean) => void
}

function FAB({ onSelect }: FABProps) {
  const [expanded, setExpanded] = useState(false)

  function handleSelect(boostMode: boolean) {
    setExpanded(false)
    onSelect(boostMode)
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {expanded && (
        <div className="flex flex-col items-end gap-3">
          <button
            className="flex items-center gap-3 rounded-full cursor-pointer bg-popover pl-2 pr-5 py-2 shadow-md"
            onClick={() => handleSelect(true)}
          >
            <span className="flex items-center justify-center size-9 rounded-full bg-secondary shrink-0">
              <LifeBuoy className="size-5.5 text-secondary-foreground" aria-hidden="true" />
            </span>
            <span className="font-semibold text-sm whitespace-nowrap">I need a boost</span>
          </button>

          <button
            className="flex items-center gap-3 rounded-full bg-popover cursor-pointer pl-2 pr-5 py-2 shadow-md"
            onClick={() => handleSelect(false)}
          >
            <span className="flex items-center cursor-pointer justify-center size-9 rounded-full bg-primary shrink-0">
              <PartyPopper className="size-4.5 text-primary-foreground" aria-hidden="true" />
            </span>
            <span className="font-semibold text-sm whitespace-nowrap">Share what I did</span>
          </button>
        </div>
      )}

      <button
        className={cn(
          "flex items-center justify-center cursor-pointer size-14 rounded-full bg-primary text-primary-foreground shadow-lg transition-transform",
          expanded && "rotate-90"
        )}
        aria-label={expanded ? "Close" : "Create post"}
        onClick={() => setExpanded((v) => !v)}
      >
        {expanded ? <X className="size-6" aria-hidden="true" /> : <Plus className="size-6" aria-hidden="true" />}
      </button>
    </div>
  )
}

export default FAB
