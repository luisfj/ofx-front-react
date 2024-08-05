"use client";

import { apiGrupoUpdate } from "@/api/gruposApi";
import { apiOperacaoFindById } from "@/api/operacoesApi";
import { GlobalContext } from "@/components/globalContext";
import { CreateGrupoType } from "@/types/createGrupoType";
import { formatDate } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import OperacaoDrawer from "./operacaoDrawer";

export default function AtualizarGrupoDrawer({
  idGrupo,
  setIdGrupo,
}: {
  idGrupo: number;
  setIdGrupo: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [idEdit, setIdEdit] = React.useState(0);
  const { userSelected, ueSelected } = useContext(GlobalContext);

  const findInDbAsync = async () => {
    const data = await apiOperacaoFindById(
      userSelected!.id,
      ueSelected!.id,
      idGrupo
    );

    setDataS({
      id: data.id,
      dataHora: data.dataHora,
      fitId: data.fitId!,
      memo: data.memo,
      refNum: data.refNum!,
      valor: data.valor,
    });

    setOpenDrawer(true);
    setIdEdit(idGrupo);
    setIdGrupo(0);
  };

  useEffect(() => {
    if (idGrupo > 0) findInDbAsync();
  }, [idGrupo]);

  const [dataS, setDataS] = useState({
    id: 0,
    dataHora: formatDate(new Date(), "y-MM-dd"),
    fitId: "",
    memo: "",
    refNum: "",
    valor: 0,
  });

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

    const response = await apiGrupoUpdate(
      userSelected!.id,
      ueSelected!.id,
      idEdit,
      objData
    );

    if (!response.ok) {
      throw new Error("Failed to submit the data. Please try again.");
    }

    const data = await response.json();
    console.log(data);
  };

  if (!userSelected || !ueSelected)
    return <div>Deve selecionar o usuário e a ue para continuar</div>;

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
