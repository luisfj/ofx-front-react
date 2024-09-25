import { CaretSortIcon, CircleBackslashIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
    ColumnDef
} from "@tanstack/react-table";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { UeUserInviteDetail } from "@/types/ueUserType";
import { CheckIcon } from "lucide-react";


export function createMyInvitesColumns(
    confirmarConvite: React.Dispatch<UeUserInviteDetail>
    , rejeitarConvite: React.Dispatch<UeUserInviteDetail>
): ColumnDef<UeUserInviteDetail>[] {

    const defaultColumns: ColumnDef<UeUserInviteDetail>[] = [
        {
            accessorKey: "ueName",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        Ue
                        < CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => <div> {row.getValue("ueName")} </div>,
        },
        {
            accessorKey: "createdName",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        Convidado por
                        < CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => <div> {row.getValue("createdName")} </div>,
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const convite = row.original;

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild >
                            <Button variant="ghost" className="h-8 w-8 p-0" >
                                <span className="sr-only" > Open menu </span>
                                < DotsHorizontalIcon className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        < DropdownMenuContent align="end" >
                            <DropdownMenuLabel>Actions </DropdownMenuLabel>

                            < DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={
                                    () => confirmarConvite(convite)
                                }
                            >
                                <CheckIcon className="h-4 w-8" /> Aceitar
                            </DropdownMenuItem>
                            < DropdownMenuItem
                                className="text-muted-foreground focus:bg-destructive"
                                onClick={() => rejeitarConvite(convite)}
                            >
                                <CircleBackslashIcon className="h-4 w-8" /> Rejeitar
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];
    return defaultColumns;
}