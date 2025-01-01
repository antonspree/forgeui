import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { Table } from './components/table/Table';
const data = [
    { id: 1, name: 'Max Mustermann', email: 'max.mustermann@example.com', status: 'bezahlt', amount: 100 },
    { id: 2, name: 'Maria Musterfrau', email: 'maria.musterfrau@example.com', status: 'offen', amount: 200 },
    { id: 3, name: 'John Doe', email: 'john.doe@example.com', status: 'überfällig', amount: 150 },
    { id: 4, name: 'Jane Smith', email: 'jane.smith@example.com', status: 'bezahlt', amount: 300 },
    { id: 5, name: 'Peter Parker', email: 'peter.parker@example.com', status: 'offen', amount: 250 },
];
const columns = [
    {
        id: 'name',
        header: 'Name',
        width: 200,
        sortable: true,
        type: 'link',
        onLinkClick: (value, row) => {
            console.log('Clicked:', value, row);
            // Hier können Sie z.B. zu einer Detail-Seite navigieren
            // window.location.href = `/users/${row.id}`;
        }
    },
    {
        id: 'email',
        header: 'E-Mail',
        width: 250,
        sortable: true,
        type: 'free'
    },
    {
        id: 'amount',
        header: 'Betrag',
        width: 150,
        sortable: true,
        type: 'free'
    },
    {
        id: 'status',
        header: 'Status',
        width: 150,
        sortable: true,
        type: 'enum',
        filterOptions: [
            { value: 'bezahlt', label: 'Bezahlt' },
            { value: 'offen', label: 'Offen' },
            { value: 'überfällig', label: 'Überfällig' }
        ]
    }
];
function App() {
    const [tableData, setTableData] = useState(data);
    const handleFilter = (filters) => {
        let filteredData = [...data];
        filters.forEach(filter => {
            if (filter.value) {
                filteredData = filteredData.filter(item => item[filter.columnId] === filter.value);
            }
        });
        setTableData(filteredData);
    };
    const handleSort = (sortedData) => {
        setTableData(sortedData);
    };
    return (_jsx("div", { className: "min-h-screen bg-stone-100 p-8", children: _jsx("div", { className: "mx-auto max-w-7xl", children: _jsx("div", { className: "card-base", children: _jsx(Table, { title: "Beispiel Tabelle", columns: columns, data: tableData, selectable: true, onFilter: handleFilter, onSort: handleSort }) }) }) }));
}
export default App;
