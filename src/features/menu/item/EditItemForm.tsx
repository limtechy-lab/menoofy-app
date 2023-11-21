import { useState, useEffect } from "react"
import { Row } from "@tanstack/react-table";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray, useWatch } from "react-hook-form"
import * as z from "zod"
import { useUpdateMyItemMutation } from './itemApiSlice'
import { useFindAllMyCategoryQuery } from "../category/categoryApiSlice"
import { useFindAllItemContentQuery } from "../itemContent/itemContentApiSlice"
import { ReloadIcon, CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { FileEdit } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormDescription,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const itemFormSchema = z.object({
  category_id: z.string().nonempty('Field is required'),
  name: z.string().nonempty('Field is required'),
  content_list: z.array(
    z.object({
      content_id: z.string().nonempty('Field is required'),
      quantity: z.coerce.number().int().min(1),
      price: z.coerce.number().int().min(1),
    })
  )

})

type ItemFormValues = z.infer<typeof itemFormSchema>

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

function EditItemForm<TData>({ row }: DataTableRowActionsProps<TData>) {

  const { toast } = useToast()

  const rowId = row.original.id
  const category = row.original.category_id

  const [ updateItem, { isLoading }] = useUpdateMyItemMutation()
  
  // const defaultValues = {
  //   category_id: category,
  //   name: row.original.name,
  //   tag: row.original.tag,
  // }
  const defaultValues: Partial<ItemFormValues> = {
    category_id: category.id,
    name: row.original.name,
    content_list: row.original.content_list
  }

  const form = useForm<ItemFormValues>({
    resolver: zodResolver(itemFormSchema),
    defaultValues,
    mode: "onChange",
    })
  
    const Total = ({ control }: { control: Control<ItemFormValues> }) => {
      const formValues = useWatch({
        name: "content_list",
        control
      });
      const total = formValues.reduce(
        (acc, current) => acc + (current.content_id.price || 0) * (current.quantity || 0),
        0
      );
      return <p>Total Amount: {total}</p>;
    };
  
    const { fields, append, remove } = useFieldArray({
      name: "content_list",
      control: form.control,
    })

  async function onSubmit(data: ItemFormValues) {

    // //     const data = JSON.stringify(data, null, 2)
    // const response = await updateItem({id:rowId, body: updateData}).unwrap()
    // toast({
    //   title: response.status,
    //   description: response.message
    // })
}

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <FileEdit size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[450px] max-h-[85vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Update Item</DialogTitle>
          <DialogDescription>
            Edit the item and save changes.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="category_id"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Item's category</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            disabled={true}
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {/* {field.value
                              ? categories.find(
                                  (category) => category.id === field.value
                                )?.name
                              : "Select category"} */}
                              {category['name']}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      {/* <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Search category..." />
                          <CommandEmpty>No category found.</CommandEmpty>
                          <CommandGroup>
                            {categories.map((category) => (
                              <CommandItem
                                value={category.name}
                                key={category.id}
                                onSelect={() => {
                                  form.setValue("category_id", category.id)
                                }}
                              >
                                <CheckIcon
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    category.id === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {category.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent> */}
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                  <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                      <Input disabled placeholder="Local dishes.." {...field} />
                      </FormControl>
                      <FormMessage />
                  </FormItem>
                  )}
              />
              <div>
                <FormDescription >
                  Add all unit contect for this item. add-Ons is when "Core" is turned off.
                </FormDescription>
                {fields.map((field, index) => (
                    <section className={"flex flex-row justify-between items-center"} key={field.id}>
                      <FormField
                        control={form.control}
                        key={field.id}
                        name={`content_list.${index}.content_id`}
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            {/* <FormLabel className={cn(index !== 0 && "sr-only")}>
                              Unit content
                            </FormLabel>     */}
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    disabled={true}
                                    className={cn(
                                      "w-[200px] justify-between",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {/* {field.value
                                      ? itemContents.find(
                                          (itemContent) => itemContent.id === field.value
                                        )?.name
                                      : "Select unit item"} */}
                                      {field.value.name}
                                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              {/* <PopoverContent className="w-[200px] p-0">
                                <Command>
                                  <CommandInput placeholder="Search unit item..." />
                                  <CommandEmpty>No category found.</CommandEmpty>
                                  <ScrollArea className="h-20 rounded-md border">
                                  <CommandGroup>
                                    {itemContents.map((itemContent) => (
                                      <CommandItem
                                        value={itemContent.name}
                                        key={itemContent.id}
                                        onSelect={() => {
                                          form.setValue(`content_list.${index}.content_id`, itemContent.id)
                                          form.setValue(`content_list.${index}.price`, itemContent.price)
                                        }}
                                      >
                                        <CheckIcon
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            itemContent.id === field.value
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                        {`${itemContent.name} - ${itemContent.varient}`}
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                  </ScrollArea>
                                </Command>
                              </PopoverContent> */}
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        // key={field.id}
                        name={`content_list.${index}.quantity`}
                        render={({ field }) => (
                          <FormItem className="flex flex-col gap-2">
                          {/* <FormLabel className={cn(index !== 0 && "sr-only ")}>
                            Quantity
                          </FormLabel> */}
                            <FormControl>
                            <Input disabled className=" w-[80px]" type="number" placeholder="1" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                      />
                      <Button disabled={true} variant="ghost" onClick={() => remove(index)}>
                      X
                      </Button>
                    </section>
                ))}
                <FormDescription>
                  <Total control={form.control} />
                </FormDescription>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={true}
                  className="mt-2"
                  onClick={() => append({ content_id: "", quantity: 1 })}
                >
                  Add unit item
                </Button>
              </div>         
              <Button 
                  className="w-full"
                  type="submit"
                  disabled={true}
              >
                  {isLoading ? (
                      <>
                          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                          Please wait...
                      </>
                      ) : (
                      <>
                          Continue
                      </>
                      )
                  }
              </Button>
            </form>
          </Form>   
        </div>
        <DialogFooter>
        </DialogFooter>   
      </DialogContent>
    </Dialog>
  )
}

export default EditItemForm