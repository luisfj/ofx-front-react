"use client";

import * as React from "react";

import { fetchDeleteToApi, fetchFromApi, fetchPutToApiNoBody } from "@/api/callApi";
import ConfirmDialog, { ConfirmDialogType } from "@/components/confirm-dialog";
import GenericTable from "@/components/genericTable";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { UeUserInviteDetail } from "@/types/ueUserType";
import { ColumnDef } from "@tanstack/react-table";
import { createMyInvitesColumns } from "./utils/createMyInvitesColumns";
import { getMyInvitesFilters } from "./utils/myInvitesFilters";


export default function MyInvites(
    {setRefreshUeListDate}:
    {setRefreshUeListDate:React.Dispatch<React.SetStateAction<boolean>>}) {

    const confirDialogDataBasic: ConfirmDialogType = {
        idConvite: 0,
        onClick: () => { },
        tipo: "CONFIRM",
    };

    const [dataConfirmDialog, setDataConfirmDialog] = React.useState(
        confirDialogDataBasic
    );

    function confirmaRejeitarConvite(dataRemove: UeUserInviteDetail) {
        setDataConfirmDialog({
            message: `Tem certeza que deseja rejeitar o convite de acesso a ue '${dataRemove.ueName}' feito pelo usuário '${dataRemove.createdName}'? A ação não poderá ser desfeita!`,
            idConvite: dataRemove.id,
            onClick: rejeitarConvite,
            tipo: "CONFIRM",
        });
    }

    async function rejeitarConvite(idInvite: number) {
        try {
            await fetchPutToApiNoBody(`/v1/permission-checker/ue/invite/reject/${idInvite}`);
            setDateUpdateData(new Date());
            setRefreshUeListDate(true);
            toast({
                title: "Sucesso!",
                description: "Convite rejeitado",
            });

        } catch (error: any) {
            toast({
                title: "Atenção!",
                description: error.message,
                variant: "destructive",
            });
        }
    }

    function confirmaAceitarConvite(dataRemove: UeUserInviteDetail) {
        setDataConfirmDialog({
            message: `Aceitar o convite de acesso a ue '${dataRemove.ueName}' feito pelo usuário '${dataRemove.createdName}'?`,
            idConvite: dataRemove.id,
            onClick: aceitarConvite,
            tipo: "CONFIRM",
        });
    }

    async function aceitarConvite(idInvite: number) {
        try {
            await fetchPutToApiNoBody(`/v1/permission-checker/ue/invite/confirm/${idInvite}`);
            setDateUpdateData(new Date());
            setRefreshUeListDate(true);
            toast({
                title: "Sucesso!",
                description: "Convite Aceito",
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
    const [data, setData] = React.useState<UeUserInviteDetail[]>([]);
    const [dateUpdateData, setDateUpdateData] = React.useState(new Date());

    async function refreshData() {
        setIsLoading(true);
        try {
            const resp: UeUserInviteDetail[] = await fetchFromApi(`/v1/permission-checker/ue/invites/`);
            setData(resp);
        } catch (ex: any) {
            console.error(ex);
        }

        setIsLoading(false);
    }

    React.useEffect(() => {
        refreshData();
    }, [, dateUpdateData]);


    const defaultColumns = createMyInvitesColumns(
        confirmaAceitarConvite,
        confirmaRejeitarConvite) as ColumnDef<UeUserInviteDetail>[];

    return (
        <Card hidden={!data || data.length <= 0}
        className="mb-5">
            <CardHeader>Convites a Ues Pendentes</CardHeader>
            <CardContent>
                <ConfirmDialog
                    dataConfirm={dataConfirmDialog}
                    setDataConfirm={setDataConfirmDialog}
                />

                <GenericTable dataValues={data}
                    defaultColumns={defaultColumns}
                    filter={getMyInvitesFilters}
                    isLoading={isLoading}
                    hiddenColumns={{
                        permission: false
                    }}
                />
            </CardContent>
        </Card>
    );
}
