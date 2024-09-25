"use client";


import { Input } from "@/components/ui/input";
import { UeUserInviteDetail } from "@/types/ueUserType";
import { Table as TanstackTable } from "@tanstack/react-table";

export function getMyInvitesFilters(table: TanstackTable<UeUserInviteDetail>) {
    return (
        <>
            <Input
                placeholder="Filtro Ue..."
                value={(table.getColumn("ueName")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                    table.getColumn("ueName")?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
            />
            <Input
                placeholder="Filtro Convidado Por..."
                value={(table.getColumn("createdName")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                    table.getColumn("createdName")?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
            />
        </>
    );
}