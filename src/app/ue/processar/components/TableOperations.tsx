"use client";

import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import * as React from "react";

import { fetchDeleteToApi, fetchPostToApi } from "@/api/callApi";
import ConfirmDialog, { ConfirmDialogType } from "@/components/confirm-dialog";
import { GlobalContext } from "@/components/globalContext";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { OperationTableType } from "@/types/operationTableType";
import { LinkRemoveType } from "@/types/util/linkRemoveType";
import { convertToDate } from "@/utils/dateUtils";
import { formatCurrency } from "@/utils/numberFormat";
import { CopyIcon, CopyPlusIcon, PenIcon, PlusIcon, RefreshCwIcon, Trash2Icon } from "lucide-react";
import { PacmanLoader } from "react-spinners";
import AdicionarGrupoDrawer, { NewGroupDefaultProperties } from "./adicionarGrupoDrawer";
import AdicionarOperacaoDrawer from "./adicionarOperacaoDrawer";
import AtualizarOperacaoDrawer from "./atualizarOperacaoDrawer";
import { ProcessarDadosChangeContext } from "./processarDadosChangeContext";
import TableGruposFilters from "./tableGruposFilters";

function createDefaultColumns(
  setIdEditOperacao: React.Dispatch<React.SetStateAction<number>>,
  confirmaExcluirOperacao: React.Dispatch<LinkRemoveType>
): ColumnDef<OperationTableType>[] {
  const defaultColumns: ColumnDef<OperationTableType>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),

      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "memo",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Descrição
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div className="capitalize">{row.getValue("memo")}</div>,
    },
    {
      accessorKey: "tipo",
      header: "Tipo",
      // visible: false,
      cell: ({ row }) => <div className="capitalize">{row.getValue("tipo")}</div>,
    },
    {
      accessorKey: "refNum",
      header: "Ref Num",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("refNum")}</div>
      ),
    },
    {
      accessorKey: "fitId",
      header: "Fit Id",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("fitId")}</div>
      ),
    },
    {
      accessorKey: "nomeConta",
      header: "Conta",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("nomeConta")}</div>
      ),
    },
    {
      accessorKey: "dataHora",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Data
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("dataHora")}</div>
      ),
    },
    {
      accessorKey: "valor",
      header: () => <div className="text-right">Valor</div>,
      cell: ({ row }) => {
        const formatted = formatCurrency(row.getValue("valor"));
        return <div className="text-right font-medium">{formatted}</div>;
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const operation = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText("" + operation.memo)}
              >
                <CopyIcon className="h-4 w-8" /> Copiar Descrição
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText("" + operation.fitId)}
              >
                <CopyIcon className="h-4 w-8" /> Copiar RefNum
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setIdEditOperacao(operation.id);
                }}
              >
                <PenIcon className="h-4 w-8" /> Editar Operação
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-muted-foreground focus:bg-destructive"
                onClick={() => {
                  confirmaExcluirOperacao({
                    id: operation.id,
                    tipo: "EXCLUIR",
                  });
                }}
              >
                <Trash2Icon className="h-4 w-8" /> Excluir Operação
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  return defaultColumns;
}

export default function TableOperations({
  operations,
  isLoading,
}: {
  operations: OperationTableType[];
  isLoading: boolean;
}) {
  const { ueSelected } = React.useContext(GlobalContext);

  const { selectedGrupos, setLastUpdateOperacoes, setLastUpdateGrupos } =
    React.useContext(ProcessarDadosChangeContext);

  const confirDialogDataBasic: ConfirmDialogType = {
    idConvite: 0,
    onClick: () => { },
    tipo: "CONFIRM",
  };

  const [dataConfirmDialog, setDataConfirmDialog] = React.useState(
    confirDialogDataBasic
  );

  const [defaultValuesNewGroup, setDefaultValuesNewGroup] = React.useState<NewGroupDefaultProperties>();

  const [openDrawerAdicionarGrupo, setOpenDrawerAdicionarGrupo] =
    React.useState(false);
  const [idGrupoAdicionado, setIdGrupoAdicionado] = React.useState(0);
  const [idGrupoAddOperacao, setIdGrupoAddOperacao] = React.useState(-1);
  const [idOperacaoEdit, setIdOperacaoEdit] = React.useState(0);

  const [totalSelected, setTotalSelected] = React.useState<string>(
    formatCurrency(0)
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({
      tipo: false,
      nomeConta: false,
      fitId: false, //hide this column by default
    });
  const [rowSelection, setRowSelection] = React.useState({});
  const [openDrawer, setOpenDrawer] = React.useState(false);

  function confirmaExcluirOperacao(dataRemove: LinkRemoveType) {
    setDataConfirmDialog({
      idConvite: dataRemove.id,
      onClick: excluirOperacaoDefinitivamente,
      tipo: "DELETE",
    });
  }

  async function excluirOperacaoDefinitivamente(idOperacao: number) {
    try {
      await fetchDeleteToApi(`/v1/data/operacao/single/${ueSelected!.id}/${idOperacao}`);

      toast({
        title: "Sucesso!",
        description: "Excluído com sucesso",
      });
      if (setLastUpdateOperacoes) setLastUpdateOperacoes(new Date());
    } catch (error: any) {
      toast({
        title: "Atenção!",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  React.useEffect(() => {
    function sum(a: number | null, b: number | null): number {
      return (a ?? 0) + (b ?? 0);
    }

    const totalSel =
      table.getSelectedRowModel().rows.length > 0
        ? table
          .getSelectedRowModel()
          .rows.map((sel) => sel.original.valor)
          .reduce((p, c) => sum(p, c))
        : 0;
    setTotalSelected(formatCurrency(totalSel));
  }, [rowSelection]);

  function confirmarAdicionarSelecionadosAoGrupo(): void {
    const grupoSelecionado = selectedGrupos[0];

    setDataConfirmDialog({
      idConvite: grupoSelecionado.id,
      tipo: "CONFIRM",
      message: `Confirma adicionar as operações selecionadas ao grupo '${grupoSelecionado.memo}'?`,
      onClick: async (idGrupo) => {
        await adicionarOperacoesSelecionadasAoGrupo(idGrupo);
      },
    });
  }
  React.useEffect(() => {
    if (idGrupoAdicionado > 0)
      adicionarOperacoesSelecionadasAoGrupo(idGrupoAdicionado);
  }, [idGrupoAdicionado]);

  async function adicionarOperacoesSelecionadasAoGrupo(idGrupo: number) {
    const response = await fetchPostToApi(
      `/v1/data/operacao/agrupar/${ueSelected!.id}/${idGrupo}`,
      table.getSelectedRowModel().rows.map((op) => op.original.id))

    if (!response.ok) {
      throw new Error("Failed to submit the data. Please try again.");
    }

    toast({
      title: "Sucesso!",
      description: "Agrupado com sucesso!",
    });

    setRowSelection([]);

    if (setLastUpdateOperacoes) setLastUpdateOperacoes(new Date());
    if (setLastUpdateGrupos) setLastUpdateGrupos(new Date());
  }

  const defaultColumns = createDefaultColumns(setIdOperacaoEdit, confirmaExcluirOperacao);

  const table = useReactTable({
    data: operations,
    columns: defaultColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  if (!ueSelected)
    return <div>Deve selecionar o usuário e a ue para continuar</div>;

  return (
    <div className="w-full sm:p-4">
      <ConfirmDialog
        dataConfirm={dataConfirmDialog}
        setDataConfirm={setDataConfirmDialog}
      />

      <AdicionarOperacaoDrawer
        setIdGrupo={setIdGrupoAddOperacao}
        idGrupo={idGrupoAddOperacao}
      />

      <AdicionarGrupoDrawer
        setOpenDrawer={setOpenDrawerAdicionarGrupo}
        openDrawer={openDrawerAdicionarGrupo}
        setIdGrupoAdicionado={setIdGrupoAdicionado}
        defaultValues={defaultValuesNewGroup}
      />
      <AtualizarOperacaoDrawer
        idOperacao={idOperacaoEdit}
        setIdOperacao={setIdOperacaoEdit}
      />

      <Button variant={"secondary"} onClick={() => setIdGrupoAddOperacao(0)}>
        <PlusIcon className="small" /> Nova Operação
      </Button>
      <div className="flex items-center py-4">
        <TableGruposFilters table={table} />
      </div>

      <div className="flex items-center justify-end space-x-2 py-4 text-sm text-muted-foreground">
        <div className="flex-1">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <div>VALOR: {totalSelected}</div>
        </div>
      </div>
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
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
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={defaultColumns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          <ContextMenuLabel>Ações</ContextMenuLabel>
          <ContextMenuItem
            onClick={() => confirmarAdicionarSelecionadosAoGrupo()}
            disabled={
              selectedGrupos.length <= 0 ||
              selectedGrupos.length > 1 ||
              table.getFilteredSelectedRowModel().rows.length <= 0
            }
          >
            <PlusIcon className="ml-2 mr-2 h-4 w-4" />
            Adicionar ao Grupo...
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => {
              let desc = table.getSelectedRowModel().rows[0].original.refNum;
              if (!desc || desc === '')
                desc = table.getSelectedRowModel().rows[0].original.memo;
              const dtHora = table.getSelectedRowModel().rows[0].original.dataHora;
              console.log(dtHora)
              setDefaultValuesNewGroup({
                data: convertToDate("y-MM-dd", dtHora),
                descricao: desc ?? ""
              })
              setOpenDrawerAdicionarGrupo(true);
            }}
            disabled={table.getFilteredSelectedRowModel().rows.length <= 0}
          >
            <CopyPlusIcon className="ml-2 mr-2 h-4 w-4" />
            Criar Grupo e Adicionar...
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => {
              if (setLastUpdateOperacoes) setLastUpdateOperacoes(new Date());
            }}
          >
            <RefreshCwIcon className="ml-2 mr-2 h-4 w-4" /> Atualizar Dados
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
}
