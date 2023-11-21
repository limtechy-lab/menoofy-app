import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { AddTopings } from './addTopings'
import {
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function ItemDialog({item}) {
  const contentList = item.content_list
  // const contentListName = contentList.map(item => item.content_id[0].name);
  const totalPrice = contentList?.reduce(
    (acc, current) => acc + (current.content_id.price || 0) * (current.quantity || 0),
    0
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="ghost" className="block w-full text-xs">
          <div className="flex items-center justify-between p-2">
            <div className="flex flex-row items-center gap-4">
              <Avatar className="h-6 w-6">
                <AvatarImage src="https://images.pexels.com/photos/17593640/pexels-photo-17593640/free-photo-of-a-bowl-of-ramen-with-chopsticks-and-eggs.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Avatar" />
                <AvatarFallback>IMG</AvatarFallback>
              </Avatar>
              <p className="text-xs font-medium leading-none">{item.name}</p>
            </div>
            <div className=" font-semibold">{totalPrice}</div>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <img className="w-full h-[250px] object-cover" src="https://images.pexels.com/photos/17593640/pexels-photo-17593640/free-photo-of-a-bowl-of-ramen-with-chopsticks-and-eggs.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Dish image" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{item.name}</div>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">N {totalPrice}</span>
            <p className="text-gray-700 text-base">
              Contents:
            </p>
          </div>
        </div>
        {/* <DialogHeader>
          <DialogTitle>
            
          </DialogTitle>
          <DialogDescription>
            
          </DialogDescription>
        </DialogHeader>
        <AddTopings
            title="Add-Ons"
            contentList={contentList}
          />

        <DialogFooter>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  )
}

export default ItemDialog