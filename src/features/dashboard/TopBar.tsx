// import { UserAvatar } from "./user-avatar"
import { Search } from "./search"
import { Menu } from 'lucide-react';
import SheetNav from './SheetNav';
import { UserAvatar } from './user-avatar';
import { ModeToggle } from "@/components/mode-toggle";
// import ThemeButton from "../../components/ThemeButton"
  
const TopBar = () => {
  
      return (
        <div className="flex flex-row justify-between items-center h-16 px-2 md:px-6 border-b">
          <div className=" items-center px-4 gap-6 ">
            <SheetNav
              title={<span className='pl-2'>Menu</span>}              
              icon={<Menu size={16} />}   
              className={"flex w-full rounded-md p-2 cursor-pointer text-sm font-normal hover:bg-muted hover:text-primary items-center"} 
            />
          </div>
          <div className="flex flex-row gap-6">
            <Search />
            <ModeToggle />
            <UserAvatar />
          </div>
        </div>
      )
  }
  export default TopBar