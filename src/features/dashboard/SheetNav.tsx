import { Link } from "react-router-dom"
import { Home, Users, ChefHat, UtensilsCrossed } from 'lucide-react';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area";

function SheetNav({icon, className, title, }) {

  const Menus = [
    { title: "Dashboard", icon: <Home size={16} />, to: "/dashboard" },
    { title: "Kitchen", icon: <ChefHat size={16} />, to: "/dashboard/kitchen" },
    { title: "Menu", icon: <UtensilsCrossed size={16} />, to: "/dashboard/menu" },

    { title: "Profile", icon: <Users size={16} />, to: "/dashboard/profile", gap: true },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          className={className}
          // variant="outline"
        >
          {icon}
          {title}
        </button>
      </SheetTrigger>
        <SheetContent className={"w-2/3 md:w-1/3"} side={"left"}>
        <ScrollArea className="h-full w-full">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <div className="pt-6">
              {Menus.map((Menu, index) => (
                <SheetClose asChild>
                  <Link to={Menu.to}
                    key={index}
                    className={`flex rounded-sm p-2 cursor-pointer bg-background hover:bg-muted hover:text-primary items-center gap-x-4 
                    ${Menu.gap ? "mt-9" : "mt-2"} 
                    `}
                  >
                    <span>{Menu.icon}</span>
                    <span className={` text-xs font-normal origin-left duration-200`}>
                      {Menu.title}
                    </span>
                  </Link>
                </SheetClose>
              ))}
            </div>
      </ScrollArea>
        </SheetContent>
    </Sheet>
  )
}

export default SheetNav
