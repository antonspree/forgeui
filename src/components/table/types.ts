export interface FilterOption {
  value: string;
  label: string;
}

export type ColumnType = 'free' | 'enum' | 'link';

export interface Column {
  id: string;
  header: string;
  width?: number;
  sortable?: boolean;
  type: ColumnType;
  filterOptions?: FilterOption[];
  resizable?: boolean;
  className?: string;
  renderHeader?: (column: Column) => React.ReactNode;
  renderCell?: (value: any, row: any) => React.ReactNode;
  onLinkClick?: (value: any, row: any) => void;
}

export interface Filter {
  columnId: string;
  value: string;
}

export type SortConfig = {
  columnId: string;
  direction: 'asc' | 'desc';
};

export type TableState = {
  sortConfig?: SortConfig;
  filters: Filter[];
};

export interface TableHeaderProps {
  columns: Column[];
  activeFilters: Filter[];
  sortBy: { columnId: string; desc: boolean }[];
  className?: string;
  allSelected?: boolean;
  selectable?: boolean;
  onSort: (columnId: string) => void;
  onFilter: (columnId: string, value: string) => void;
  onSelectAll?: () => void;
  onColumnResize: (columnId: string, width: number) => void;
}

export interface TableBodyProps {
  data: any[];
  columns: Column[];
  selectable?: boolean;
  selectedRows?: any[];
  onSelect?: (row: any) => void;
  onRowClick?: (row: any) => void;
  rowHeight?: number;
}

export interface TableProps {
  title: string;
  subtitle?: string;
  data: any[];
  columns: Column[];
  className?: string;
  headerClassName?: string;
  rowHeight?: number;
  selectable?: boolean;
  loading?: boolean;
  onRowClick?: (row: any) => void;
  onSelect?: (selectedRows: any[]) => void;
  onSearch?: (searchTerm: string) => void;
  onFilter?: (filters: Filter[]) => void;
  onSort?: (sortedData: any[]) => void;
  onStateChange?: (state: TableState) => void;
}
