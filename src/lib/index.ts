// Components
import { Table as TableComponent } from '../components/table/Table';
import { TableHeader as TableHeaderComponent } from '../components/table/TableHeader';
import { TableBody as TableBodyComponent } from '../components/table/TableBody';
import type {
  Column,
  ColumnType,
  FilterOption,
  Filter,
  TableProps,
  SortConfig,
  TableState
} from '../components/table/types';

// Re-export components
export const Table = TableComponent;
export const TableHeader = TableHeaderComponent;
export const TableBody = TableBodyComponent;

// Re-export types
export type {
  Column,
  ColumnType,
  FilterOption,
  Filter,
  TableProps,
  SortConfig,
  TableState
};
