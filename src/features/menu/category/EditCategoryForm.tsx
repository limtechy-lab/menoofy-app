import { Row } from "@tanstack/react-table";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useUpdateMyCategoryMutation } from './categoryApiSlice'
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

const categoryFormSchema = z.object({
  store_id: z.string().nonempty('Field is required'),
  name: z.string().nonempty('Field is required'),
  tag: z.string().nonempty('Field is required'),
})

type CategoryFormValues = z.infer<typeof categoryFormSchema>

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

function EditCategoryForm<TData>({ row }: DataTableRowActionsProps<TData>) {

  const { toast } = useToast()

  const rowId = row.original.id
  const store = row.original.store_id['name']

  const [ updateCategory, { isLoading }] = useUpdateMyCategoryMutation()
  
  const defaultValues = {
    store_id: store,
    name: row.original.name,
    tag: row.original.tag,
  }

  const form = useForm<CategoryFormValues>({
  resolver: zodResolver(categoryFormSchema),
  defaultValues,
  mode: "onChange",
  })

  async function onSubmit(data: CategoryFormValues) {
    try {
      const updateData = {
        name: data.name,
        tag: data.tag,
      }
      const response = await updateCategory({id:rowId, body: updateData}).unwrap()
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
        <Button variant="ghost">
          <FileEdit size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[450px] max-h-[85vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Update Category</DialogTitle>
          <DialogDescription>
            Edit the category and save changes.
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
                          <Input placeholder="category name" {...field} />
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
                          <Input placeholder="category tag" {...field} />
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

export default EditCategoryForm