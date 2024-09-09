"use client";

import FiltroDataBetween, { FiltroDataBetweenContextProvider } from "@/components/filtro-data-between";
import { GlobalContext } from "@/components/globalContext";
import { NextUIProvider } from "@nextui-org/system";
import React, { Suspense } from "react";
import { PacmanLoader } from "react-spinners";
import ListarGrupos from "./processar/components/listarGrupos";
import ListarOperacoesAProcessar from "./processar/components/listarOperacoesAProcessar";
import { ProcessarDadosChangeContextProvider } from "./processar/components/processarDadosChangeContext";
import { Card, CardContent } from "@/components/ui/card";


export default function UePage() {
  const { ueSelected } = React.useContext(GlobalContext);

  if (!ueSelected)
    return <div>Deve selecionar a ue para continuar</div>;

  return (
    <>
      <div className="w-full">
        <NextUIProvider>
          <ProcessarDadosChangeContextProvider>
            <FiltroDataBetweenContextProvider>
              <FiltroDataBetween />
                <Suspense fallback={<PacmanLoader />}>
                <Card className="mt-4">
<CardContent>

                  <ListarGrupos />
</CardContent>
                </Card>
                </Suspense>
            </FiltroDataBetweenContextProvider>
          </ProcessarDadosChangeContextProvider>
        </NextUIProvider>
      </div>
    </>
  );
}
