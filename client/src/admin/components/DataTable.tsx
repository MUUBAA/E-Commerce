import React from "react";

type Column<T> = {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
};

interface Props<T> {
  columns: Column<T>[];
  data: T[];
}

const DataTable = <T,>({ columns, data }: Props<T>) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <table className="min-w-full">
        <thead className="bg-pink-50 text-slate-600">
          <tr>
            {columns.map((col) => (
              <th key={col.header} className="text-left px-4 py-3">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="border-t border-slate-100 hover:bg-slate-50">
              {columns.map((col) => {
                const value =
                  typeof col.accessor === "function"
                    ? col.accessor(row)
                    : (row as any)[col.accessor];
                return (
                  <td key={col.header} className="px-4 py-3 text-sm text-slate-700">
                    {value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;

