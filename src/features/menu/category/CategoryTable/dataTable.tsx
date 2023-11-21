import * as React from "react"
import {
    ColumnDef,
    PaginationState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    // getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
  } from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import TableSkeleton from "@/components/skeleton/table-skeleton"
import { DataTablePagination } from "@/components/ui/data-table-pagination"
import { DataTableToolbar } from "./dataTableToolbar"
import type {argsType} from './index'
interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    isFatching: boolean
    pageCount: number
    onAgrsChange: (args: argsType) => void
  }

export function DataTable<TData, TValue>({ data, columns, onAgrsChange, pageCount, isFatching }: DataTableProps<TData, TValue>) {
    const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: 10,
    })
    const [sorting, setSorting] = React.useState([])
    const [columnFilters, setColumnFilters] = React.useState([])
    
    React.useEffect(() => {
        onAgrsChange({ page: pageIndex, limit: pageSize })
    }, [onAgrsChange, pageIndex, pageSize])

    const pagination = React.useMemo(
        () => ({
          pageIndex,
          pageSize,
        }),
        [pageIndex, pageSize]
      )

    const table = useReactTable({
        data,
        columns,
        pageCount: pageCount ?? -1,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        // getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            pagination,
            sorting,
            columnFilters,
        },
      })


      return (
        <div>
            <div className="flex items-center py-4">
                <DataTableToolbar table={table} />
            </div>
            <div className="rounded-sm border">
                <Table>
                {isFatching ? (
                    <TableSkeleton />
                ) : (
                    <>
                    <TableHeader className=" uppercase">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                            return (
                            <TableHead key={header.id}>
                                {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                    )}
                            </TableHead>
                            )
                        })}
                        </TableRow>
                    ))}
                    </TableHeader>
                    <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                        <TableRow
                            key={row.original.id}
                            data-state={row.getIsSelected() && "selected"}
                        >
                            {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                            ))}
                        </TableRow>
                        ))
                    ) : (
                        <TableRow>
                        <TableCell colSpan={columns.length} className="h-24 text-center">
                            No results.
                        </TableCell>
                        </TableRow>
                    )}
                    </TableBody>
                    </>
                )}
                </Table>
            </div>
            <DataTablePagination table={table} />
        </div>
      )
  }
