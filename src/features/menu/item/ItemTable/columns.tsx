import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header"
import { DataTableRowActions } from "./dataTableRowAction"

 
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Faculty = {
  id: string
  name: string
  tag: string
  isActive: boolean
}

export const columns: ColumnDef<Faculty>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => <div className="w-[150px]">{row.getValue("name")}</div>,
      enableSorting: true,
      enableHiding: false,
    },
    {
      accessorKey: 'category_id',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Category" />
      ),
      cell: ({ row }) => {
        const category = row.getValue("category_id")
        return (
          <div className="w-[100px]">{category.name}</div>
        )
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'content_list',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Total price" />
      ),
      cell: ({ row }) => {
        
        // const contentList = row.getValue("content_list")
        const contentList = row.original.content_list
        const total = contentList?.reduce(
          (acc, current) => acc + (current.content_id.price || 0) * (current.quantity || 0),
          0
        );
        return (
          <div className="w-[100px]">{total}</div>
        )
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'isActive',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => <div className="w-[50px]">{row.getValue("isActive") ? "Active" : "Inactive"}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "actions",
      cell: ({ row }) => <DataTableRowActions row={row} />,
    },
]
