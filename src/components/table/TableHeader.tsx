import React, { useState, useRef, useEffect } from 'react';
import type { Column, Filter, TableHeaderProps } from './types';

export const TableHeader: React.FC<TableHeaderProps> = ({
  columns,
  activeFilters,
  sortBy,
  className = '',
  allSelected = false,
  selectable = false,
  onSort,
  onFilter,
  onSelectAll,
  onColumnResize
}) => {
  const [resizing, setResizing] = useState<{
    columnId: string;
    startX: number;
    startWidth: number;
  } | null>(null);
  const [openFilterMenu, setOpenFilterMenu] = useState<string | null>(null);

  const handleResizeStart = (
    e: React.MouseEvent,
    columnId: string,
    startWidth: number
  ) => {
    e.preventDefault();
    setResizing({
      columnId,
      startX: e.clientX,
      startWidth,
    });
  };

  const handleResizeMove = (e: MouseEvent) => {
    if (!resizing) return;

    const diff = e.clientX - resizing.startX;
    const newWidth = Math.max(50, resizing.startWidth + diff);
    onColumnResize?.(resizing.columnId, newWidth);
  };

  const handleResizeEnd = () => {
    setResizing(null);
  };

  useEffect(() => {
    if (resizing) {
      window.addEventListener('mousemove', handleResizeMove);
      window.addEventListener('mouseup', handleResizeEnd);
      return () => {
        window.removeEventListener('mousemove', handleResizeMove);
        window.removeEventListener('mouseup', handleResizeEnd);
      };
    }
  }, [resizing]);

  // Schließe das Filtermenü wenn außerhalb geklickt wird
  const filterMenuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterMenuRef.current && !filterMenuRef.current.contains(event.target as Node)) {
        setOpenFilterMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleFilter = (columnId: string, value: string) => {
    onFilter?.(columnId, value);
    setOpenFilterMenu(null);
  };

  return (
    <thead className={`min-w-full rounded-lg border-b border-stone-100 hover:bg-stone-50 ${className}`}>
      <tr>
        {selectable && onSelectAll && (
          <th
            scope="col"
            className="group select-none whitespace-nowrap text-left font-normal hover:bg-stone-50 text-stone-500 hover:text-color-primary"
            style={{ width: 70 }}
          >
            <div className="flex items-center justify-stretch py-0.5 px-1">
              <div className="flex flex-1 items-center gap-1">
                <span className="text-sm">
                  <div className="pl-6 sm:pl-8">
                    <div className="relative flex cursor-pointer items-start">
                      <div className="flex h-5 items-center">
                        <input
                          type="checkbox"
                          className="checkbox-base"
                          id=""
                          checked={allSelected}
                          onChange={onSelectAll}
                        />
                      </div>
                    </div>
                  </div>
                </span>
              </div>
            </div>
          </th>
        )}
        {columns.map((column) => {
          const sort = sortBy.find((s) => s.columnId === column.id);
          const filter = activeFilters.find((f) => f.columnId === column.id);
          const isActive = sort || filter;

          return (
            <th
              key={column.id}
              scope="col"
              className="group select-none whitespace-nowrap text-left font-normal hover:bg-stone-50 text-stone-500 hover:text-color-primary"
              style={{ width: column.width }}
            >
              <div className="flex items-center justify-stretch py-0.5 px-1">
                <div className="flex flex-1 items-center gap-1">
                  <span className={`text-sm ${isActive ? 'font-medium text-[var(--color-primary-dark)]' : ''}`}>
                    <span>{column.header}</span>
                  </span>
                  {column.type === 'enum' && column.filterOptions && (
                    <div className="mr-1" ref={filterMenuRef}>
                      <div className="relative">
                        <button
                          type="button"
                          className={`flex size-5 items-center justify-center rounded-sm hover:bg-stone-200 ${filter ? 'opacity-100 text-[var(--color-primary-dark)]' : 'opacity-0 group-hover:opacity-100 text-color-secondary'}`}
                          title="Filter"
                          onClick={() => setOpenFilterMenu(openFilterMenu === column.id ? null : column.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={filter ? "2" : "1.5"}
                            stroke="currentColor"
                            aria-hidden="true"
                            data-slot="icon"
                            className="size-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
                            />
                          </svg>
                        </button>
                        {openFilterMenu === column.id && (
                          <div className="fixed z-50 mt-1 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" style={{
                            top: filterMenuRef.current?.getBoundingClientRect().bottom ?? 0,
                            left: filterMenuRef.current?.getBoundingClientRect().right ?? 0,
                            transform: 'translateX(-100%)'
                          }}>
                            <div className="p-2 space-y-1">
                              {column.filterOptions.map((option) => (
                                <label
                                  key={String(option.value)}
                                  className="flex items-center px-2 py-1 hover:bg-stone-50 rounded cursor-pointer"
                                >
                                  <input
                                    type="radio"
                                    className="checkbox-base"
                                    checked={filter?.value === option.value}
                                    onChange={() => handleFilter(column.id, option.value)}
                                  />
                                  <span className="ml-2 text-sm text-stone-500">{option.label}</span>
                                </label>
                              ))}
                              {filter && (
                                <button
                                  onClick={() => handleFilter(column.id, '')}
                                  className="w-full text-left px-2 py-1 text-sm text-stone-500 hover:bg-stone-50 rounded"
                                >
                                  Filter zurücksetzen
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  {column.sortable && (
                    <button
                      type="button"
                      className={`flex cursor-pointer items-center justify-center rounded-sm hover:bg-stone-200 ${sort ? 'opacity-100 text-[var(--color-primary-dark)]' : 'opacity-0 group-hover:opacity-100 text-color-secondary'}`}
                      title={sort?.desc ? 'Absteigend sortiert' : 'Aufsteigend sortiert'}
                      onClick={() => onSort?.(column.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={sort ? "2" : "1.5"}
                        stroke="currentColor"
                        aria-hidden="true"
                        data-slot="icon"
                        className={`size-5 shrink-0 transition-all ${
                          sort?.desc ? 'rotate-180' : ''
                        }`}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m19.5 8.25-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </button>
                  )}
                </div>
                {column.resizable !== false && (
                  <button
                    className="hover:text-color-primary shrink-0 rounded-sm opacity-0 hover:cursor-col-resize hover:bg-stone-200 group-hover:opacity-100"
                    type="button"
                    onMouseDown={(e) => handleResizeStart(e, column.id, column.width || 150)}
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      className="size-5 shrink-0"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9 13a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm7-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm7-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 18a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
                    </svg>
                  </button>
                )}
              </div>
            </th>
          );
        })}
        <th
          scope="col"
          className="group select-none whitespace-nowrap text-left font-normal hover:bg-stone-50 text-stone-500 hover:text-color-primary"
          style={{ width: 0 }}
        >
          <div className="flex items-center justify-stretch py-0.5 px-1">
            <div className="flex flex-1 items-center gap-1">
              <span className="text-sm"></span>
            </div>
          </div>
        </th>
      </tr>
    </thead>
  );
};
