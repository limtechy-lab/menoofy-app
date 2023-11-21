import { Skeleton } from '../ui/skeleton'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table"

function TableSkeleton() {
    const numbers: number[] = [1, 2, 3, 4, 5];

  return (
    <>
        <TableHeader className="">
            <TableRow>
                <TableHead >
                    <Skeleton className="h-4 w-[20px]" />
                </TableHead>
                <TableHead >
                    <Skeleton className="h-4 w-[50px]" />
                </TableHead>
                <TableHead >
                    <Skeleton className="h-4 w-[50px]" />
                </TableHead>
                <TableHead >
                    <Skeleton className="h-4 w-[40px]" />
                </TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {numbers.map((index) => (
            <TableRow key={index}>
                <TableCell>
                    <Skeleton className="h-4 w-[20px]" />
                </TableCell>
                <TableCell>
                    <Skeleton className="h-4 w-[60px]" />
                </TableCell>
                <TableCell>
                    <Skeleton className="h-4 w-[60px]" />
                </TableCell>
                <TableCell>
                    <Skeleton className="h-4 w-[40px]" />
                </TableCell>
                <TableCell className='flex gap-1'>
                    <Skeleton className="h-4 w-[15px]" />
                    <Skeleton className="h-4 w-[15px]" />
                </TableCell>
            </TableRow>
            ))}
        </TableBody>
    </>
  )
}

export default TableSkeleton