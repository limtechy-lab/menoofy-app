import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useAddItemContentMutation } from './itemContentApiSlice'
import { useGetMyStoreQuery } from "../../kitchen/storeApiSlice"
import { ReloadIcon } from "@radix-ui/react-icons"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


const itemContentFormSchema = z.object({
  store_id: z.string().nonempty('Field is required'),
  name: z.string().nonempty('Field is required'),
  varient: z.string().optional(),
  price: z.coerce.number().int().min(1)
})

type ItemContentFormValues = z.infer<typeof itemContentFormSchema>

const defaultValues = {
  store_id: '',
  name: '',
  varient: '',
  price: 100
}

function AddItemContentForm() {

  const { toast } = useToast()
  const [store, setStore] = useState({});
  
  const { data } = useGetMyStoreQuery(undefined, {
    // refetchOnFocus: true,
    // refetchOnMountOrArgChange: true
  });

  useEffect(() => {
    if (!data || !data.data) return;
    const { data: storeData } = data ?? {};
    setStore(storeData);
  }, [data]);

  const [ addItemContent, { isLoading } ] = useAddItemContentMutation()

  const form = useForm<ItemContentFormValues>({
  resolver: zodResolver(itemContentFormSchema),
  defaultValues,
  mode: "onChange",
  })

  async function onSubmit(data: ItemContentFormValues) {
    //     const data = JSON.stringify(data, null, 2)
    try {
      const response = await addItemContent(data).unwrap()
      toast({
        title: response.status,
        description: response.message
      })
    } catch (error) {
      toast({
        title: "Server error",
        description: "Oops. Something went wrong, please try again"
      }) 
    }
}

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Unit Item</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[450px] max-h-[85vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>New Unit Item</DialogTitle>
          <DialogDescription>
            Add unit item to your kitchen, this will be use when creating menu list.
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
                    <FormLabel>Kitchen</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select the itemContent's store" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                          <SelectItem value={store.id}>
                            {store.name}
                          </SelectItem>
                      </SelectContent>
                    </Select>
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
                      <FormLabel>Unit price</FormLabel>
                      <FormControl>
                      <Input type='number' placeholder="500" {...field} />
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

export default AddItemContentForm