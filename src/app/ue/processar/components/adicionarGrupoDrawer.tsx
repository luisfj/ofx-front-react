"use client";

import { apiGrupoSave } from "@/api/gruposApi";
import { GlobalContext } from "@/components/globalContext";
import { CreateGrupoType } from "@/types/createGrupoType";
import { formatDate } from "date-fns";
import React, { useState } from "react";
import OperacaoDrawer from "./operacaoDrawer";

export default function AdicionarGrupoDrawer({
  openDrawer,
  setOpenDrawer,
  setIdGrupoAdicionado,
}: {
  openDrawer: boolean;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  setIdGrupoAdicionado: React.Dispatch<React.SetStateAction<number>> | null;
}) {
  const { userSelected, ueSelected } = React.useContext(GlobalContext);

  const [dataS, setDataS] = useState({
    id: 0,
    dataHora: formatDate(new Date(), "y-MM-dd"),
    fitId: "",
    memo: "",
    refNum: "",
    valor: 0,
  });

  if (!userSelected || !ueSelected)
    return <div>Deve selecionar o usuário e a ue para continuar</div>;

  const handleSaveClick = async (obj: {
    dataHora: string;
    memo: string;
    refNum: string | null;
    fitId: string | null;
    valor: number;
  }) => {
    if (!obj) throw new Error("Os campos devem ser preenchidos.");

    const objData: CreateGrupoType = {
      dataHora: obj.dataHora,
      memo: obj.memo,
      ordem: 0,
    };

    const response = await apiGrupoSave(
      userSelected.id,
      ueSelected.id,
      objData
    );

    if (!response.ok) {
      throw new Error("Failed to submit the data. Please try again.");
    }

    const data = await response.json();
    console.log(data);
    if (setIdGrupoAdicionado) setIdGrupoAdicionado(data.id);
  };
  return (
    <>
      <OperacaoDrawer
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        saveFunc={handleSaveClick}
        objectData={dataS}
        tipo="GRUPO"
      />
    </>
  );
}
