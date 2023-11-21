import { Row } from "@tanstack/react-table";
import EditCategoryForm from "../EditCategoryForm";
import { useDeleteMyCategoryMutation } from "../categoryApiSlice";
import { useToast } from "@/components/ui/use-toast";
import { DeleteAlertDialog } from "@/components/ui/delete-alert-dialog"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
//   const task = taskSchema.parse(row.original)
  const { toast } = useToast()

  const [ deleteCategory, { isLoading: isDeleting }] = useDeleteMyCategoryMutation()

  const handleDeleteCategory = async () => {
    try {
      const response = await deleteCategory({ id: row.original.id }).unwrap()
     console.log(response)
      toast({
        title: response.status,
        description: response.message
      })
    } catch (error) {
      console.log(error)
      toast({
        title: "Server error",
        description: "Oops. Something went wrong, please try again"
      }) 
    }
  }



  return (
    <div className="flex justify-center items-center">
      <EditCategoryForm row={row} />
      <DeleteAlertDialog 
        title={'Category'}
        isDeleting={isDeleting} 
        onContinue={handleDeleteCategory} 
      />
    </div>
  )
}
