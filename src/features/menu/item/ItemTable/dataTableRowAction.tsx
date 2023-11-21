import { Row } from "@tanstack/react-table";
import EditItemForm from "../EditItemForm";
import { useDeleteMyItemMutation } from "../itemApiSlice";
import { useToast } from "@/components/ui/use-toast";
import { DeleteAlertDialog } from "@/components/ui/delete-alert-dialog"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
//   const task = taskSchema.parse(row.original)
  const { toast } = useToast()

  const [ deleteItem, { isLoading: isDeleting }] = useDeleteMyItemMutation()

  const handleDeleteItem = async () => {
    try {
      const response = await deleteItem({ id: row.original.id }).unwrap()
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
    <div className="flex justify-center items-center">
      <EditItemForm row={row} />
      <DeleteAlertDialog 
        title={'Item'}
        isDeleting={isDeleting} 
        onContinue={handleDeleteItem} 
      />
    </div>
  )
}
