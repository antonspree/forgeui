# ForgeUI

Eine moderne React UI-Bibliothek mit schönen Komponenten.

## Installation

```bash
npm install forgeui
```

## Komponenten

### Table

Eine leistungsstarke Tabellen-Komponente mit folgenden Features:
- Sortierung
- Filterung
- Spaltenauswahl
- Klickbare Zeilen/Zellen
- Anpassbares Styling

#### Beispiel

```tsx
import { Table, type Column } from 'forgeui';

const columns: Column[] = [
  {
    id: 'name',
    header: 'Name',
    width: 200,
    sortable: true,
    type: 'link',
    onLinkClick: (value, row) => {
      console.log('Clicked:', value, row);
    }
  },
  {
    id: 'status',
    header: 'Status',
    width: 150,
    sortable: true,
    type: 'enum',
    filterOptions: [
      { value: 'active', label: 'Aktiv' },
      { value: 'inactive', label: 'Inaktiv' }
    ]
  }
];

const data = [
  { id: 1, name: 'John Doe', status: 'active' },
  { id: 2, name: 'Jane Smith', status: 'inactive' }
];

function App() {
  return (
    <Table
      title="Benutzer"
      subtitle="Benutzerverwaltung"
      columns={columns}
      data={data}
    />
  );
}
```

## Styling

Die Komponenten verwenden Tailwind CSS für das Styling. Stellen Sie sicher, dass Sie Tailwind CSS in Ihrem Projekt installiert und konfiguriert haben:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Fügen Sie die ForgeUI-Klassen zu Ihrer Tailwind-Konfiguration hinzu:

```js
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/forgeui/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## Entwicklung

1. Klonen Sie das Repository:
```bash
git clone https://github.com/antonspree/forgeui.git
cd forgeui
```

2. Installieren Sie die Abhängigkeiten:
```bash
npm install
```

3. Starten Sie den Entwicklungsserver:
```bash
npm run dev
```

## Build

Um die Library zu bauen:
```bash
npm run build:lib
```

## Lizenz

MIT
