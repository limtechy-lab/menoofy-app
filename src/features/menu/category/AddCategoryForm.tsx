import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useAddCategoryMutation } from './categoryApiSlice'
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


const categoryFormSchema = z.object({
  store_id: z.string().nonempty('Field is required'),
  name: z.string().nonempty('Field is required'),
  tag: z.string().nonempty('Field is required')
})

type CategoryFormValues = z.infer<typeof categoryFormSchema>

const defaultValues = {
  store_id: '',
  name: '',
  tag: ''
}

function AddCategoryForm() {

  const { toast } = useToast()
  const [store, setStore] = useState({});
  
  const { data, isFetching } = useGetMyStoreQuery(undefined, {
    // refetchOnFocus: true,
    // refetchOnMountOrArgChange: true
  });

  useEffect(() => {
    if (!data) return;
    const { data: storeData } = data ?? {};
    setStore(storeData);
  }, [data]);

  const [ addCategory, { isLoading } ] = useAddCategoryMutation()

  const form = useForm<CategoryFormValues>({
  resolver: zodResolver(categoryFormSchema),
  defaultValues,
  mode: "onChange",
  })

  async function onSubmit(data: CategoryFormValues) {
    //     const data = JSON.stringify(data, null, 2)
    try {
      const response = await addCategory(data).unwrap()
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
        <Button>New Category</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[450px] max-h-[85vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>New Category</DialogTitle>
          <DialogDescription>
            Add a new category.
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
                          <SelectValue placeholder="Select your Kitchen" />
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
                      <Input placeholder="Local dishes.." {...field} />
                      </FormControl>
                      <FormMessage />
                  </FormItem>
                  )}
              />
              <FormField
                  control={form.control}
                  name="tag"
                  render={({ field }) => (
                  <FormItem>
                      <FormLabel>Tag</FormLabel>
                      <FormControl>
                      <Input placeholder="food or drink.." {...field} />
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

export default AddCategoryForm