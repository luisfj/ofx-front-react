"use client";

import * as React from "react";

import { fetchDeleteToApi, fetchFromApi } from "@/api/callApi";
import ConfirmDialog, { ConfirmDialogType } from "@/components/confirm-dialog";
import GenericTable from "@/components/genericTable";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { getPermission, UeInviteType, UeUserType } from "@/types/ueUserType";
import { LinkRemoveType } from "@/types/util/linkRemoveType";
import { PlusIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import InviteDrawer from "./InviteDrawer";
import { createUeUserColumns } from "./utils/createUeUserColumns";
import { getUeInvitesFilters } from "./utils/tableUeInvitesFilters";


export default function TableUeInvites({
    idUe,
}: {
    idUe: number;
}) {

    const confirDialogDataBasic: ConfirmDialogType = {
        idConvite: 0,
        onClick: () => { },
        tipo: "CONFIRM",
    };

    const [dataConfirmDialog, setDataConfirmDialog] = React.useState(
        confirDialogDataBasic
    );
    const [idOperacaoEdit, setIdOperacaoEdit] = React.useState(0);

    function confirmaExcluirConvite(dataRemove: LinkRemoveType) {
        setDataConfirmDialog({
            idConvite: dataRemove.id,
            onClick: excluirConviteDefinitivamente,
            tipo: "DELETE",
        });
    }

    async function excluirConviteDefinitivamente(idInvite: number) {
        try {
            await fetchDeleteToApi(`/v1/permission-checker/ue/invite/${idUe}/${idInvite}`);
            setDateUpdateData(new Date());
            toast({
                title: "Sucesso!",
                description: "Excluído com sucesso",
            });

        } catch (error: any) {
            toast({
                title: "Atenção!",
                description: error.message,
                variant: "destructive",
            });
        }
    }

    const [isLoading, setIsLoading] = React.useState(true);
    const [isUnauthorized, setIsUnauthorized] = React.useState(false);
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const [data, setData] = React.useState<UeInviteType[]>([]);
    const [selectedData, setSelectedData] = React.useState<UeInviteType>();
    const [dateUpdateData, setDateUpdateData] = React.useState(new Date());

    async function refreshData() {
        setIsLoading(true);
        try {
            const resp: UeInviteType[] = await fetchFromApi(`/v1/permission-checker/ue/invites/${idUe}`);
            const respData = resp.map(ueUser => {
                ueUser.permission = getPermission(ueUser as UeUserType);
                return ueUser;
            });
            setData(respData);
            setIsUnauthorized(false);
        } catch (ex: any) {
            console.error(ex);
            setIsUnauthorized(true);
        }

        setIsLoading(false);
    }

    React.useEffect(() => {
        refreshData();
    }, [, dateUpdateData]);

    if (isUnauthorized)
        return <div>Sem autorização para manipular as permissões desta UE!</div>;

    const defaultColumns = createUeUserColumns(
        setOpenDrawer,
        setSelectedData as React.Dispatch<React.SetStateAction<UeUserType | undefined>>,
        confirmaExcluirConvite) as ColumnDef<UeInviteType>[];

    return (
        <>
            <ConfirmDialog
                dataConfirm={dataConfirmDialog}
                setDataConfirm={setDataConfirmDialog}
            />
            <InviteDrawer
                objectData={selectedData}
                openDrawer={openDrawer}
                setOpenDrawer={setOpenDrawer}
                setUpdateData={setDateUpdateData}
                ueId={idUe}
            />

            <Button
                variant={"secondary"}
                onClick={() => {
                    setSelectedData(undefined);
                    setOpenDrawer(true);
                }}
            >
                <PlusIcon className="small" /> Convidar Usuário
            </Button>

            <GenericTable dataValues={data}
                defaultColumns={defaultColumns}
                filter={getUeInvitesFilters}
                isLoading={isLoading}
                hiddenColumns={{
                    permission: false
                }}
            />
        </>
    );
}
