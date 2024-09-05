"use client";

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable
} from "@tanstack/react-table";
import * as React from "react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Table as TanstackTable } from "@tanstack/react-table";
import { PacmanLoader } from "react-spinners";

type FilterRender<T> = (table: TanstackTable<T>) => JSX.Element;

export default function GenericTable<T>({
    dataValues,
    isLoading,
    defaultColumns,
    hiddenColumns,
    filter,
}: {
    dataValues: T[];
    isLoading: boolean;
    defaultColumns: ColumnDef<T>[];
    filter: FilterRender<T>,
    hiddenColumns?: VisibilityState
}) {

    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    );

    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>(hiddenColumns ?? {});

    const table = useReactTable({
        data: dataValues,
        columns: defaultColumns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
        },
    });

    return (
        <div className="w-full sm:p-4">
            <div className="flex items-center py-4">
                {filter(table)}
            </div>

            <div className="flex items-center justify-end space-x-2 py-4 text-sm text-muted-foreground">
                <div className="flex-1">
                    {table.getFilteredRowModel().rows.length} row(s).
                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
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
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow key={0}>
                                <TableCell key={0}>
                                    <PacmanLoader size={10} color="#47eb63" />
                                </TableCell>
                            </TableRow>
                        ) : (
                            <></>
                        )}
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={defaultColumns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

        </div>
    );
}
