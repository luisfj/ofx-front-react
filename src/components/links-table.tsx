import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OperationTableType } from "@/types/operationTableType";
import { LinkRemoveType } from "@/types/util/linkRemoveType";
import { flexRender, Table as TanstackTable } from "@tanstack/react-table";
import { PacmanLoader } from "react-spinners";
import LinksRow from "./links-row";

export default function LinksTable({
  table,
  setIdEditOperacao,
  removerOperacaoDoGrupo,
  isLoading,
}: {
  table: TanstackTable<OperationTableType>;
  setIdEditOperacao: React.Dispatch<React.SetStateAction<number>>;
  removerOperacaoDoGrupo: React.Dispatch<LinkRemoveType>;
  isLoading: boolean;
}) {
  return (
    <div className="rounded-md sm:border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              <TableHead key={"collapseBtn"} />
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow key={0}>
              <TableCell key={0}>
                <PacmanLoader size={10} color="#47eb63" />
              </TableCell>
            </TableRow>
          ) : (
            <></>
          )}
          {table.getRowModel().rows?.length ? (
            table
              .getRowModel()
              .rows.map((row) =>
                LinksRow(row, setIdEditOperacao, removerOperacaoDoGrupo)
              )
          ) : (
            <TableRow>
              <TableCell
                colSpan={table.getVisibleFlatColumns.length}
                className="h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
