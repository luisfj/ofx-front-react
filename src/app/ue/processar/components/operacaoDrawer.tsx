"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { OperacaoReturnType } from "@/types/operacaoReturnType";
import { OperacaoSaveType } from "@/types/operacaoSaveType";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import React, { useContext } from "react";
import { ProcessarDadosChangeContext } from "./processarDadosChangeContext";

export default function OperacaoDrawer({
  openDrawer,
  setOpenDrawer,
  saveFunc,
  objectData,
  tipo,
}: {
  openDrawer: boolean;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  saveFunc: React.Dispatch<OperacaoSaveType>;
  objectData: OperacaoReturnType;
  tipo: "OPERACAO" | "GRUPO";
}) {
  const { setLastUpdateGrupos, setLastUpdateOperacoes } = useContext(
    ProcessarDadosChangeContext
  );

  const dataAtual = new Date();
  dataAtual.setHours(0, 0, 0, 0);

  const [date, setDate] = React.useState<Date | undefined>(
    objectData && objectData.dataHora
      ? new Date(objectData.dataHora)
      : dataAtual
  );
  const [memo, setMemo] = React.useState<string>(
    objectData ? objectData.memo : ""
  );
  const [fitId, setFitId] = React.useState<string>(
    objectData ? objectData.fitId! : ""
  );
  const [valor, setValor] = React.useState<number>(
    objectData ? objectData.valor : 0
  );
  const [saveDisabled, setSaveDisabled] = React.useState(false);

  const onOpenStateChange: React.Dispatch<React.SetStateAction<boolean>> = (
    state
  ) => {
    setDate(
      objectData && objectData.dataHora
        ? new Date(objectData.dataHora)
        : dataAtual
    );
    setMemo(objectData ? objectData.memo : "");
    setFitId(objectData ? objectData.fitId! : "");
    setValor(objectData ? objectData.valor : 0);
    setSaveDisabled(false);

    setOpenDrawer(state);
  };

  const handleSaveClick = async () => {
    try {
      if (!date || !memo) throw new Error("Os campos devem ser preenchidos.");

      if (tipo == "OPERACAO" && (!fitId || !valor))
        throw new Error("Os campos devem ser preenchidos.");

      setSaveDisabled(true);

      await saveFunc({
        dataHora: format(date, "y-MM-dd") + "T00:00:00",
        memo: memo,
        refNum: fitId,
        fitId: fitId,
        valor: valor,
      });

      toast({
        title: "Sucesso!",
        description: "Salvo com sucesso",
      });

      if (setLastUpdateGrupos) setLastUpdateGrupos(new Date());
      if (setLastUpdateOperacoes) setLastUpdateOperacoes(new Date());

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
                Salvar {tipo == "GRUPO" ? "Grupo" : "Operação"}
              </DrawerTitle>
              <DrawerDescription>
                Adicione as informações{" "}
                {tipo == "GRUPO" ? "do grupo" : "da operação"}. Clique em salvar
                para finalizar.
              </DrawerDescription>
            </DrawerHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Data</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? (
                        format(date, "dd/MM/y")
                      ) : (
                        <span>Selectione a Data</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      locale={ptBR}
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Descrição
                </Label>
                <Input
                  value={memo ?? ""}
                  onChange={(event) => setMemo(event.target.value)}
                  placeholder="Descrição"
                  className="col-span-3"
                />
              </div>
              {tipo == "GRUPO" ? (
                <></>
              ) : (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">FitId</Label>
                  <Input
                    value={fitId ?? ""}
                    onChange={(event) => setFitId(event.target.value)}
                    placeholder="Fit Id"
                    className="col-span-3"
                  />
                </div>
              )}

              {tipo == "GRUPO" ? (
                <></>
              ) : (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Valor</Label>
                  <Input
                    value={valor ?? ""}
                    onChange={(event) =>
                      setValor(Number.parseFloat(event.target.value))
                    }
                    placeholder="Valor"
                    className="col-span-3"
                  />
                </div>
              )}
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
