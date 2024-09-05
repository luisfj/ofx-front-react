import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
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
import { UeInviteType, UeUserType } from "@/types/ueUserType";
import { LinkRemoveType } from "@/types/util/linkRemoveType";
import { CheckIcon, PenIcon, RefreshCwIcon, Trash2Icon } from "lucide-react";

export const getId = (obj: UeUserType | UeInviteType): number => {
    return ('id' in obj) ? (obj as UeInviteType).id! : (obj as UeUserType).userId!
};

function createAtivarInativarItem(ueUser: UeUserType, confirmarAtivarInativarUsuario?: React.Dispatch<UeUserType>) {

    if (!confirmarAtivarInativarUsuario)
        return (<></>);

    return (
        < DropdownMenuItem
            onClick={() => {
                confirmarAtivarInativarUsuario!(ueUser);
            }
            }
        >
            <RefreshCwIcon className="h-4 w-8" />
            {ueUser.status === 'ACTIVE' ? "Inativar" : "Ativar"}
        </DropdownMenuItem>);
}

export function createUeUserColumns(
    setOpenEditDrawer: React.Dispatch<React.SetStateAction<boolean>>,
    setEditUeUser: React.Dispatch<React.SetStateAction<UeUserType | undefined>>,
    confirmaExcluirOperacao: React.Dispatch<LinkRemoveType>,
    confirmarAtivarInativarUsuario?: React.Dispatch<UeUserType>
): ColumnDef<UeUserType>[] {

    const defaultColumns: ColumnDef<UeUserType>[] = [
        {
            accessorKey: "email",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        Usuário
                        < CaretSortIcon className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => <div> {row.getValue("email")} </div>,
        },
        {
            accessorKey: "administrator",
            header: "Admin",
            cell: ({ row }) => <div> {
                row.getValue("administrator") ? <CheckIcon /> : ''}</div >,
        },
        {
            accessorKey: "permissionWrite",
            header: "Escrita",
            cell: ({ row }) => (
                <div> {
                    row.getValue("permissionWrite") ? <CheckIcon /> : ''}</div >
            ),
        },
        {
            accessorKey: "permissionRead",
            header: "Leitura",
            cell: ({ row }) => (
                <div> {
                    row.getValue("permissionRead") ? <CheckIcon /> : ''}</div >
            ),
        },
        {
            accessorKey: "permissionImport",
            header: "Importação",
            cell: ({ row }) => (
                <div> {
                    row.getValue("permissionImport") ? <CheckIcon /> : ''}</div >
            ),
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => (
                <div> {
                    row.getValue("status") === 'ACTIVE' ? 'Ativo'
                        : row.getValue("status") === 'INACTIVE' ? 'Inativo'
                            : row.getValue("status") === 'INVITED' ? 'Convidado'
                                : row.getValue("status") === 'REJECTED' ? 'Rejeitado'
                                    : row.getValue("status") === 'CONFIRMED' ? 'Confirmado'
                                        : ''
                } </div>
            ),
        },
        {
            accessorKey: "permission",
            header: "Perm. Importação",
            cell: ({ row }) => (
                <div>
                    {row.getValue("permission")}
                </div>
            ),
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const ueUser = row.original;

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
                                disabled={ueUser.status !== 'INVITED' && ueUser.status !== 'ACTIVE' && ueUser.status !== 'INACTIVE'}
                                onClick={
                                    () => {
                                        setEditUeUser(ueUser);
                                        setOpenEditDrawer(true);
                                    }
                                }
                            >
                                <PenIcon className="h-4 w-8" /> Editar
                            </DropdownMenuItem>
                            < DropdownMenuItem
                                disabled={ueUser.status !== 'INVITED' && ueUser.status !== 'ACTIVE' && ueUser.status !== 'INACTIVE'}
                                className="text-muted-foreground focus:bg-destructive"
                                onClick={() => {
                                    confirmaExcluirOperacao({
                                        id: getId(ueUser),
                                        tipo: "EXCLUIR",
                                    });
                                }
                                }
                            >
                                <Trash2Icon className="h-4 w-8" /> Excluir
                            </DropdownMenuItem>
                            {createAtivarInativarItem(ueUser, confirmarAtivarInativarUsuario)}
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];
    return defaultColumns;
}