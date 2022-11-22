import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  FilterFn,
} from "@tanstack/react-table";

import {
  RankingInfo,
  rankItem,
  compareItems,
} from "@tanstack/match-sorter-utils";

import { useEffect, useState } from "react";

import { CgChevronLeft, CgChevronRight } from "react-icons/cg";

import { Props } from "./type";

declare module "@tanstack/table-core" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

export const Table = <T extends unknown>({ data, columns }: Props<T>) => {
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  });
  return (
    <>
      <DebouncedInput
        value={globalFilter ?? ""}
        onChange={(value) => setGlobalFilter(String(value))}
        className="font-lg border-block w-full rounded-sm border p-2 shadow sm:w-52"
        placeholder="Search..."
      />
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
                          <th key={header.id} colSpan={header.colSpan}>
                            <div className="header">
                              {header.isPlaceholder ? null : (
                                <div>
                                  {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                                </div>
                              )}
                            </div>
                          </th>
                        );
                      })}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.slice(0, 10).length > 0 ? (
                    <>
                      {table
                        .getRowModel()
                        .rows.slice(0, 10)
                        .map((row) => {
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
                    </>
                  ) : (
                    <tr>
                      <td
                        className="text-center"
                        colSpan={table.getHeaderGroups()[0].headers.length}>
                        No records found.
                      </td>
                    </tr>
                  )}
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
