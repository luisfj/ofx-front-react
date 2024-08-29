import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ProcOperationTableType } from "@/types/operationTableType";
import { Table as TanstackTable } from "@tanstack/react-table";
import { ChevronDownIcon } from "lucide-react";

export default function TableProcOperationsFilters({
  table,
}: {
  table: TanstackTable<ProcOperationTableType>;
}) {
  return (
    <>
      <Input
        placeholder="Filtro Descrição..."
        value={(table.getColumn("memo")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("memo")?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />

      <Input
        placeholder="Filtro RefNum..."
        value={(table.getColumn("refNum")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("refNum")?.setFilterValue(event.target.value)
        }
        className="max-w-sm ml-2"
      />

      <Input
        placeholder="Filtro Data..."
        value={(table.getColumn("dataHora")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("dataHora")?.setFilterValue(event.target.value)
        }
        className="max-w-sm ml-2"
      />

    <Input
        placeholder="Filtro Grupo..."
        value={(table.getColumn("nomeGrupo")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("nomeGrupo")?.setFilterValue(event.target.value)
        }
        className="max-w-sm ml-2"
      />

      <Input
        placeholder="Filtro Data Grupo..."
        value={(table.getColumn("dataHoraGrupo")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("dataHoraGrupo")?.setFilterValue(event.target.value)
        }
        className="max-w-sm ml-2"
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-2">
            {(table.getColumn("tipo")?.getFilterValue() as string) == "CREDIT"
              ? "Créditos"
              : (table.getColumn("tipo")?.getFilterValue() as string) == "DEBIT"
                ? "Débito"
                : "Todas as Operações"}
            <ChevronDownIcon className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuCheckboxItem
            key="all"
            className="capitalize"
            checked={
              (table.getColumn("tipo")?.getFilterValue() as string) == undefined
            }
            onCheckedChange={(value) =>
              table.getColumn("tipo")?.setFilterValue("")
            }
          >
            Todas
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            key="credit"
            className="capitalize"
            checked={
              (table.getColumn("tipo")?.getFilterValue() as string) == "CREDIT"
            }
            onCheckedChange={(value) =>
              table.getColumn("tipo")?.setFilterValue("CREDIT")
            }
          >
            Créditos
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            key="debit"
            className="capitalize"
            checked={
              (table.getColumn("tipo")?.getFilterValue() as string) == "DEBIT"
            }
            onCheckedChange={(value) =>
              table.getColumn("tipo")?.setFilterValue("DEBIT")
            }
          >
            Débitos
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-2">
            Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
