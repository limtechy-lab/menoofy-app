import { Row } from "@tanstack/react-table";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useUpdateItemContentMutation } from './itemContentApiSlice'
import { ReloadIcon } from "@radix-ui/react-icons"
import { FileEdit } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"

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

const itemContentFormSchema = z.object({
  store_id: z.string().nonempty('Field is required'),
  name: z.string().nonempty('Field is required'),
  varient: z.string().optional(),
  price: z.coerce.number().int().min(1)
})

type ItemContentFormValues = z.infer<typeof itemContentFormSchema>

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

function EditItemContentForm<TData>({ row }: DataTableRowActionsProps<TData>) {

  const { toast } = useToast()

  const rowId = row.original.id
  const store = row.original.store_id['name']

  const [ updateItemContent, { isLoading }] = useUpdateItemContentMutation()
  
  const defaultValues = {
    store_id: store,
    name: row.original.name,
    varient: row.original.varient,
    price: row.original.price
  }

  const form = useForm<ItemContentFormValues>({
  resolver: zodResolver(itemContentFormSchema),
  defaultValues,
  mode: "onChange",
  })

  async function onSubmit(data: ItemContentFormValues) {
    const updateData = {
      name: data.name,
      varient: data.varient,
      price: data.price,
    }
    //     const data = JSON.stringify(data, null, 2)
    const response = await updateItemContent({id:rowId, body: updateData}).unwrap()
    toast({
      title: response.status,
      description: response.message
    })
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
          <DialogTitle>Update ItemContent</DialogTitle>
          <DialogDescription>
            Edit the itemContent and save changes.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6">
          <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                      control={form.control}
                      name="store_id"
                      render={({ field }) => (
                      <FormItem>
                          <FormLabel>Store</FormLabel>
                          <FormControl>
                          <Input disabled {...field} />
                          </FormControl>
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
                          <Input placeholder="Rice" {...field} />
                          </FormControl>
                          <FormMessage />
                      </FormItem>
                      )}
                  />
                  <FormField
                      control={form.control}
                      name="varient"
                      render={({ field }) => (
                      <FormItem>
                          <FormLabel>Varient</FormLabel>
                          <FormControl>
                          <Input placeholder="Jellof" {...field} />
                          </FormControl>
                          <FormMessage />
                      </FormItem>
                      )}
                  />
                  <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                      <FormItem>
                          <FormLabel>Price</FormLabel>
                          <FormControl>
                          <Input type='number' placeholder="700" {...field} />
                          </FormControl>
                          <FormMessage />
                      </FormItem>
                      )}
                  />      
                  <Button 
                      className="w-full"
                      type="submit"
                      disabled={isLoading}
                  >
                      {isLoading ? (
                          <>
                              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                              Please wait...
                          </>
                          ) : (
                          <>
                              Save changes
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

export default EditItemContentForm