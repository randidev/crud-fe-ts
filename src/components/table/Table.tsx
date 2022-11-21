import {
  SortingState,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useState } from "react";

import { CgChevronLeft, CgChevronRight } from "react-icons/cg";

import { Props } from "./type";

export const Table = <T extends unknown>({ data, columns }: Props<T>) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    // Pipeline
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    //
    debugTable: true,
  });
  return (
    <>
      <div className="flex flex-col">
        <div className="overflow-x-auto ">
          <div className="inline-block min-w-full py-2">
            <div className="overflow-hidden">
              <table className="table-custom">
                <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <th
                            key={header.id}
                            colSpan={header.colSpan}
                            {...{
                              onClick: header.column.getToggleSortingHandler(),
                            }}>
                            <div className="header">
                              {header.isPlaceholder ? null : (
                                <div>
                                  {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                                </div>
                              )}
                              {{
                                asc: " 🔼",
                                desc: " 🔽",
                              }[header.column.getIsSorted() as string] ?? " "}
                            </div>
                          </th>
                        );
                      })}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row) => {
                    return (
                      <tr key={row.id}>
                        {row.getVisibleCells().map((cell) => {
                          return (
                            <td key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="h-2" />
              <div className="flex items-center gap-8">
                <div>
                  <span className="flex items-center gap-1">
                    <span className="text-sm font-light text-gray-900">
                      Go to page :
                    </span>
                    <input
                      type="number"
                      defaultValue={table.getState().pagination.pageIndex + 1}
                      onChange={(e) => {
                        const page = e.target.value
                          ? Number(e.target.value) - 1
                          : 0;
                        table.setPageIndex(page);
                      }}
                      min={1}
                      className="w-16 rounded border p-1"
                    />
                  </span>
                </div>
                <span>|</span>
                <div className="flex items-center gap-3">
                  <button
                    className={[
                      "flex items-center rounded border p-1 text-sm font-light text-gray-900",
                      !table.getCanPreviousPage()
                        ? "cursor-not-allowed"
                        : "cursor-pointer",
                    ].join(" ")}
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}>
                    <CgChevronLeft /> Prev
                  </button>
                  <button
                    className={[
                      "flex items-center rounded border p-1 text-sm font-light text-gray-900",
                      !table.getCanNextPage()
                        ? "cursor-not-allowed"
                        : "cursor-pointer",
                    ].join(" ")}
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}>
                    Next <CgChevronRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
