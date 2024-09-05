"use client"
import { fetchFromApi } from "@/api/callApi";
import { FiltroDataBetweenContext } from "@/components/filtro-data-between";
import { GlobalContext } from "@/components/globalContext";
import { ProcOperationTableType } from "@/types/operationTableType";
import { useContext, useEffect, useState } from "react";
import { ProcessarDadosChangeContext } from "../../processar/components/processarDadosChangeContext";
import TableProcOperations from "./TableProcOperations";

export default function ListarOperacoesProcessadas() {
  const { lastUpdateOperacoes } = useContext(ProcessarDadosChangeContext);
  const { dataInicial, dataFinal, refreshFilter } = useContext(FiltroDataBetweenContext);

  const { ueSelected } = useContext(GlobalContext);

  const [isLoading, setIsLoading] = useState(true);

  const [data, setData] = useState<ProcOperationTableType[]>([]);


  useEffect(() => {
    async function refreshData() {
      setIsLoading(true);
      const resp = await fetchFromApi(`/v1/data/operacao/processadas/${ueSelected!.id}?dataInicial=${dataInicial.toFormat('yyyy-MM-dd')}&dataFinal=${dataFinal.toFormat('yyyy-MM-dd')}`);
      setData(resp);
      setIsLoading(false);
    }
    if (ueSelected) refreshData();
  }, [, lastUpdateOperacoes, refreshFilter]);

  if (!ueSelected)
    return <div>Deve selecionar a ue para continuar</div>;

  return <TableProcOperations isLoading={isLoading} operations={data} />;
}