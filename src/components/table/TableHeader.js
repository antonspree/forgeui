import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
export const TableHeader = ({ columns, activeFilters, sortBy, className = '', allSelected = false, selectable = false, onSort, onFilter, onSelectAll, onColumnResize }) => {
    const [resizing, setResizing] = useState(null);
    const [openFilterMenu, setOpenFilterMenu] = useState(null);
    const handleResizeStart = (e, columnId, startWidth) => {
        e.preventDefault();
        setResizing({
            columnId,
            startX: e.clientX,
            startWidth,
        });
    };
    const handleResizeMove = (e) => {
        if (!resizing)
            return;
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
    const filterMenuRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterMenuRef.current && !filterMenuRef.current.contains(event.target)) {
                setOpenFilterMenu(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const handleFilter = (columnId, value) => {
        onFilter?.(columnId, value);
        setOpenFilterMenu(null);
    };
    return (_jsx("thead", { className: `min-w-full rounded-lg border-b border-stone-100 hover:bg-stone-50 ${className}`, children: _jsxs("tr", { children: [selectable && onSelectAll && (_jsx("th", { scope: "col", className: "group select-none whitespace-nowrap text-left font-normal hover:bg-stone-50 text-stone-500 hover:text-color-primary", style: { width: 70 }, children: _jsx("div", { className: "flex items-center justify-stretch py-0.5 px-1", children: _jsx("div", { className: "flex flex-1 items-center gap-1", children: _jsx("span", { className: "text-sm", children: _jsx("div", { className: "pl-6 sm:pl-8", children: _jsx("div", { className: "relative flex cursor-pointer items-start", children: _jsx("div", { className: "flex h-5 items-center", children: _jsx("input", { type: "checkbox", className: "checkbox-base", id: "", checked: allSelected, onChange: onSelectAll }) }) }) }) }) }) }) })), columns.map((column) => {
                    const sort = sortBy.find((s) => s.columnId === column.id);
                    const filter = activeFilters.find((f) => f.columnId === column.id);
                    const isActive = sort || filter;
                    return (_jsx("th", { scope: "col", className: "group select-none whitespace-nowrap text-left font-normal hover:bg-stone-50 text-stone-500 hover:text-color-primary", style: { width: column.width }, children: _jsxs("div", { className: "flex items-center justify-stretch py-0.5 px-1", children: [_jsxs("div", { className: "flex flex-1 items-center gap-1", children: [_jsx("span", { className: `text-sm ${isActive ? 'font-medium text-[var(--color-primary-dark)]' : ''}`, children: _jsx("span", { children: column.header }) }), column.type === 'enum' && column.filterOptions && (_jsx("div", { className: "mr-1", ref: filterMenuRef, children: _jsxs("div", { className: "relative", children: [_jsx("button", { type: "button", className: `flex size-5 items-center justify-center rounded-sm hover:bg-stone-200 ${filter ? 'opacity-100 text-[var(--color-primary-dark)]' : 'opacity-0 group-hover:opacity-100 text-color-secondary'}`, title: "Filter", onClick: () => setOpenFilterMenu(openFilterMenu === column.id ? null : column.id), children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: filter ? "2" : "1.5", stroke: "currentColor", "aria-hidden": "true", "data-slot": "icon", className: "size-4", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" }) }) }), openFilterMenu === column.id && (_jsx("div", { className: "fixed z-50 mt-1 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none", style: {
                                                            top: filterMenuRef.current?.getBoundingClientRect().bottom ?? 0,
                                                            left: filterMenuRef.current?.getBoundingClientRect().right ?? 0,
                                                            transform: 'translateX(-100%)'
                                                        }, children: _jsxs("div", { className: "p-2 space-y-1", children: [column.filterOptions.map((option) => (_jsxs("label", { className: "flex items-center px-2 py-1 hover:bg-stone-50 rounded cursor-pointer", children: [_jsx("input", { type: "radio", className: "checkbox-base", checked: filter?.value === option.value, onChange: () => handleFilter(column.id, option.value) }), _jsx("span", { className: "ml-2 text-sm text-stone-500", children: option.label })] }, String(option.value)))), filter && (_jsx("button", { onClick: () => handleFilter(column.id, ''), className: "w-full text-left px-2 py-1 text-sm text-stone-500 hover:bg-stone-50 rounded", children: "Filter zur\u00FCcksetzen" }))] }) }))] }) })), column.sortable && (_jsx("button", { type: "button", className: `flex cursor-pointer items-center justify-center rounded-sm hover:bg-stone-200 ${sort ? 'opacity-100 text-[var(--color-primary-dark)]' : 'opacity-0 group-hover:opacity-100 text-color-secondary'}`, title: sort?.desc ? 'Absteigend sortiert' : 'Aufsteigend sortiert', onClick: () => onSort?.(column.id), children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: sort ? "2" : "1.5", stroke: "currentColor", "aria-hidden": "true", "data-slot": "icon", className: `size-5 shrink-0 transition-all ${sort?.desc ? 'rotate-180' : ''}`, children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m19.5 8.25-7.5 7.5-7.5-7.5" }) }) }))] }), column.resizable !== false && (_jsx("button", { className: "hover:text-color-primary shrink-0 rounded-sm opacity-0 hover:cursor-col-resize hover:bg-stone-200 group-hover:opacity-100", type: "button", onMouseDown: (e) => handleResizeStart(e, column.id, column.width || 150), children: _jsx("svg", { stroke: "currentColor", fill: "currentColor", strokeWidth: "0", viewBox: "0 0 24 24", className: "size-5 shrink-0", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { d: "M9 13a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm7-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm7-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 18a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" }) }) }))] }) }, column.id));
                }), _jsx("th", { scope: "col", className: "group select-none whitespace-nowrap text-left font-normal hover:bg-stone-50 text-stone-500 hover:text-color-primary", style: { width: 0 }, children: _jsx("div", { className: "flex items-center justify-stretch py-0.5 px-1", children: _jsx("div", { className: "flex flex-1 items-center gap-1", children: _jsx("span", { className: "text-sm" }) }) }) })] }) }));
};
