"use client";


import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { UeInviteType, UeUserType } from "@/types/ueUserType";
import { Table as TanstackTable } from "@tanstack/react-table";
import { ChevronDownIcon } from "lucide-react";

export function getUeInvitesFilters(table: TanstackTable<UeInviteType>) {
  return (
    <>
      <Input
        placeholder="Filtro Usuário..."
        value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("email")?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto">
            {(table.getColumn("permission")?.getFilterValue() as string) == "ADMIN"
              ? "Admin"
              : (table.getColumn("permission")?.getFilterValue() as string) == "ESCRITA"
                ? "Escrita"
                : (table.getColumn("permission")?.getFilterValue() as string) == "IMPORTACAO"
                  ? "Importação"
                  : (table.getColumn("permission")?.getFilterValue() as string) == "LEITURA"
                    ? "Leitura"
                    : "Todos"}
            <ChevronDownIcon className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuCheckboxItem
            key="all"
            className="capitalize"
            checked={
              (table.getColumn("permission")?.getFilterValue() as string) == undefined
            }
            onCheckedChange={(value) =>
              table.getColumn("permission")?.setFilterValue("")
            }
          >
            Todos
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            key="ADMIN"
            className="capitalize"
            checked={
              (table.getColumn("permission")?.getFilterValue() as string) == "ADMIN"
            }
            onCheckedChange={(value) =>
              table.getColumn("permission")?.setFilterValue("ADMIN")
            }
          >
            Admin
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            key="ESCRITA"
            className="capitalize"
            checked={
              (table.getColumn("permission")?.getFilterValue() as string) == "ESCRITA"
            }
            onCheckedChange={(value) =>
              table.getColumn("permission")?.setFilterValue("ESCRITA")
            }
          >
            Escrita
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            key="IMPORTACAO"
            className="capitalize"
            checked={
              (table.getColumn("permission")?.getFilterValue() as string) == "IMPORTACAO"
            }
            onCheckedChange={(value) =>
              table.getColumn("permission")?.setFilterValue("IMPORTACAO")
            }
          >
            Importação
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            key="LEITURA"
            className="capitalize"
            checked={
              (table.getColumn("permission")?.getFilterValue() as string) == "LEITURA"
            }
            onCheckedChange={(value) =>
              table.getColumn("permission")?.setFilterValue("LEITURA")
            }
          >
            Leitura
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto">
            {(table.getColumn("status")?.getFilterValue() as string) == "INVITED"
              ? "Convidado"
              : (table.getColumn("status")?.getFilterValue() as string) == "CONFIRMED"
              ? "Confirmado"
              : (table.getColumn("status")?.getFilterValue() as string) == "REJECTED"
                ? "Rejeitado"
                : "Todos"}
            <ChevronDownIcon className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuCheckboxItem
            key="all"
            className="capitalize"
            checked={
              (table.getColumn("status")?.getFilterValue() as string) == undefined
            }
            onCheckedChange={(value) =>
              table.getColumn("status")?.setFilterValue("")
            }
          >
            Todos
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            key="INVITED"
            className="capitalize"
            checked={
              (table.getColumn("status")?.getFilterValue() as string) == "INVITED"
            }
            onCheckedChange={(value) =>
              table.getColumn("status")?.setFilterValue("INVITED")
            }
          >
            Convidado
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            key="CONFIRMED"
            className="capitalize"
            checked={
              (table.getColumn("status")?.getFilterValue() as string) == "CONFIRMED"
            }
            onCheckedChange={(value) =>
              table.getColumn("status")?.setFilterValue("CONFIRMED")
            }
          >
            Confirmado
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            key="REJECTED"
            className="capitalize"
            checked={
              (table.getColumn("status")?.getFilterValue() as string) == "REJECTED"
            }
            onCheckedChange={(value) =>
              table.getColumn("status")?.setFilterValue("REJECTED")
            }
          >
            Rejeitado
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>

    </>
  );
}