"use client";

import { GlobalContext } from "@/components/globalContext";
import { DEFAULT_COLORS } from "@/utils/colorsConstants";
import React from "react";
import ActionCard from "./components/actionCard";

export default function UePage() {
  const { userSelected, ueSelected } = React.useContext(GlobalContext);

  if (!userSelected || !ueSelected)
    return <div>Deve selecionar o usuário e a ue para continuar</div>;

  return (
    <>
      <div className="w-full grid grid-cols-3">
        <ActionCard
          action={{
            title: "Importar arquivo",
            description: "Importação de arquivo OFX.",
            buttonText: "Acessar",
            targetPath: "/ue/importar",
            bgColor: DEFAULT_COLORS[2],
            icon: "IMPORT",
          }}
        />
        <ActionCard
          action={{
            title: "Processar dados",
            description: "Processar lançamentos.",
            buttonText: "Acessar",
            targetPath: "/ue/processar",
            bgColor: DEFAULT_COLORS[0],
            icon: "REFRESH",
          }}
        />
      </div>
    </>
  );
}
