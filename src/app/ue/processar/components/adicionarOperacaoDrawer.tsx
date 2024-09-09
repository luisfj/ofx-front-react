"use client";

import { apiOperacaoSave } from "@/api/operacoesApi";
import { GlobalContext } from "@/components/globalContext";
import { CreateOperacaoType } from "@/types/createOperationType";
import { formatDate } from "date-fns";
import React, { useEffect } from "react";
import OperacaoDrawer from "./operacaoDrawer";
import { fetchPostToApi } from "@/api/callApi";
import { CreateGrupoType } from "@/types/createGrupoType";

export default function AdicionarOperacaoDrawer({
  idGrupo,
  setIdGrupo,
}: {
  idGrupo: number;
  setIdGrupo: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [idEdit, setIdEdit] = React.useState(0);
  const { ueSelected } = React.useContext(GlobalContext);

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

  if (!ueSelected)
    return <div>Deve selecionar o usuário e a ue para continuar</div>;

  const handleSaveClick = async (obj: {
    dataHora: string;
    memo: string;
    refNum: string | null;
    fitId: string | null;
    valor: number;
    adicionarComGrupo?: boolean
  }) => {
    if (!obj) throw new Error("Os campos devem ser preenchidos.");

    let grupoId = idEdit;

    if(obj.adicionarComGrupo){
      const objData: CreateGrupoType = {
        dataHora: obj.dataHora,
        memo: obj.memo,
        ordem: 0,
      };
  
      const response = await fetchPostToApi(`/v1/data/grupo/${ueSelected.id}`, objData);
  
      const data = await response.json();
      grupoId = data.id;
    }

    const objData: CreateOperacaoType = {
      dataHora: obj.dataHora,
      memo: obj.memo,
      refNum: obj.refNum,
      fitId: obj.fitId,
      ordem: 0,
      idGrupo: grupoId,
      valor: obj.valor,
    };

    const response = await fetchPostToApi(`/v1/data/operacao/single/${ueSelected.id}`, objData)
    
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
