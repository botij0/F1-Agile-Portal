import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
} from "@tanstack/react-table";
import Link from "next/link";
import { useState } from "react";

interface SimpleTableProps {
    data: any[];
    columns: any[];
    urlAniadir: string;
    txtAniadir: string;
}

function SimpleTable({
    data,
    columns,
    urlAniadir,
    txtAniadir,
}: SimpleTableProps) {
    const [sorting, setSorting] = useState<any[]>([]);
    const [filtering, setFiltering] = useState<string>("");

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            globalFilter: filtering,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
    });

    return (
        <div className="my-5 text-lg">
            <div className="flex justify-between mb-5 bg-gray-300  rounded-xl">
                <div className="flex items-center py-2 px-4">
                    <label
                        htmlFor="filtering"
                        className="font-bold mx-4 text-lg"
                    >
                        Filtrado:{" "}
                    </label>
                    <input
                        type="text"
                        className=" rounded-lg border border-gray-400 p-2"
                        placeholder="Filter..."
                        value={filtering}
                        onChange={(e) => setFiltering(e.target.value)}
                    />
                </div>

                <div className="flex items-center">
                    {urlAniadir == "" ? null : (
                        <Link
                            href={urlAniadir}
                            className="bg-gray-800 hover:bg-gray-950 text-white font-bold py-2 px-4 rounded-lg m-5"
                        >
                            {txtAniadir}
                        </Link>
                    )}
                </div>
            </div>

            <table className="w-full">
                <thead className="bg-gray-300 text-left">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className="p-4"
                                    onClick={header.column.getToggleSortingHandler()}
                                >
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                    {header.column.getIsSorted()
                                        ? {
                                              asc: "⬆️",
                                              desc: "⬇️",
                                          }[
                                              header.column.getIsSorted() ==
                                              false
                                                  ? "asc"
                                                  : "desc"
                                          ]
                                        : null}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody className="bg-gray-100">
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="hover:bg-gray-200 border">
                            {row.getAllCells().map((cell) => (
                                <td key={cell.id} className="p-4">
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <nav className="flex justify-between items-center mt-5">
                <div>
                    <select
                        value={table.getState().pagination.pageSize}
                        onChange={(e) => {
                            table.setPageSize(Number(e.target.value));
                        }}
                        className="border p-1.5 rounded border-gray-400 bg-gray-200 font-bold"
                    >
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                Ver {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="bg-gray-200 py-1.5 px-3 rounded-md border border-gray-400">
                    <span className="me-5 font-bold">Ir a la página:</span>
                    <input
                        type="number"
                        defaultValue={table.getState().pagination.pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value
                                ? Number(e.target.value) - 1
                                : 0;
                            table.setPageIndex(page);
                        }}
                        className="border border-gray-400 p-1 rounded w-16"
                    />
                </div>
                <div className="grid grid-cols-4 gap-2">
                    <button
                        className="bg-gray-200 px-5 py-2 rounded-md hover:bg-gray-300 border border-gray-400"
                        onClick={() => table.setPageIndex(0)}
                    >
                        <span className="text-xl">{"⮜⮜"}</span>
                    </button>
                    <button
                        className="bg-gray-200 rounded-md hover:bg-gray-300 border border-gray-400"
                        onClick={() => table.previousPage()}
                    >
                        <span className="text-xl">{"⮜"}</span>
                    </button>
                    <button
                        className="bg-gray-200 rounded-md hover:bg-gray-300 border border-gray-400"
                        onClick={() => table.nextPage()}
                    >
                        <span className="text-xl">{"⮞"}</span>
                    </button>
                    <button
                        className="bg-gray-200 rounded-md hover:bg-gray-300 border border-gray-400"
                        onClick={() =>
                            table.setPageIndex(table.getPageCount() - 1)
                        }
                    >
                        <span className="text-xl">{"⮞⮞"}</span>
                    </button>
                </div>
            </nav>
        </div>
    );
}

export default SimpleTable;
