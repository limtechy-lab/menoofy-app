import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster"

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
        <Outlet />
        <div className="block inset-x-0 bottom-0 text-sm text-gray-500 sm:text-center p-1">
          <span>© All Rights Reserved by LIMTECHY LAB LIMITED.</span>
        </div>
        < Toaster />
    </div>
    
  )
}

export default Layout
