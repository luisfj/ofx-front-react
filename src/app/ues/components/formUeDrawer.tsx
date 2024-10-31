"use client";

import { fetchPostToApi, fetchPutToApi } from "@/api/callApi";
import { Button } from "@/components/ui/button";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { UeBasicType } from "@/types/basicUUType";
import { DEFAULT_COLORS } from "@/utils/colorsConstants";
import React from "react";

export default function FormUeDrawer({
  openDrawer,
  setOpenDrawer,
  objectData,
  setRefreshData,
}: {
  openDrawer: boolean;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  objectData?: UeBasicType;
  setRefreshData: React.Dispatch<React.SetStateAction<boolean>>;
}) {

  const [nome, setNome] = React.useState<string>(
    objectData ? objectData.ueName : ""
  );
  const [color, setColor] = React.useState<string>(
    objectData && objectData.color ? objectData.color : ""
  );

  const [saveDisabled, setSaveDisabled] = React.useState(false);

  const onOpenStateChange: React.Dispatch<React.SetStateAction<boolean>> = (
    state
  ) => {
    setNome(objectData ? objectData.ueName : "");
    setColor(objectData && objectData.color ? objectData.color : "");
    setSaveDisabled(false);

    setOpenDrawer(state);
  };

  const handleSaveClick = async () => {
    try {
      if (!nome) throw new Error("Os campos devem ser preenchidos.");

      setSaveDisabled(true);

      if (objectData) {
        const resp = await fetchPutToApi(`/v1/permission-checker/ue/${objectData.ueId}`, {
          name: nome,
          color: color == "" ? null : color
        });
        if (resp.status !== 200)
          throw new Error('Erro ao salvar UE');
      } else {
        const resp = await fetchPostToApi('/v1/permission-checker/ue', {
          name: nome,
          color: color == "" ? null : color
        });
        if (resp.status !== 201)
          throw new Error('Erro ao salvar UE');
      }

      toast({
        title: "Sucesso!",
        description: "Salvo com sucesso",
      });

      setOpenDrawer(false);
      setRefreshData(true);
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
                Dados da UE
              </DrawerTitle>
              <DrawerDescription>
                Adicione as informações da ue. Clique em salvar para finalizar.
              </DrawerDescription>
            </DrawerHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nome
                </Label>
                <Input
                  value={nome ?? ""}
                  onChange={(event) => setNome(event.target.value)}
                  placeholder="Nome"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Cor
                </Label>

                <Select
                  defaultValue={color && color !== '' ? color : undefined}
                  onValueChange={(newColor) => { console.log(newColor); setColor(newColor); }}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem key={null} value={''}><div>Selecione a Cor</div></SelectItem>
                    {DEFAULT_COLORS.map((color) => (
                      <SelectItem key={color} value={color}>
                        <div className={color + " w-[220px] h-6"} />
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
