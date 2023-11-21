import { Row } from "@tanstack/react-table";
import EditItemContentForm from "../EditItemContentForm";
import { useDeleteItemContentMutation } from "../itemContentApiSlice";
import { useToast } from "@/components/ui/use-toast";
import { DeleteAlertDialog } from "@/components/ui/delete-alert-dialog"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
//   const task = taskSchema.parse(row.original)
  const { toast } = useToast()

  const [ deleteItemContent, { isLoading: isDeleting }] = useDeleteItemContentMutation()

  const handleDeleteItemContent = async () => {
    try {
      const response = await deleteItemContent({ id: row.original.id }).unwrap()
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
      <EditItemContentForm row={row} />
      <DeleteAlertDialog 
        title={'ItemContent'}
        isDeleting={isDeleting} 
        onContinue={handleDeleteItemContent} 
      />
    </div>
  )
}
