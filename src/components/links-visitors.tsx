import { TableCell, TableRow } from "@/components/ui/table";
import { OperationTableType } from "@/types/operationTableType";
import { LinkRemoveType } from "@/types/util/linkRemoveType";
import { formatCurrency } from "@/utils/numberFormat";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { PenIcon, ReplyIcon, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function LinksVisitors({
  childs,
  setIdEditOperacao,
  removerOperacaoDoGrupo,
}: {
  childs: OperationTableType[];
  setIdEditOperacao: React.Dispatch<React.SetStateAction<number>>;
  removerOperacaoDoGrupo: React.Dispatch<LinkRemoveType>;
}) {
  return (
    <>
      {childs ? (
        childs.map((operation) => (
          <TableRow className="bg-accent" key={operation.id}>
            <TableCell></TableCell>
            <TableCell colSpan={2}>{operation.memo}</TableCell>
            <TableCell>{operation.refNum}</TableCell>
            <TableCell>{operation.dataHora!.split(" ")[0]}</TableCell>
            <TableCell align="right">
              {formatCurrency(operation.valor)}
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <DotsHorizontalIcon className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Ações</DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={() => {
                      setIdEditOperacao(operation.id);
                    }}
                  >
                    <PenIcon className="h-4 w-8" /> Editar Operação
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      removerOperacaoDoGrupo({
                        id: operation.id,
                        tipo: "MOVER",
                      });
                    }}
                  >
                    <ReplyIcon className="h-4 w-8" /> Remover Operação do Grupo
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-muted-foreground focus:bg-destructive"
                    onClick={() => {
                      removerOperacaoDoGrupo({
                        id: operation.id,
                        tipo: "EXCLUIR",
                      });
                    }}
                  >
                    <Trash2Icon className="h-4 w-8" /> Excluir Operação
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))
      ) : (
        <></>
      )}
    </>
  );
}
