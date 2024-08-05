"use client";

import { apiOperacaoSave } from "@/api/operacoesApi";
import { GlobalContext } from "@/components/globalContext";
import { CreateOperacaoType } from "@/types/createOperationType";
import { formatDate } from "date-fns";
import React, { useEffect } from "react";
import OperacaoDrawer from "./operacaoDrawer";

export default function AdicionarOperacaoDrawer({
  idGrupo,
  setIdGrupo,
}: {
  idGrupo: number;
  setIdGrupo: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [idEdit, setIdEdit] = React.useState(0);
  const { userSelected, ueSelected } = React.useContext(GlobalContext);

  const dataS = {
    id: 0,
    dataHora: formatDate(new Date(), "y-MM-dd"),
    fitId: "",
    memo: "",
    refNum: "",
    valor: 0,
  };

  useEffect(() => {
    if (idGrupo >= 0) {
      setIdEdit(idGrupo);
      setOpenDrawer(true);
      setIdGrupo(-1);
    }
  }, [idGrupo]);

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

    const objData: CreateOperacaoType = {
      dataHora: obj.dataHora,
      memo: obj.memo,
      refNum: obj.refNum,
      fitId: obj.fitId,
      ordem: 0,
      idGrupo: idEdit,
      valor: obj.valor,
    };

    const response = await apiOperacaoSave(
      userSelected.id,
      ueSelected.id,
      objData
    );

    if (!response.ok) {
      throw new Error("Failed to submit the data. Please try again.");
    }

    const data = await response.json();
    console.log(data);
    return idEdit;
  };
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
