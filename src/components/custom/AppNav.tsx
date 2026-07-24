import { SidebarProvider, Sidebar, SidebarContent, SidebarTrigger, SidebarHeader } from "@/components/ui/sidebar"
import { NavLink, Outlet } from "react-router-dom"
import { Clock, House, Search, User, Settings, LogOut, SquareCheck, Bell } from "lucide-react"
import { Separator } from "../ui/separator"

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `nav-link text-neutral-200 font-regular text-sm rounded-sm hover:text-neutral-100 hover:bg-dark-hover ${
    isActive ? "bg-dark-hover text-neutral-100 font-medium" : ""
  }`

function AppNav() {
  return (
    <div className="app-shell flex-col">
      <SidebarHeader className="sidebar-header text-white bg-secondary">TESTINGTESTING123</SidebarHeader>
      <SidebarProvider className="">
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
              <NavLink to="/" className={navLinkClass}>
              <span className="flex items-center size-4.5">
                <Settings/>
                </span>
                Settings (DO NOT CLICK)
              </NavLink>
              {/* TODO when we have modal working for settings, fix this here */}

              <NavLink to="/" className={navLinkClass}>
              <span className="flex items-center size-4.5">
                <LogOut/>
                </span>
                Log Out (DO NOT CLICK)
              </NavLink>
              </div>
            </div>
          </SidebarContent>
        </Sidebar>
        <main className="w-full ">
          <Outlet />
          {/* rest of your app */}
        </main>
      </SidebarProvider>


      <div className="page-scroll-area">
      </div>
      <div className="reverse-corner-top-left"></div>
      {/* <FAB /> */}
    </div>
  )
}         



export default AppNav