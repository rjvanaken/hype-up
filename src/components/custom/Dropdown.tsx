import * as React from "react"

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

type DropdownProps = {
  style?: string
}



export function Dropdown({ style = "" }: DropdownProps) {
  const [position, setPosition] = React.useState("all")
    const labels: Record<string, string> = { all: "All", hypes: "I did the thing!", helps: "I need help!" }
    labels
    const dropdownStyle = 'text-secondary text-xs';
    if (position === 'all') {
    style = 'rounded-full text-xs border-neutral-400 bg-background text-secondary font-regular hover:bg-neutral-200'
}
else {
style = 'rounded-full text-xs border-primary bg-neutral-100 text-primary font-regular hover:bg-neutral-200'
}

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button size="xs" variant="outline" className={style}><ListFilter className="h-3 w-3"/> {labels[position]}</Button>} />
      <DropdownMenuContent className="w-40">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Filter Feed by:</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            <DropdownMenuRadioItem className={dropdownStyle} value="all"> <LayoutGrid /> All Posts</DropdownMenuRadioItem>
            <DropdownMenuRadioItem className={dropdownStyle} value="hypes"><PartyPopper /> I did the thing!</DropdownMenuRadioItem>
            <DropdownMenuRadioItem className= {dropdownStyle} value="helps"><LifeBuoy /> I need help!</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
