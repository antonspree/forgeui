import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
import { TableHeader } from './TableHeader';
import { TableBody } from './TableBody';
export const Table = ({ title, subtitle, data, columns: initialColumns, className, headerClassName, rowHeight, selectable, loading, onRowClick, onSelect, onSearch, onFilter, onSort }) => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [sortBy, setSortBy] = useState([]);
    const [activeFilters, setActiveFilters] = useState([]);
    const [columns, setColumns] = useState(initialColumns);
    const [filteredData, setFilteredData] = useState(data);
    const [searchTerm, setSearchTerm] = useState('');
    const [showColumnSelector, setShowColumnSelector] = useState(false);
    const columnSelectorRef = useRef(null);
    // Spalten-Sichtbarkeit
    const [hiddenColumns, setHiddenColumns] = useState([]);
    const visibleColumns = columns.filter(col => !hiddenColumns.includes(col.id));
    const toggleColumn = (columnId) => {
        setHiddenColumns(prev => prev.includes(columnId)
            ? prev.filter(id => id !== columnId)
            : [...prev, columnId]);
    };
    // Schließe Popup wenn außerhalb geklickt wird
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (columnSelectorRef.current && !columnSelectorRef.current.contains(event.target)) {
                setShowColumnSelector(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    const resetTable = () => {
        setHiddenColumns([]);
        setActiveFilters([]);
        setSortBy([]);
        setSearchTerm('');
        setSelectedRows([]);
        setColumns(initialColumns);
        onFilter?.([]);
    };
    useEffect(() => {
        let result = data;
        // Erst filtern
        if (activeFilters.length > 0) {
            result = result.filter(item => activeFilters.every(filter => {
                const value = item[filter.columnId];
                if (value == null)
                    return false;
                return String(value) === String(filter.value);
            }));
        }
        // Dann suchen
        if (searchTerm) {
            result = result.filter(row => columns.some(column => {
                const value = row[column.id];
                if (value == null)
                    return false;
                return String(value)
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
            }));
        }
        // Dann sortieren
        if (sortBy.length > 0) {
            const sortConfig = sortBy[0];
            result = [...result].sort((a, b) => {
                const aValue = a[sortConfig.columnId];
                const bValue = b[sortConfig.columnId];
                if (typeof aValue === 'string' && typeof bValue === 'string') {
                    return sortConfig.desc
                        ? bValue.localeCompare(aValue)
                        : aValue.localeCompare(bValue);
                }
                if (typeof aValue === 'number' && typeof bValue === 'number') {
                    return sortConfig.desc ? bValue - aValue : aValue - bValue;
                }
                return 0;
            });
        }
        setFilteredData(result);
    }, [data, searchTerm, activeFilters, sortBy, columns]);
    const handleSearch = (term) => {
        setSearchTerm(term);
        onSearch?.(term);
    };
    const handleSort = (columnId) => {
        const newSortBy = sortBy.find((sort) => sort.columnId === columnId)
            ? sortBy.map((sort) => sort.columnId === columnId ? { ...sort, desc: !sort.desc } : sort)
            : [{ columnId, desc: false }];
        setSortBy(newSortBy);
        onSort?.(filteredData);
    };
    const handleFilter = (columnId, value) => {
        const newFilters = value
            ? [...activeFilters.filter((f) => f.columnId !== columnId), { columnId, value }]
            : activeFilters.filter((f) => f.columnId !== columnId);
        setActiveFilters(newFilters);
        onFilter?.(newFilters);
    };
    const handleSelect = (row) => {
        const newSelectedRows = selectedRows.includes(row)
            ? selectedRows.filter((r) => r !== row)
            : [...selectedRows, row];
        setSelectedRows(newSelectedRows);
        onSelect?.(newSelectedRows);
    };
    const handleSelectAll = () => {
        const newSelectedRows = selectedRows.length === filteredData.length ? [] : [...filteredData];
        setSelectedRows(newSelectedRows);
        onSelect?.(newSelectedRows);
    };
    const handleColumnResize = (columnId, width) => {
        setColumns((prevColumns) => prevColumns.map((col) => col.id === columnId ? { ...col, width } : col));
    };
    if (loading) {
        return (_jsx("div", { className: "card-base", children: _jsx("div", { className: "flex h-96 items-center justify-center", children: _jsx("div", { className: "text-sm text-stone-500", children: "Wird geladen..." }) }) }));
    }
    return (_jsxs("div", { className: "card-base", children: [_jsx("div", { className: "mb-4", children: _jsx("div", { className: "flex items-center justify-between", children: _jsxs("div", { children: [_jsx("h2", { className: "text-xl font-semibold text-stone-900", children: title }), subtitle && _jsx("p", { className: "mt-1 text-sm text-stone-500", children: subtitle })] }) }) }), _jsx("div", { className: "grid", children: _jsxs("div", { className: "flex w-full", children: [_jsxs("div", { className: "grid flex-1 overflow-hidden", children: [_jsx("label", { className: "sr-only", htmlFor: "search", children: "Suche" }), _jsxs("div", { className: "relative overflow-hidden border-b border-stone-100", children: [_jsx("div", { className: "absolute inset-y-0 left-1.5 grid h-full place-items-center pl-6 sm:pl-8", children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", "aria-hidden": "true", "data-slot": "icon", className: "size-5 text-stone-300", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" }) }) }), _jsx("input", { "aria-invalid": "false", className: "h-12 w-full border-0 outline-none ring-0 placeholder:text-stone-300 text-stone-900 focus:border-none focus:ring-0 focus:ring-offset-0 px-6 sm:px-8 ml-10", id: "search", name: "search", placeholder: "Suche", type: "text", value: searchTerm, onChange: (e) => handleSearch(e.target.value) })] })] }), _jsx("div", { className: "grid shrink-0 border-b border-stone-100", children: _jsxs("div", { className: "flex h-full", children: [_jsx("button", { className: "h-full grid shrink-0 place-items-center px-4 hover:bg-stone-50 text-color-secondary hover:bg-stone-50 hover:text-color-primary", title: "Zur\u00FCcksetzen", type: "button", onClick: resetTable, children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", "aria-hidden": "true", "data-slot": "icon", className: "size-4", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" }) }) }), _jsxs("div", { ref: columnSelectorRef, className: "h-full relative", children: [_jsx("button", { className: "h-full grid shrink-0 place-items-center px-4 hover:bg-stone-50 text-color-secondary hover:bg-stone-50 hover:text-color-primary", title: "Spaltenauswahl", type: "button", onClick: () => setShowColumnSelector(!showColumnSelector), children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: "1.5", stroke: "currentColor", "aria-hidden": "true", "data-slot": "icon", className: "size-4", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125Z" }) }) }), showColumnSelector && (_jsx("div", { className: "fixed z-50 mt-1 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none", style: {
                                                    top: columnSelectorRef.current?.getBoundingClientRect().bottom ?? 0,
                                                    left: columnSelectorRef.current?.getBoundingClientRect().right ?? 0,
                                                    transform: 'translateX(-100%)'
                                                }, children: _jsxs("div", { className: "p-2 space-y-1", children: [_jsx("div", { className: "px-2 py-1 text-sm font-medium text-stone-900", children: "Spaltenauswahl" }), columns.map((column) => (_jsxs("label", { className: "flex items-center px-2 py-1 hover:bg-stone-50 rounded cursor-pointer", children: [_jsx("input", { type: "checkbox", className: "checkbox-base", checked: !hiddenColumns.includes(column.id), onChange: () => toggleColumn(column.id) }), _jsx("span", { className: "ml-2 text-sm text-stone-500", children: column.header })] }, column.id)))] }) }))] })] }) })] }) }), _jsx("div", { className: "relative", children: _jsx("div", { className: "h-full overflow-x-auto overflow-y-visible", children: _jsxs("table", { className: `w-auto ${className}`, children: [_jsx(TableHeader, { columns: visibleColumns, activeFilters: activeFilters, onSort: handleSort, onFilter: handleFilter, sortBy: sortBy, className: headerClassName, allSelected: selectedRows.length === filteredData.length, onSelectAll: handleSelectAll, selectable: selectable, onColumnResize: handleColumnResize }), _jsx(TableBody, { columns: visibleColumns, data: filteredData, selectedRows: selectedRows, onSelect: handleSelect, onRowClick: onRowClick, rowHeight: rowHeight, selectable: selectable })] }) }) })] }));
};
