import React, { useState, useMemo } from 'react';
import { Search, ChevronUp, ChevronDown } from 'lucide-react';

type Column<T> = {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  sortable?: boolean;
  width?: string;
};

interface Props<T> {
  columns: Column<T>[];
  data: T[];
  searchable?: boolean;
  title?: string;
  actions?: React.ReactNode;
  pagination?: {
    page: number;
    pageSize: number;
    total?: number;
  };
  onPageChange?: (page: number, pageSize: number) => void;
  onSearch?: (search: string) => void;
  debounceMs?: number;
}

const DataTable = <T,>({ columns, data, searchable = true, title, actions, pagination, onPageChange, onSearch, debounceMs }: Props<T>) => {
  const [search, setSearch] = useState('');
  const localDebounceMs = debounceMs ?? 400;
  const searchDebounceRef = React.useRef<number | null>(null);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredData = useMemo(() => {
    if (!search) return data;
    return data.filter((row) =>
      columns.some((col) => {
        const value = typeof col.accessor === 'function' 
          ? col.accessor(row)
          : row[col.accessor as keyof T];
        return String(value).toLowerCase().includes(search.toLowerCase());
      })
    );
  }, [data, search, columns]);

  const sortedData = useMemo(() => {
    if (!sortBy) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortBy as keyof T];
      const bVal = b[sortBy as keyof T];
      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      }
      return aVal < bVal ? 1 : -1;
    });
  }, [filteredData, sortBy, sortOrder]);

  const handleSort = (accessor: keyof T) => {
    if (sortBy === accessor) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(accessor as string);
      setSortOrder('asc');
    }
  };

  const currentPage = pagination?.page ?? 1;
  const currentPageSize = pagination?.pageSize ?? 20;
  const totalEntries = pagination?.total ?? data.length;

  const totalPages = Math.max(1, Math.ceil(totalEntries / currentPageSize));

  const canPrev = currentPage > 1;
  // If total is provided, use it to determine if we can go next. Otherwise infer from current data length vs pageSize.
  const hasTotal = typeof pagination?.total === 'number' && pagination!.total! >= 0;
  const canNext = hasTotal
    ? currentPage < totalPages
    : (sortedData.length >= currentPageSize);

  const goToPage = (p: number) => {
    if (!onPageChange) return;
    let next = p;
    if (next < 1) next = 1;
    if (hasTotal) next = Math.min(totalPages, next);
    onPageChange(next, currentPageSize);
  };

  const changePageSize = (size: number) => {
    if (!onPageChange) return;
    onPageChange(1, size);
  };

  return (
    <div className="bg-white rounded-2xl lg:rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
      {(title || searchable || actions) && (
        <div className="p-4 sm:p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="min-w-0">
                {title && (
                  <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-1 truncate">{title}</h3>
                )}
                <p className="text-slate-600 text-xs sm:text-sm">Manage and view your data</p>
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {actions}
              </div>
            </div>
            
            {searchable && (
              <div className="w-full">
                <div className="relative max-w-full sm:max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => {
                      const v = e.target.value;
                      setSearch(v);
                      if (onSearch) {
                        if (searchDebounceRef.current) {
                          window.clearTimeout(searchDebounceRef.current);
                        }
                        // @ts-ignore - window.setTimeout returns number in browsers
                        searchDebounceRef.current = window.setTimeout(() => {
                          onSearch(v);
                          searchDebounceRef.current = null;
                        }, localDebounceMs) as unknown as number;
                      }
                    }}
                    className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
        <table className="min-w-full sm:min-w-[600px]">
          <thead className="bg-gradient-to-r from-pink-50 to-purple-50">
            <tr>
              {columns.map((col) => (
                <th 
                  key={col.header} 
                  className={`text-left px-3 sm:px-6 py-3 sm:py-4 font-semibold text-slate-700 text-xs sm:text-sm ${col.sortable ? 'cursor-pointer hover:bg-pink-100 transition-colors' : ''}`}
                  style={{ width: col.width, minWidth: col.width || '120px' }}
                  onClick={() => col.sortable && typeof col.accessor === 'string' && handleSort(col.accessor)}
                >
                  <div className="flex items-center gap-2">
                    <span className="truncate">{col.header}</span>
                    {col.sortable && typeof col.accessor === 'string' && (
                      <div className="flex flex-col flex-shrink-0">
                        <ChevronUp 
                          size={12} 
                          className={`${sortBy === col.accessor && sortOrder === 'asc' ? 'text-pink-600' : 'text-slate-300'}`}
                        />
                        <ChevronDown 
                          size={12} 
                          className={`${sortBy === col.accessor && sortOrder === 'desc' ? 'text-pink-600' : 'text-slate-300'} -mt-1`}
                        />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sortedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-8 text-center text-slate-500">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                      <Search className="text-slate-400" size={20} />
                    </div>
                    <p>No data found</p>
                  </div>
                </td>
              </tr>
            ) : (
              sortedData.map((row, idx) => (
                <tr key={idx} className="hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 transition-all duration-200">
                  {columns.map((col, colIdx) => {
                    const value =
                      typeof col.accessor === "function"
                        ? col.accessor(row)
                        : row[col.accessor as keyof T];
                    return (
                      <td 
                        key={col.header} 
                        className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-slate-700"
                        style={{ minWidth: columns[colIdx]?.width || '120px' }}
                      >
                        {value as React.ReactNode}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {sortedData.length > 0 && (
        <div className="px-3 sm:px-6 py-3 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm text-slate-600">
          <div className="flex items-center gap-3">
            <span className="text-center sm:text-left">Showing {sortedData.length} of {totalEntries} entries</span>
            {onPageChange && (canPrev || canNext) && (
              <div className="hidden sm:flex items-center gap-2 text-slate-600">
                <button className="px-2 py-1 border rounded" onClick={() => goToPage(currentPage - 1)} disabled={!canPrev}>Prev</button>
                <span>Page</span>
                <input
                  type="number"
                  value={currentPage}
                  onChange={(e) => goToPage(Number(e.target.value))}
                  className="w-16 text-center border rounded px-1 py-1"
                />
                <span>of {totalPages}</span>
                <button className="px-2 py-1 border rounded" onClick={() => goToPage(currentPage + 1)} disabled={!canNext}>Next</button>
              </div>
            )}
          </div>
          <div className="flex items-center justify-center sm:justify-end gap-2">
            <span className="hidden sm:inline">Rows per page:</span>
            <select
              className="border border-slate-300 rounded px-2 py-1 text-xs sm:text-sm focus:ring-2 focus:ring-pink-500 focus:border-transparent cursor-pointer"
              value={currentPageSize}
              onChange={(e) => changePageSize(Number(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;

