import { SidebarProvider, Sidebar, SidebarContent, SidebarTrigger, SidebarHeader } from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"


function AppNav() {
  return (
      <div className="app-shell flex-col">
        {/* <SidebarHeader className="card-glass sidebar-header text-white">TESTINGTESTING123</SidebarHeader> */}

    <SidebarProvider className="card-glass">
      <Sidebar className="card-glass">
        <SidebarContent className="card-glass">
          {/* your nav items go here */}
        </SidebarContent>
      </Sidebar>
      <main className="w-full ">
        <Outlet />
        {/* rest of your app */}
      </main>
    </SidebarProvider>


      <div className="page-scroll-area transparent">
      </div>
      <div className="reverse-corner-top-left"></div>
            {/* <FAB /> */}
    </div>
  )
}



export default AppNav