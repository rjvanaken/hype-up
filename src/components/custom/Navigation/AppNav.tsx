import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"
import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { Clock, House, Search, User, Settings, LogOut, SquareCheck, Bell, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { Separator } from "../../ui/separator"
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
import SettingsDialog from "@/components/custom/Shared/SettingsDialog"
import AccountSettingsContent from "@/components/custom/Settings/AccountSettingsContent"
import ProfileSettingsContent from "@/components/custom/Settings/ProfileSettingsContent"
import FAB from "@/components/custom/Shared/FAB"
import CreatePost from "@/components/custom/Home/CreatePost"
import { PostsRefreshProvider } from "@/hooks/usePostsRefresh"
import { supabase } from '@/lib/client'
import { useProfile } from "@/hooks/useProfile"

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `nav-link w-full text-left text-neutral-200 font-regular text-sm rounded-sm hover:text-neutral-100 hover:bg-dark-hover ${
    isActive ? "bg-dark-hover text-neutral-100 font-medium" : ""
  }`

function AppNav() {
  const unreadCount = 3 // wire this to real notification state later
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [createPostOpen, setCreatePostOpen] = useState(false)
  const [boostMode, setBoostMode] = useState(false)


  const initials = useProfile()?.initials ?? '?'


  const handleFabSelect = (selectedBoostMode: boolean) => {
    setBoostMode(selectedBoostMode)
    setCreatePostOpen(true)
  }

  const settingsTabs = [
    { key: 'account', label: 'Account', title: 'Account', description: 'Manage your login email and password', content: <AccountSettingsContent /> },
    { key: 'profile', label: 'Profile', title: 'Profile', description: 'Customize how you appear to others', content: <ProfileSettingsContent /> },
    { key: 'privacy', label: 'Privacy', title: 'Privacy', description: 'Control who can see your posts and activity', content: null },
    { key: 'reminders', label: 'Reminders', title: 'Reminders', description: 'Manage default reminder behavior', content: null },
    { key: 'alerts', label: 'Alerts', title: 'Alerts', description: 'Choose what you get notified about', content: null },
  ]

  const navigate = useNavigate()

  const handleLogout = async () => {
    const {error} = await supabase.auth.signOut({
      scope:"local",
    })

    if (error) {
      console.error('Error logging out:', error.message)
    }

    navigate('/login', {replace: true})
  }

  return (
    <PostsRefreshProvider>
    <div className="app-shell flex-col z-200">
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
                            <AvatarFallback
                className="text-xs font-semibold text-foreground bg-card">
                {initials}
            </AvatarFallback>
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
      <SidebarProvider
        open={sidebarOpen}
        onOpenChange={setSidebarOpen}
        style={{ "--sidebar-width": "12.5rem", "--sidebar-width-icon": "4.5rem" } as React.CSSProperties}
      >
        <Sidebar collapsible="icon">
          <SidebarContent className="bg-secondary px-3">
            <div className="flex flex-col flex-1 justify-between mb-5">
            <div className="mt-28 flex flex-col justify-start gap-3 text-neutral-200 font-regular text-sm">
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
                Find Friends
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

              <button
                type="button"
                onClick={handleLogout}
                className={`${navLinkClass({ isActive: false })} cursor-pointer`}
              >
                <span className="flex items-center size-4.5">
                  <LogOut />
                </span>
                Log Out
              </button>
              </div>
            </div>
          </SidebarContent>
          <SidebarRail>
            <span className="pointer-events-none absolute top-1/2 left-1/2 flex size-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-sidebar-border bg-sidebar text-sidebar-foreground shadow-sm">
              {sidebarOpen ? <ChevronLeft className="size-3.5" /> : <ChevronRight className="size-3.5" />}
            </span>
          </SidebarRail>
        </Sidebar>
        <main className="w-full pt-[72px]">
          <Outlet />
          {/* rest of your app */}
        </main>
      </SidebarProvider>


      <div className="page-scroll-area">
      </div>
      <div className={`reverse-corner-top-left ${sidebarOpen ? "" : "collapsed"}`}></div>
      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} tabs={settingsTabs} />
      <CreatePost boostMode={boostMode} open={createPostOpen} onOpenChange={setCreatePostOpen} />
      <FAB onSelect={handleFabSelect} />
    </div>
    </PostsRefreshProvider>
  )
}



export default AppNav