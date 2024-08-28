"use client";

import FiltroDataBetween, { FiltroDataBetweenContextProvider } from "@/components/filtro-data-between";
import { GlobalContext } from "@/components/globalContext";
import { NextUIProvider } from "@nextui-org/system";
import React, { Suspense } from "react";
import { PacmanLoader } from "react-spinners";
import ListarGrupos from "./processar/components/listarGrupos";
import ListarOperacoes from "./processar/components/listarOperacoes";
import { ProcessarDadosChangeContextProvider } from "./processar/components/processarDadosChangeContext";


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
              <div className="flex py-1">                
                <Suspense fallback={<PacmanLoader />}>
                  <ListarGrupos />
                </Suspense>
              </div>
            </FiltroDataBetweenContextProvider>
          </ProcessarDadosChangeContextProvider>
        </NextUIProvider>
      </div>
    </>
  );
}
