import { useState } from 'react'
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { Dialog, DialogPortal, DialogOverlay } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { XIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import FormField from './FormField'

export type SettingsTab = {
  key: string
  label: string
  title: string
  description: string
  content: React.ReactNode
}

export function SettingsSectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-4">
      <p className="text-base font-bold">{title}</p>
      <p className="text-sm text-secondary">{description}</p>
    </div>
  )
}

function SettingsDialog({
  open,
  onOpenChange,
  tabs,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  tabs: SettingsTab[]
}) {
  const [activeKey, setActiveKey] = useState(tabs[0]?.key)
  const activeTab = tabs.find((t) => t.key === activeKey) ?? tabs[0]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Popup
        className={cn(
            "fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
            "min-w-[700px] max-w-[860px] rounded-xl border border-neutral-300 bg-popover shadow-md outline-none p-6",
            "data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0"
        )}
        >

          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-lg font-bold">Settings</p>
              <p className="text-sm text-secondary">Manage your account and profile settings</p>
            </div>
            <DialogPrimitive.Close render={<Button variant="ghost" size="icon-lg" />}>
              <XIcon className="size-5" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          </div>

          <div className="flex items-start min-h-[520px]">
            <nav className="w-[160px] shrink-0 border-r border-neutral-200 pr- flex flex-col gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveKey(tab.key)}
                  className={cn(
                    "text-left text-sm px-3 py-2 transition-colors cursor-pointer border-l-4",
                    tab.key === activeKey
                      ? "bg-primary/10 text-primary font-semibold border-primary"
                      : "text-muted-foreground font-medium border-transparent hover:bg-muted"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </nav>

            <div className="flex-1 pl-6 overflow-y-auto">
            {activeTab && (
                <>
                <SettingsSectionHeader title={activeTab.title} description={activeTab.description} />
                <div className="flex flex-col gap-4 pt-2">
                    {activeTab.content}
                </div>
                </>
            )}
            </div>
          </div>
        </DialogPrimitive.Popup>
      </DialogPortal>
    </Dialog>
  )
}

export default SettingsDialog