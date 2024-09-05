"use client";

import { fetchPostToApi, fetchPutToApi } from "@/api/callApi";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { UeInviteType } from "@/types/ueUserType";
import React from "react";


export default function InviteDrawer({
  openDrawer,
  setOpenDrawer,
  setUpdateData,
  objectData,
  ueId,
}: {
  openDrawer: boolean;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  setUpdateData: React.Dispatch<React.SetStateAction<Date>>;
  objectData?: UeInviteType;
  ueId: number
}) {

  const [email, setEmail] = React.useState<string>(
    objectData ? objectData.email : ""
  );
  const [administrator, setAdministrator] = React.useState<boolean>(
    objectData && objectData.administrator ? true : false
  );
  const [permissionImport, setPermissionImport] = React.useState<boolean>(
    objectData && objectData.permissionImport ? true : false
  );
  const [permissionRead, setPermissionRead] = React.useState<boolean>(
    objectData && objectData.permissionRead ? true : false
  );
  const [permissionWrite, setPermissionWrite] = React.useState<boolean>(
    objectData && objectData.permissionWrite ? true : false
  );

  const [saveDisabled, setSaveDisabled] = React.useState(false);

  const saveFunc = async () => {
    const objData: UeInviteType = {
      email: email,
      administrator: administrator,
      permissionImport: permissionImport,
      permissionRead: permissionRead,
      permissionWrite: permissionWrite,
      status: 'INVITED'
    };

    if (objectData && objectData.id)
      await fetchPutToApi(`/v1/permission-checker/ue/invite/${ueId}/${objectData.id}`, objData);
    else
      await fetchPostToApi(`/v1/permission-checker/ue/invite/${ueId}`, objData);
  };

  const onOpenStateChange: React.Dispatch<React.SetStateAction<boolean>> = (
    state
  ) => {
    setEmail(objectData ? objectData.email : "");
    setAdministrator(objectData && objectData.administrator ? true : false);
    setPermissionImport(objectData && objectData.permissionImport ? true : false);
    setPermissionRead(objectData && objectData.permissionRead ? true : false);
    setPermissionWrite(objectData && objectData.permissionWrite ? true : false);

    setSaveDisabled(false);

    setOpenDrawer(state);
  };

  const handleSaveClick = async () => {
    try {
      if (objectData && objectData.status !== 'INVITED') throw new Error("Não é possível alterar convites já finalizados.");
      if (!email || email.trim() === '') throw new Error("Email deve ser preenchidos.");

      setSaveDisabled(true);

      await saveFunc();

      toast({
        title: "Sucesso!",
        description: "Salvo com sucesso",
      });

      setUpdateData(new Date());
      setOpenDrawer(false);
    } catch (error: any) {
      toast({
        title: "Atenção!",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaveDisabled(false);
    }
  };
  return (
    <>
      <Drawer open={openDrawer} onOpenChange={onOpenStateChange}>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>
                Convidar para a UE
              </DrawerTitle>
              <DrawerDescription>
                Adicione as informações do Usuário. Clique em salvar
                para finalizar.
              </DrawerDescription>
            </DrawerHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Descrição
                </Label>
                <Input
                  value={email ?? ""}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  placeholder="Descrição"
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Admin</Label>
                <Checkbox
                  checked={administrator}
                  onCheckedChange={(value) => setAdministrator(!!value)}
                  aria-label="Admin"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Permissão de Leitura</Label>
                <Checkbox
                  checked={permissionRead}
                  onCheckedChange={(value) => setPermissionRead(!!value)}
                  aria-label="Permissão de Leitura"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Permissão de Escrita</Label>
                <Checkbox
                  checked={permissionWrite}
                  onCheckedChange={(value) => setPermissionWrite(!!value)}
                  aria-label="Permissão de Escrita"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Permissão de Importação</Label>
                <Checkbox
                  checked={permissionImport}
                  onCheckedChange={(value) => setPermissionImport(!!value)}
                  aria-label="Permissão de Importação"
                />
              </div>

            </div>
            <DrawerFooter>
              <Button
                type="button"
                disabled={saveDisabled}
                onClick={handleSaveClick}
              >
                Salvar
              </Button>
              <DrawerClose asChild>
                <Button variant="secondary">Fechar</Button>
              </DrawerClose>
              <div />
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
