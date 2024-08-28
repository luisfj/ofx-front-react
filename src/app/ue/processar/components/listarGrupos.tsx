import { apiGruposListarTodosComOperacoes } from "@/api/gruposApi";
import { GlobalContext } from "@/components/globalContext";
import { OperationTableType } from "@/types/operationTableType";
import { useContext, useEffect, useState } from "react";
import { ProcessarDadosChangeContext } from "./processarDadosChangeContext";
import TableGrupos from "./tableGrupos";
import { fetchFromApi } from "@/api/callApi";
import { FiltroDataBetweenContext } from "@/components/filtro-data-between";

export default function ListarGrupos() {
  const { lastUpdateGrupos } = useContext(ProcessarDadosChangeContext);
  const { dataInicial, dataFinal, refreshFilter } = useContext(FiltroDataBetweenContext);  

  const { ueSelected } = useContext(GlobalContext);

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<OperationTableType[]>([]);

  async function refreshData() {
    setIsLoading(true);
    
    fetchFromApi(`/v1/data/grupo/${ueSelected!.id}?dataInicial=${dataInicial.toFormat('yyyy-MM-dd')}&dataFinal=${dataFinal.toFormat('yyyy-MM-dd')}`)
    .then(resp => setData(resp))
    .finally(() => setIsLoading(false));    
  }

  useEffect(() => {
    if (ueSelected) refreshData();    
  }, [, lastUpdateGrupos, refreshFilter]);

  if (!ueSelected)
    return <div>Deve selecionar a ue para continuar</div>;

  return <TableGrupos isLoading={isLoading} operations={data}></TableGrupos>;
}
