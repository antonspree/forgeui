import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const StatusBadge = ({ status }) => {
    const statusStyles = {
        bezahlt: 'bg-green-100 text-green-700',
        offen: 'bg-yellow-100 text-yellow-700',
        überfällig: 'bg-red-100 text-red-700',
    };
    return (_jsx("div", { className: `relative flex max-w-max items-center gap-1.5 whitespace-nowrap rounded-md text-xs font-medium ${statusStyles[status]} px-2 py-1`, title: status, children: _jsx("span", { className: "truncate", children: status }) }));
};
export const TableBody = ({ data, columns, selectable, selectedRows = [], onSelect, onRowClick, rowHeight = 56, }) => {
    const handleRowClick = (row) => {
        onRowClick?.(row);
    };
    const handleCheckboxClick = (e, row) => {
        e.stopPropagation();
        onSelect?.(row);
    };
    if (data.length === 0) {
        return (_jsx("tbody", { children: _jsx("tr", { children: _jsx("td", { colSpan: columns.length + (selectable ? 1 : 0), className: "py-4 text-center text-sm text-stone-500", children: "Keine Daten vorhanden" }) }) }));
    }
    return (_jsx("tbody", { children: data.map((row, rowIndex) => (_jsxs("tr", { className: "hover:bg-stone-50", onClick: () => handleRowClick(row), style: { height: rowHeight }, children: [selectable && (_jsx("td", { className: "group select-none whitespace-nowrap text-left font-normal hover:bg-stone-50", style: { width: 70 }, children: _jsx("div", { className: "flex items-center justify-stretch py-0.5 px-1", children: _jsx("div", { className: "pl-6 sm:pl-8", children: _jsx("div", { className: "relative flex cursor-pointer items-start", children: _jsx("div", { className: "flex h-5 items-center", children: _jsx("input", { type: "checkbox", className: "checkbox-base", id: "", checked: selectedRows.includes(row), onChange: (e) => handleCheckboxClick(e, row) }) }) }) }) }) })), columns.map((column) => (_jsx("td", { className: `group select-none whitespace-nowrap text-left font-normal hover:bg-stone-50 ${column.type === 'link' ? 'cursor-pointer' : ''}`, style: { width: column.width }, onClick: () => column.type === 'link' && column.onLinkClick?.(row[column.id], row), children: _jsx("div", { className: "flex items-center justify-stretch py-0.5 px-1", children: _jsx("div", { className: `pl-1 pr-2 text-sm ${column.type === 'link' ? 'text-stone-900 hover:underline' : ''}`, children: column.renderCell ? (column.renderCell(row[column.id], row)) : column.id === 'status' ? (_jsx(StatusBadge, { status: row[column.id] })) : (_jsx("div", { className: "truncate", children: row[column.id] })) }) }) }, column.id)))] }, rowIndex))) }));
};
export default TableBody;
