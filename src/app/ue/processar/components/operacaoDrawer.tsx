"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { OperacaoReturnType } from "@/types/operacaoReturnType";
import { OperacaoSaveTypeModal } from "@/types/operacaoSaveType";
import { getBackendValidDate } from "@/utils/dateUtils";
import { INTL_CONFIG_NO_CURRENCY } from "@/utils/numberFormat";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { DateTime } from 'luxon';
import React, { useContext } from "react";
import CurrencyInput from "react-currency-input-field";
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
  saveFunc: React.Dispatch<OperacaoSaveTypeModal>;
  objectData: OperacaoReturnType;
  tipo: "OPERACAO" | "GRUPO";
}) {
  const { setLastUpdateGrupos, setLastUpdateOperacoes } = useContext(
    ProcessarDadosChangeContext
  );

  const [date, setDate] = React.useState<DateTime | undefined>(
    objectData && objectData.dataHora
      ? getBackendValidDate(objectData.dataHora)
      : DateTime.now()
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
  const [fitChanged, setFitChanged] = React.useState(false);
  const [addComGrupo, setAddComGrupo] = React.useState(false);
  const [continuarAdicionando, setContinuarAdicionando] = React.useState(false);

  const onOpenStateChange: React.Dispatch<React.SetStateAction<boolean>> = (
    state
  ) => {
    setDate(
      objectData && objectData.dataHora
        ? getBackendValidDate(objectData.dataHora)
        : DateTime.now()
    );
    setMemo(objectData ? objectData.memo : "");
    setFitId(objectData ? objectData.fitId! : "");
    setValor(objectData ? objectData.valor : 0);

    setFitChanged(fitId !== memo);

    setSaveDisabled(false);

    setOpenDrawer(state);
  };

  const handleSaveClick = async () => {
    try {
      if (!date || !memo) throw new Error("Os campos devem ser preenchidos.");

      if (tipo == "OPERACAO" && !fitId)
        throw new Error("Os campos devem ser preenchidos.");

      setSaveDisabled(true);

      await saveFunc({
        dataHora: date.toFormat("yyyy-MM-dd'T'00:00:00"),
        memo: memo,
        refNum: fitId,
        fitId: fitId,
        valor: valor,
        adicionarComGrupo: addComGrupo
      });

      toast({
        title: "Sucesso!",
        description: "Salvo com sucesso",
      });

      if (setLastUpdateGrupos) setLastUpdateGrupos(new Date());
      if (setLastUpdateOperacoes) setLastUpdateOperacoes(new Date());

      if (!continuarAdicionando)
        setOpenDrawer(false);
      else {
        setMemo("");
        setFitId("");
        setValor(0);

        setFitChanged(fitId !== memo);
      }

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
                        date.toFormat('dd/MM/yyyy')
                      ) : (
                        <span>Selectione a Data</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      locale={ptBR}
                      selected={date?.toJSDate()}
                      onSelect={(date) => setDate(date ? DateTime.fromJSDate(date) : undefined)}                      
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
                  onChange={(event) => {
                    setMemo(event.target.value);
                    if (!fitChanged)
                      setFitId(event.target.value)
                  }}
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
                    onChange={(event) => {
                      if (memo !== event.target.value)
                        setFitChanged(true);
                      setFitId(event.target.value);
                    }}
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

                  <CurrencyInput
                    defaultValue={valor}
                    onValueChange={(value, name, values) => {
                      setValor(!values || !values.float ? 0 : values.float);
                    }}
                    intlConfig={INTL_CONFIG_NO_CURRENCY}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 col-span-3" />
                </div>
              )}

              {tipo == "GRUPO" || (objectData.id && objectData.id > 0) ? (
                <></>
              ) : (
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label className="text-right">Adicionar com Grupo</Label>

                  <Checkbox
                    checked={addComGrupo}
                    onCheckedChange={(value) => setAddComGrupo(!!value)}
                    aria-label="Adicionar com Grupo"
                  />
                </div>
              )}

              {objectData.id && objectData.id > 0 ? (
                <></>
              ) : (
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label className="text-right">Continuar Adicionando</Label>

                  <Checkbox
                    checked={continuarAdicionando}
                    onCheckedChange={(value) => setContinuarAdicionando(!!value)}
                    aria-label="Adicionar com Grupo"
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
