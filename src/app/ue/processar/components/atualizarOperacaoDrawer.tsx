"use client";

import { apiOperacaoFindById, apiOperacaoUpdate } from "@/api/operacoesApi";
import { GlobalContext } from "@/components/globalContext";
import { CreateOperacaoType } from "@/types/createOperationType";
import { formatDate } from "date-fns";
import React, { useEffect, useState } from "react";
import OperacaoDrawer from "./operacaoDrawer";

export default function AtualizarOperacaoDrawer({
  idOperacao,
  setIdOperacao,
}: {
  idOperacao: number;
  setIdOperacao: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [idEdit, setIdEdit] = React.useState(0);
  const [idGrupo, setIdGrupo] = React.useState(0);
  const { userSelected, ueSelected } = React.useContext(GlobalContext);

  const findInDbAsync = async () => {
    const data = await apiOperacaoFindById(
      userSelected!.id,
      ueSelected!.id,
      idOperacao
    );

    setDataS({
      id: data.id,
      dataHora: data.dataHora,
      fitId: data.fitId!,
      memo: data.memo,
      refNum: data.refNum!,
      valor: data.valor,
    });

    setIdGrupo(data.idGrupo ?? 0);

    setOpenDrawer(true);
    setIdEdit(idOperacao);
    setIdOperacao(0);
  };

  useEffect(() => {
    if (idOperacao > 0) findInDbAsync();
  }, [idOperacao]);

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

    const objData: CreateOperacaoType = {
      dataHora: obj.dataHora,
      memo: obj.memo,
      refNum: obj.refNum,
      fitId: obj.fitId,
      ordem: 0,
      idGrupo: idGrupo <= 0 ? null : idGrupo,
      valor: obj.valor,
    };

    const response = await apiOperacaoUpdate(
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
    return idGrupo;
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
        tipo="OPERACAO"
      />
    </>
  );
}
