import {
  //   ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import type { Character } from "../../types/types";
import styles from "./index.module.css";

interface Props {
  data: Character[];
  onRowClick: (id: number) => void;
}

export default function CharacterTable({ data, onRowClick }: Props) {
  const columns: ColumnDef<Character>[] = [
    {
      header: "Image",
      accessorKey: "image",
      cell: (info) => (
        <img src={info.getValue() as string} width={50} loading="lazy" />
      ),
    },
    { header: "Name", accessorKey: "name" },
    { header: "Status", accessorKey: "status" },
    { header: "Species", accessorKey: "species" },
    { header: "Type", accessorKey: "type" },
    { header: "Gender", accessorKey: "gender" },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <table className={styles.characterTable}>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows?.length === 0 && (
          <td
            colSpan={4}
            style={{
              width: "100%",
              textAlign: "center",
              color: "#333",
            }}
          >
            No character data found.
          </td>
        )}
        {table.getRowModel().rows.map((row) => (
          <tr
            key={row.id}
            onClick={() => onRowClick(row.original.id)}
            className="character-table-row"
          >
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
