
import { Table } from "@tanstack/react-table"

import AddItemForm from "../AddItemForm"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}
export function DataTableToolbar<TData>({ 
  table 
}: DataTableToolbarProps<TData>) {

  // const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter by name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>
      <div className="flex justify-center items-center gap-4">
          <AddItemForm />
      </div>
      {/* <DataTableViewOptions table={table} /> */}
    </div>
  )
}
