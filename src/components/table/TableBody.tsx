import React from 'react';
import type { Column, TableBodyProps } from './types';

type StatusType = 'bezahlt' | 'offen' | 'überfällig';

const StatusBadge: React.FC<{ status: StatusType }> = ({ status }) => {
  const statusStyles: Record<StatusType, string> = {
    bezahlt: 'bg-green-100 text-green-700',
    offen: 'bg-yellow-100 text-yellow-700',
    überfällig: 'bg-red-100 text-red-700',
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}>
      {status}
    </span>
  );
};

export const TableBody: React.FC<TableBodyProps> = ({
  data,
  columns,
  selectable,
  selectedRows = [],
  onSelect,
  onRowClick,
  rowHeight = 56,
}) => {
  const handleRowClick = (row: any) => {
    onRowClick?.(row);
  };

  const handleCheckboxClick = (e: React.MouseEvent, row: any) => {
    e.stopPropagation();
    onSelect?.(row);
  };

  if (data.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={columns.length + (selectable ? 1 : 0)} className="py-4 text-center text-sm text-stone-500">
            Keine Daten vorhanden
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {data.map((row, rowIndex) => (
        <tr
          key={rowIndex}
          className="hover:bg-stone-50"
          onClick={() => handleRowClick(row)}
          style={{ height: rowHeight }}
        >
          {selectable && (
            <td
              className="group select-none whitespace-nowrap text-left font-normal hover:bg-stone-50"
              style={{ width: 70 }}
            >
              <div className="flex items-center justify-stretch py-0.5 px-1">
                <div className="pl-6 sm:pl-8">
                  <div className="relative flex cursor-pointer items-start">
                    <div className="flex h-5 items-center">
                      <input
                        type="checkbox"
                        className="checkbox-base"
                        id=""
                        checked={selectedRows.includes(row)}
                        onChange={(e) => handleCheckboxClick(e as any, row)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </td>
          )}
          {columns.map((column) => (
            <td
              key={column.id}
              className={`group select-none whitespace-nowrap text-left font-normal hover:bg-stone-50 ${
                column.type === 'link' ? 'cursor-pointer' : ''
              }`}
              style={{ width: column.width }}
              onClick={() => column.type === 'link' && column.onLinkClick?.(row[column.id], row)}
            >
              <div className="flex items-center justify-stretch py-0.5 px-1">
                <div className={`pl-1 pr-2 text-sm ${column.type === 'link' ? 'text-stone-900 hover:underline' : ''}`}>
                  {column.renderCell ? (
                    column.renderCell(row[column.id], row)
                  ) : column.id === 'status' ? (
                    <StatusBadge status={row[column.id] as StatusType} />
                  ) : (
                    <div className="truncate">
                      {row[column.id]}
                    </div>
                  )}
                </div>
              </div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
