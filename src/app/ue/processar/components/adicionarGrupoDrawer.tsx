"use client";

import { fetchPostToApi } from "@/api/callApi";
import { GlobalContext } from "@/components/globalContext";
import { CreateGrupoType } from "@/types/createGrupoType";
import { DateTime } from 'luxon';
import React, { useEffect, useState } from "react";
import OperacaoDrawer from "./operacaoDrawer";

export type NewGroupDefaultProperties = {
  descricao: string,
  data: string | null
}

export default function AdicionarGrupoDrawer({
  openDrawer,
  setOpenDrawer,
  setIdGrupoAdicionado,
  defaultValues
}: {
  openDrawer: boolean;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  setIdGrupoAdicionado: React.Dispatch<React.SetStateAction<number>> | null;
  defaultValues?: NewGroupDefaultProperties
}) {
  const { ueSelected } = React.useContext(GlobalContext);

  const [dataS, setDataS] = useState({
    id: 0,
    dataHora: DateTime.now().toFormat('yyyy-MM-dd'),
    fitId: "",
    memo: "",
    refNum: "",
    valor: 0,
  });

  useEffect(() => {
    if (!defaultValues)
      return;
    dataS.dataHora = defaultValues.data!;
    dataS.memo = defaultValues.descricao;
    setDataS(dataS);
  }, [, defaultValues])

  if (!ueSelected)
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

    const response = await fetchPostToApi(`/v1/data/grupo/${ueSelected.id}`, objData);

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
