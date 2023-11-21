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
      accessorKey: 'tag',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Tag" />
      ),
      cell: ({ row }) => <div className="w-[50px]">{row.getValue("tag")}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    // {
    //   accessorKey: 'faculty_id',
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title="Faculty" />
    //   ),
    //   cell: ({ row }) => {
    //     let faculty = row.getValue("faculty_id")
    //     return (
    //       <div className="w-[100px]">{faculty.name}</div>
    //     )
    //   },
    //   enableSorting: false,
    //   enableHiding: false,
    // },
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
