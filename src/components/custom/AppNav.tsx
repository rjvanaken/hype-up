import { SidebarProvider, Sidebar, SidebarContent, SidebarTrigger, SidebarHeader } from "@/components/ui/sidebar"
import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { Clock, House, Search, User, Settings, LogOut, SquareCheck, Bell, ChevronDown } from "lucide-react"
import { Separator } from "../ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import logo from '@/assets/full-logo-hypeup.svg'
import { useState } from "react"
import SettingsDialog from "@/components/custom/SettingsDialog"

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `nav-link w-full text-left text-neutral-200 font-regular text-sm rounded-sm hover:text-neutral-100 hover:bg-dark-hover ${
    isActive ? "bg-dark-hover text-neutral-100 font-medium" : ""
  }`

function AppNav() {
  const unreadCount = 3 // wire this to real notification state later
  const [settingsOpen, setSettingsOpen] = useState(false)

  const settingsTabs = [
    { key: 'account', label: 'Account', title: 'Account', description: 'Manage your login details', content: null },
    { key: 'profile', label: 'Profile', title: 'Profile', description: 'Update your name and photo', content: null },
    { key: 'privacy', label: 'Privacy', title: 'Privacy', description: 'Control who can see your posts', content: null },
    { key: 'reminders', label: 'Reminders', title: 'Reminders', description: 'Manage default reminder behavior', content: null },
    { key: 'alerts', label: 'Alerts', title: 'Alerts', description: 'Choose what notifies you', content: null },
  ]

  const handleLogout = () => {
    // TODO: wire to supabase.auth.signOut(), then navigate('/login')
  }

  return (
    <div className="app-shell flex-col">
      <SidebarHeader className="sidebar-header text-white bg-secondary flex-row items-center justify-between">
              <div>
        <img src={logo} alt="" className="h-8" />  
      </div>

        <div className="flex items-center gap-4">
          <button className="relative">
            <Bell className="size-4.5 text-neutral-200" />
            {unreadCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-4 w-4 justify-center p-0 text-[10px]">
                {unreadCount}
              </Badge>
            )}
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 outline-none">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" alt="Profile" />
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSettingsOpen(true)}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>


        </div>
      </SidebarHeader>
      <SidebarProvider className="" style={{ "--sidebar-width": "12rem" } as React.CSSProperties}>
        <Sidebar>
          <SidebarContent className="bg-secondary px-3">
            <div className="flex flex-col flex-1 justify-between mb-15">
            <div className="mt-25 flex flex-col justify-start gap-1 text-neutral-200 font-regular text-sm">
              <NavLink to="/home" className={navLinkClass}>
              <span className="flex items-center size-4.5">
                <House/>
                </span>
                Home
              </NavLink>
                            <NavLink to="/profile" className={navLinkClass}>
              <span className="flex items-center size-4.5">
                <User/>
                </span>
                My Profile
              </NavLink>
                            <NavLink to="/todos" className={navLinkClass}>
              <span className="flex items-center size-4.5">
                <SquareCheck/>
                </span>
                Todos
              </NavLink>
                            <NavLink to="/reminders" className={navLinkClass}>
              <span className="flex items-center size-4.5">
                <Clock/>
                </span>
                Reminders
              </NavLink>
                            <NavLink to="/" className={navLinkClass}>
              <span className="flex items-center size-4.5">
                <Search/>
                </span>
                Find Friends (DO NOT CLICK)
              </NavLink>
            </div>
              <div className="nav-div gap-1">
            <Separator/>
            
            <button onClick={() => setSettingsOpen(true)} className={`${navLinkClass({ isActive: false })} cursor-pointer`}>
              <span className="flex items-center size-4.5">
                <Settings/>
              </span>
              Settings
            </button>

              <NavLink to="/" className={navLinkClass}>
              <span className="flex items-center size-4.5">
              {/* TODO add log out here, need to make sure all credentials are wiped so they are logged out? */}
                <LogOut/>
                </span>
                Log Out (DO NOT CLICK)
              </NavLink>
              </div>
            </div>
          </SidebarContent>
        </Sidebar>
        <main className="w-full pt-[72px]">
          <Outlet />
          {/* rest of your app */}
        </main>
      </SidebarProvider>


      <div className="page-scroll-area">
      </div>
      <div className="reverse-corner-top-left"></div>
      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} tabs={settingsTabs} />
      {/* <FAB /> */}
    </div>
  )
}         



export default AppNav