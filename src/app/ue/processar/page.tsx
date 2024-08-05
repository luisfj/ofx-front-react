"use client";

import { NextUIProvider } from "@nextui-org/system";
import { Suspense } from "react";
import { PacmanLoader } from "react-spinners";
import ListarGrupos from "./components/listarGrupos";
import ListarOperacoes from "./components/listarOperacoes";
import { ProcessarDadosChangeContextProvider } from "./components/processarDadosChangeContext";

export default function ProcessarPage() {
  return (
    <NextUIProvider>
      <div className="flex py-1">
        <ProcessarDadosChangeContextProvider>
          <Suspense fallback={<PacmanLoader />}>
            <ListarOperacoes />
          </Suspense>
          <Suspense fallback={<PacmanLoader />}>
            <ListarGrupos />
          </Suspense>
        </ProcessarDadosChangeContextProvider>
      </div>
    </NextUIProvider>
  );
}
