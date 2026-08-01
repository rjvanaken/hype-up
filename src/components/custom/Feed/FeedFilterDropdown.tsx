import { Button } from "@/components/ui/button"
import { LayoutGrid, ListFilter, PartyPopper, LifeBuoy} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type FeedFilter = 'all' | 'hypes' | 'helps'

type DropdownProps = {
  value: FeedFilter
  onValueChange: (value: FeedFilter) => void
}

export function Dropdown({ value, onValueChange }: DropdownProps) {
    const labels: Record<FeedFilter, string> = { all: "All", hypes: "I did the thing!", helps: "I need help!" }
    const dropdownStyle = 'text-secondary text-xs';
    const style = value === 'all'
      ? 'rounded-full text-xs border-neutral-400 bg-background text-secondary font-regular hover:bg-neutral-200'
      : 'rounded-full text-xs border-primary bg-neutral-100 text-primary font-regular hover:bg-neutral-200'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button size="xs" variant="outline" className={style}><ListFilter className="h-3 w-3"/> {labels[value]}</Button>} />
      <DropdownMenuContent className="w-40">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Filter Feed by:</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={value} onValueChange={(newValue) => onValueChange(newValue as FeedFilter)}>
            <DropdownMenuRadioItem className={dropdownStyle} value="all"> <LayoutGrid /> All Posts</DropdownMenuRadioItem>
            <DropdownMenuRadioItem className={dropdownStyle} value="hypes"><PartyPopper /> I did the thing!</DropdownMenuRadioItem>
            <DropdownMenuRadioItem className= {dropdownStyle} value="helps"><LifeBuoy /> I need help!</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
