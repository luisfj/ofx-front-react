"use client"
import { apiOperacaoListarTodasPendentesEntreDatas } from "@/api/operacoesApi";
import { GlobalContext } from "@/components/globalContext";
import { OperationTableType } from "@/types/operationTableType";
import { useContext, useEffect, useState } from "react";
import { ProcessarDadosChangeContext } from "./processarDadosChangeContext";
import TableOperations from "./TableOperations";
import { fetchFromApi } from "@/api/callApi";

export default function ListarOperacoes() {
  const { lastUpdateOperacoes } = useContext(ProcessarDadosChangeContext);
  const { ueSelected } = useContext(GlobalContext);

  const [isLoading, setIsLoading] = useState(true);

  const [data, setData] = useState<OperationTableType[]>([]);

  
  useEffect(() => {
    async function refreshData() {
      setIsLoading(true);
      const resp = await fetchFromApi(`/v1/data/operacao/pendentes/${ueSelected!.id}`);
      setData(resp);
      setIsLoading(false);
    }
    if (ueSelected) refreshData();
  }, [, lastUpdateOperacoes]);

  if (!ueSelected)
    return <div>Deve selecionar a ue para continuar</div>;

  return <TableOperations isLoading={isLoading} operations={data} />;
}
