import { SidebarProvider, Sidebar, SidebarContent, SidebarTrigger, SidebarHeader } from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"


function AppNav() {
  return (
      <div className="app-shell flex-col">
        <SidebarHeader className="sidebar-header text-white bg-secondary">TESTINGTESTING123</SidebarHeader>
    
    <SidebarProvider className="">
      <Sidebar>
        <SidebarContent className="bg-secondary">
          {/* your nav items go here */}
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