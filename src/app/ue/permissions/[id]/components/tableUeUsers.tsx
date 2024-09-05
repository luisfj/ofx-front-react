"use client";

import * as React from "react";

import { fetchDeleteToApi, fetchFromApi, fetchPutToApiNoBody } from "@/api/callApi";
import ConfirmDialog, { ConfirmDialogType } from "@/components/confirm-dialog";
import GenericTable from "@/components/genericTable";
import { toast } from "@/components/ui/use-toast";
import { getPermission, UeUserType } from "@/types/ueUserType";
import { LinkRemoveType } from "@/types/util/linkRemoveType";
import { ColumnDef } from "@tanstack/react-table";
import UeUserDrawer from "./UeUserDrawer";
import { createUeUserColumns } from "./utils/createUeUserColumns";
import { getUeUsersFilters } from "./utils/tableUeUsersFilters";


export default function TableUeUsers({
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

    function confirmaExcluirAcessoUsuario(dataRemove: LinkRemoveType) {
        setDataConfirmDialog({
            idConvite: dataRemove.id,
            onClick: excluirAcessoUsuarioDefinitivamente,
            tipo: "DELETE",
        });
    }

    async function excluirAcessoUsuarioDefinitivamente(idUser: number) {
        try {
            await fetchDeleteToApi(`/v1/permission-checker/ue/users/${idUe}/${idUser}`);

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

    function confirmaAtivarInativarAcessoUsuario(dataSelected: UeUserType) {
        const tipo = dataSelected.status !== "ACTIVE" ? "ATIVAR" : "INATIVAR";

        setDataConfirmDialog({
            idConvite: dataSelected.userId,
            message: `Confirma ${tipo} o usuário ${dataSelected.email}?`,
            onClick: dataSelected.status === "ACTIVE" ?
                confirmaInativarAcessoUsuarioDefinitivamente :
                confirmaAtivarAcessoUsuarioDefinitivamente,
            tipo: "CONFIRM",
        });
    }

    async function confirmaAtivarAcessoUsuarioDefinitivamente(idUser: number) {
        try {
            await fetchPutToApiNoBody(`/v1/permission-checker/ue/users/activate/${idUe}/${idUser}`);

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

    async function confirmaInativarAcessoUsuarioDefinitivamente(idUser: number) {
        try {
            await fetchPutToApiNoBody(`/v1/permission-checker/ue/users/inactivate/${idUe}/${idUser}`);

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
    const [data, setData] = React.useState<UeUserType[]>([]);
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const [selectedData, setSelectedData] = React.useState<UeUserType>();
    const [dateUpdateData, setDateUpdateData] = React.useState(new Date());

    async function refreshData() {
        setIsLoading(true);
        try {
            const resp: UeUserType[] = await fetchFromApi(`/v1/permission-checker/ue/users/${idUe}`);
            const respData = resp.map(ueUser => {
                ueUser.permission = getPermission(ueUser);
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
        confirmaExcluirAcessoUsuario,
        confirmaAtivarInativarAcessoUsuario
    ) as ColumnDef<UeUserType>[];

    return (
        <>
            <ConfirmDialog
                dataConfirm={dataConfirmDialog}
                setDataConfirm={setDataConfirmDialog}
            />
            <UeUserDrawer
                objectData={selectedData}
                openDrawer={openDrawer}
                setOpenDrawer={setOpenDrawer}
                setUpdateData={setDateUpdateData}
                ueId={idUe}
            />
            <GenericTable dataValues={data}
                defaultColumns={defaultColumns}
                filter={getUeUsersFilters}
                isLoading={isLoading}
                hiddenColumns={{
                    permission: false
                }}
            />
        </>
    );
}
