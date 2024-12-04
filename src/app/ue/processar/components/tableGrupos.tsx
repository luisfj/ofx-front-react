import { fetchDeleteToApi, fetchPutToApiNoBody } from "@/api/callApi";
import ConfirmDialog, { ConfirmDialogType } from "@/components/confirm-dialog";
import { GlobalContext } from "@/components/globalContext";
import LinksTable from "@/components/links-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { OperationTableType } from "@/types/operationTableType";
import { LinkRemoveType } from "@/types/util/linkRemoveType";
import { formatCurrency } from "@/utils/numberFormat";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { jsPDF } from 'jspdf'; //or use your library of choice here
import autoTable from 'jspdf-autotable';
import { FolderOutputIcon, PenIcon, PlusIcon, Trash2Icon } from "lucide-react";
import React, { useContext } from "react";
import AdicionarGrupoDrawer from "./adicionarGrupoDrawer";
import AdicionarOperacaoDrawer from "./adicionarOperacaoDrawer";
import AtualizarGrupoDrawer from "./atualizarGrupoDrawer";
import AtualizarOperacaoDrawer from "./atualizarOperacaoDrawer";
import { ProcessarDadosChangeContext } from "./processarDadosChangeContext";
import TableGruposFilters from "./tableGruposFilters";

const handleExportRows = (rows: Row<OperationTableType>[], nomeUe: string) => {
  const doc = new jsPDF();
  doc.setFontSize(20);
  const ySize = 230
  const textLength = nomeUe.length
  doc.text(nomeUe, (ySize - textLength) / 2, 20, { align: 'center' });

  const tableHeaders = ['Descrição', 'Data', 'Débito', 'Crédito'];

  const convertValorFormat = (value: any) => value ? formatCurrency(value) : value

  const convertRow = (row: Row<OperationTableType>) => {
    const original: { [key: string]: string | number | null | any } = row.original;
    let valorDebito = undefined
    let valorCredito = undefined

    original.valor < 0 && (valorDebito = original.valor) || (valorCredito = original.valor)

    return [original.memo, original.dataHora, convertValorFormat(valorDebito), convertValorFormat(valorCredito)];
  }

  const tableDatac = rows.map(convertRow);

  const mapValores = rows.map(r => r.original.valor);
  const totalDebitos = mapValores.filter(valor => valor && valor < 0).reduce((v1, v2) => v1! + v2!, 0)
  const totalCreditos = mapValores.filter(valor => valor && valor > 0).reduce((v1, v2) => v1! + v2!, 0)
  const resultadoTotal = mapValores.filter(valor => valor).reduce((v1, v2) => v1! + v2!, 0)

  const tableFootData: any[][] = [
    ['', 'TOTAL', convertValorFormat(totalDebitos), convertValorFormat(totalCreditos)],
    ['', '', 'RESULTADO', convertValorFormat(resultadoTotal)]
  ]

  autoTable(doc, {
    startY: 25,
    head: [tableHeaders],
    body: tableDatac,
    showFoot: "lastPage",
    foot: tableFootData,
    footStyles: { fontSize: 10, fillColor: undefined, textColor: 'black', halign: 'right' },
    willDrawCell: (cell) => {
      console.log(cell)
      if (cell.column.index === 1)
        cell.cell.styles.halign = cell.section !== 'foot' ? 'center' : 'right'
      else if (cell.column.index >= 2)
        cell.cell.styles.halign = 'right'
    }
  });


  doc.save('ofx-groups-pdf.pdf');
};

function createTableColumns(
  setIdEdit: React.Dispatch<React.SetStateAction<number>>,
  setIdGrupoAddOperacao: React.Dispatch<React.SetStateAction<number>>,
  excluirGrupoConfirm: React.Dispatch<number>
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
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("memo")}</div>
      ),
    },
    {
      accessorKey: "tipo",
      header: "Tipo",
      // visible: false,
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("tipo")}</div>
      ),
    },
    {
      accessorKey: "refNum",
      header: "Ref Num",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("refNum")}</div>
      ),
      enableHiding: false,
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
        <div className="lowercase">
          {(row.getValue("dataHora") as string).split(" ")[0]}
        </div>
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
      enableSorting: false,
      cell: ({ table, row }) => {
        const grupoId = row.original.id;

        return (
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
                  setIdEdit(grupoId);
                }}
              >
                <PenIcon className="h-4 w-8" /> Editar Grupo
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-muted-foreground focus:bg-destructive"
                onClick={() => {
                  excluirGrupoConfirm(grupoId);
                }}
              >
                <Trash2Icon className="h-4 w-8" /> Excluir Grupo
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setIdGrupoAddOperacao(grupoId);
                }}
              >
                <PlusIcon className="h-4 w-8" /> Nova Operação
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return defaultColumns;
}

export default function TableGrupos({
  operations,
  isLoading,
}: {
  operations: OperationTableType[];
  isLoading: boolean;
}) {
  const { setLastUpdateGrupos, setSelectedGrupos, setLastUpdateOperacoes } =
    useContext(ProcessarDadosChangeContext);
  const { ueSelected } = useContext(GlobalContext);

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

  const [openDrawerAdicionarGrupo, setOpenDrawerAdicionarGrupo] =
    React.useState(false);

  const [idEdit, setIdEdit] = React.useState(0);
  const [idGrupoAddOperacao, setIdGrupoAddOperacao] = React.useState(-1);
  const [idOperacaoEdit, setIdOperacaoEdit] = React.useState(0);

  const confirDialogDataBasic: ConfirmDialogType = {
    idConvite: 0,
    onClick: removerOperacaoDoGrupo,
    tipo: "REMOVE",
  };

  const [dataConfirmDialog, setDataConfirmDialog] = React.useState(
    confirDialogDataBasic
  );

  React.useEffect(() => {
    if (!table || !table.getSelectedRowModel()) {
      setTotalSelected(formatCurrency(0));
      return;
    }

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
    if (setSelectedGrupos)
      setSelectedGrupos(
        table.getSelectedRowModel().rows.length > 0
          ? table.getSelectedRowModel().rows.map((sel) => sel.original)
          : []
      );
  }, [rowSelection]);

  function confirmaRemoverGrupo(idGrupo: number) {
    setDataConfirmDialog({
      idConvite: idGrupo,
      onClick: excluirGrupoDefinitivamente,
      tipo: "DELETE",
      message:
        "Esta ação não poderá ser desfeita, o item será apagado permanentemente! As operações neste grupo serão removidas do grupo antes da exclusão. Confirma?",
    });
  }

  async function excluirGrupoDefinitivamente(idGrupo: number) {
    try {
      await fetchDeleteToApi(`/v1/data/grupo/${ueSelected!.id}/${idGrupo}`);

      toast({
        title: "Sucesso!",
        description: "Excluído com sucesso",
      });
      if (setLastUpdateGrupos) setLastUpdateGrupos(new Date());
      if (setLastUpdateOperacoes) setLastUpdateOperacoes(new Date());
    } catch (error: any) {
      toast({
        title: "Atenção!",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  function confirmaRemoverOperacaoDoGrupo(dataRemove: LinkRemoveType) {
    setDataConfirmDialog({
      idConvite: dataRemove.id,
      onClick:
        dataRemove.tipo === "MOVER"
          ? removerOperacaoDoGrupo
          : excluirOperacaoDefinitivamente,
      tipo: dataRemove.tipo === "MOVER" ? "REMOVE" : "DELETE",
    });
  }

  async function removerOperacaoDoGrupo(idOperacao: number) {
    try {
      await fetchPutToApiNoBody(`/v1/data/operacao/remover-grupo/${ueSelected!.id}/${idOperacao}`);

      toast({
        title: "Sucesso!",
        description: "Removido do grupo com sucesso",
      });
      if (setLastUpdateGrupos) setLastUpdateGrupos(new Date());
      if (setLastUpdateOperacoes) setLastUpdateOperacoes(new Date());
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Atenção!",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  async function excluirOperacaoDefinitivamente(idOperacao: number) {
    try {
      await fetchDeleteToApi(`/v1/data/operacao/single/${ueSelected!.id}/${idOperacao}`);

      toast({
        title: "Sucesso!",
        description: "Excluído com sucesso",
      });
      if (setLastUpdateGrupos) setLastUpdateGrupos(new Date());
    } catch (error: any) {
      toast({
        title: "Atenção!",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  const table = useReactTable({
    data: operations,
    columns: createTableColumns(
      setIdEdit,
      setIdGrupoAddOperacao,
      confirmaRemoverGrupo
    ),
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

      <AdicionarGrupoDrawer
        setOpenDrawer={setOpenDrawerAdicionarGrupo}
        openDrawer={openDrawerAdicionarGrupo}
        setIdGrupoAdicionado={null}
      />
      <AtualizarGrupoDrawer idGrupo={idEdit} setIdGrupo={setIdEdit} />
      <AdicionarOperacaoDrawer
        setIdGrupo={setIdGrupoAddOperacao}
        idGrupo={idGrupoAddOperacao}
      />
      <AtualizarOperacaoDrawer
        idOperacao={idOperacaoEdit}
        setIdOperacao={setIdOperacaoEdit}
      />
      <Button
        variant={"secondary"}
        onClick={() => setOpenDrawerAdicionarGrupo(true)}
      >
        <PlusIcon className="small" /> Novo Grupo
      </Button>
      <Button
        variant={"default"}
        onClick={() => handleExportRows(table.getFilteredRowModel().rows, ueSelected.nome)}
      >
        <FolderOutputIcon className="small" /> Exportar PDF
      </Button>
      <div className="flex items-center py-4">
        <TableGruposFilters table={table} />
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex-1 text-sm text-muted-foreground text-right">
          <div>VALOR: {totalSelected}</div>
        </div>
      </div>

      <LinksTable
        table={table}
        isLoading={isLoading}
        removerOperacaoDoGrupo={confirmaRemoverOperacaoDoGrupo}
        setIdEditOperacao={setIdOperacaoEdit}
      ></LinksTable>
    </div>

  );
}
