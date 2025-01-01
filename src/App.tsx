import { useState } from 'react';
import { Table } from './components/table/Table';
import type { Column } from './components/table/types';

const data = [
  { id: 1, name: 'Max Mustermann', email: 'max.mustermann@example.com', status: 'bezahlt', amount: 100 },
  { id: 2, name: 'Maria Musterfrau', email: 'maria.musterfrau@example.com', status: 'offen', amount: 200 },
  { id: 3, name: 'John Doe', email: 'john.doe@example.com', status: 'überfällig', amount: 150 },
  { id: 4, name: 'Jane Smith', email: 'jane.smith@example.com', status: 'bezahlt', amount: 300 },
  { id: 5, name: 'Peter Parker', email: 'peter.parker@example.com', status: 'offen', amount: 250 },
];

const columns: Column[] = [
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

  const handleFilter = (filters: { columnId: string; value: string }[]) => {
    let filteredData = [...data];
    
    filters.forEach(filter => {
      if (filter.value) {
        filteredData = filteredData.filter(item => item[filter.columnId as keyof typeof item] === filter.value);
      }
    });

    setTableData(filteredData);
  };

  const handleSort = (sortedData: any[]) => {
    setTableData(sortedData);
  };

  return (
    <div className="min-h-screen bg-stone-100 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="card-base">
          <Table
            title="Beispiel Tabelle"
            columns={columns}
            data={tableData}
            selectable
            onFilter={handleFilter}
            onSort={handleSort}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
