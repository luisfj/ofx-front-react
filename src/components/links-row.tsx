"use client";
import { TableCell, TableRow } from "@/components/ui/table";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { OperationTableType } from "@/types/operationTableType";
import { LinkRemoveType } from "@/types/util/linkRemoveType";
import { RowSpacingIcon } from "@radix-ui/react-icons";
import { flexRender, Row } from "@tanstack/react-table";
import LinksVisitors from "./links-visitors";

export default function LinksRow(
  row: Row<OperationTableType>,
  setIdEditOperacao: React.Dispatch<React.SetStateAction<number>>,
  removerOperacaoDoGrupo: React.Dispatch<LinkRemoveType>
) {
  // const [open, setOpen] = useState(false);

  const link = row.original;

  function collapsibleElement() {
    if (link.filhos && link.filhos.length > 0) {
      return (
        <CollapsibleTrigger asChild>
          <RowSpacingIcon />
        </CollapsibleTrigger>
      );
    }
    return <></>;
  }

  return (
    // <Collapsible key={link.id} asChild open={open} onOpenChange={setOpen}>
    <Collapsible key={link.id} asChild>
      <>
        <TableRow key={link.id} data-state={row.getIsSelected() && "selected"}>
          <TableCell>{collapsibleElement()}</TableCell>
          {row.getVisibleCells().map((cell) => (
            <TableCell key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
        <CollapsibleContent asChild>
          <LinksVisitors
            setIdEditOperacao={setIdEditOperacao}
            removerOperacaoDoGrupo={removerOperacaoDoGrupo}
            childs={link.filhos}
          />
        </CollapsibleContent>
      </>
    </Collapsible>
  );
}
