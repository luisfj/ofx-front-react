"use client";

import FiltroDataBetween, { FiltroDataBetweenContextProvider } from "@/components/filtro-data-between";
import { NextUIProvider } from "@nextui-org/system";
import { Suspense } from "react";
import { PacmanLoader } from "react-spinners";
import ListarGrupos from "./components/listarGrupos";
import ListarOperacoesAProcessar from "./components/listarOperacoesAProcessar";
import { ProcessarDadosChangeContextProvider } from "./components/processarDadosChangeContext";

export default function ProcessarPage() {

  return (
    <NextUIProvider>
      <ProcessarDadosChangeContextProvider>
        <FiltroDataBetweenContextProvider>
          <FiltroDataBetween />
          <div className="flex py-1">
            <Suspense fallback={<PacmanLoader />}>
              <ListarOperacoesAProcessar />
            </Suspense>
            <Suspense fallback={<PacmanLoader />}>
              <ListarGrupos />
            </Suspense>
          </div>
        </FiltroDataBetweenContextProvider>
      </ProcessarDadosChangeContextProvider>
    </NextUIProvider>
  );
}
