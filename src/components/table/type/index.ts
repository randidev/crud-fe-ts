import { ColumnDef } from "@tanstack/react-table";

export type Props<T> = {
  data: T[];
  columns: ColumnDef<T>[];
};
