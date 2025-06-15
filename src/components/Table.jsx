import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Button } from './ui/button';
import { Input } from './ui/input';

export function CommonTable({
  columns,
  data,
  page,
  pageSize,
  total,
  searchEnabled = false,
  searchValue = '',
  onSearchChange,
  onPageChange,
  onPageSizeChange,
  sorting,
  onSortingChange,
  handleAddClick,
  addEnabled = false,
  isLoading = false,
}) {
  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil(total / pageSize),
    state: {
      pagination: { pageIndex: page - 1, pageSize },
      sorting,
    },
    manualPagination: true,
    manualSorting: true,
    onSortingChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  function renderSkeletonRows(
    rowCount = pageSize,
    columnCount = columns.length,
  ) {
    return Array.from({ length: rowCount }).map((_, rowIndex) => (
      <tr key={`skeleton-${rowIndex}`} className="border-t animate-pulse">
        {Array.from({ length: columnCount }).map((_, colIndex) => (
          <td
            key={`skeleton-cell-${rowIndex}-${colIndex}`}
            className="px-4 py-2"
          >
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </td>
        ))}
      </tr>
    ));
  }
  const pageCount = Math.ceil(total / pageSize);
  function getPageNumbers(current, total, maxVisible = 5) {
    const half = Math.floor(maxVisible / 2);
    let start = Math.max(current - half, 1);
    let end = start + maxVisible - 1;

    if (end > total) {
      end = total;
      start = Math.max(end - maxVisible + 1, 1);
    }
    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        {searchEnabled && onSearchChange && (
          <Input
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="max-w-sm"
          />
        )}
        {addEnabled && handleAddClick && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleAddClick}
            className="ml-2"
          >
            Add
          </Button>
        )}
      </div>
      <div className="border rounded-md overflow-hidden">
        <div className="relative max-h-[550px] overflow-y-auto">
          <table className="min-w-full table-fixed">
            <colgroup>
              {table.getAllColumns().map((column) => (
                <col
                  key={column.id}
                  style={{
                    width: column.columnDef.size
                      ? `${column.columnDef.size}px`
                      : 'auto',
                  }}
                />
              ))}
            </colgroup>
            <thead className="bg-gray-100 sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-2 text-left"
                      style={{
                        width: header.column.columnDef.size
                          ? `${header.column.columnDef.size}px`
                          : undefined,
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {{
                        asc: ' 🔼',
                        desc: ' 🔽',
                      }[header.column.getIsSorted()] ?? null}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {isLoading
                ? renderSkeletonRows()
                : table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className="border-t">
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="px-4 py-2">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>

      {total > 2 && (
        <div className="flex items-center justify-between pt-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">
              Showing {(page - 1) * pageSize + 1} to{' '}
              {Math.min(page * pageSize, total)} of {total} Records
            </span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {[10, 20, 30, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              onClick={() => onPageChange(page - 1)}
              disabled={page === 1}
            >
              <ChevronLeft size={16} />
            </Button>
            {page > 5 && <span className="px-1">...</span>}
            {getPageNumbers(page, pageCount).map((pg) => (
              <Button
                key={pg}
                size="icon"
                variant={pg === page ? 'primary' : 'outline'}
                onClick={() => onPageChange(pg)}
                className="w-8 h-8 text-sm"
              >
                {pg}
              </Button>
            ))}
            {page < 18 && <span className="px-1">...</span>}
            <Button
              variant="outline"
              size="icon"
              onClick={() => onPageChange(page + 1)}
              disabled={page === pageCount}
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
