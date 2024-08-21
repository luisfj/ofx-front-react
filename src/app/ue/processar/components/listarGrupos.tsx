import { apiGruposListarTodosComOperacoes } from "@/api/gruposApi";
import { GlobalContext } from "@/components/globalContext";
import { OperationTableType } from "@/types/operationTableType";
import { useContext, useEffect, useState } from "react";
import { ProcessarDadosChangeContext } from "./processarDadosChangeContext";
import TableGrupos from "./tableGrupos";
import { fetchFromApi } from "@/api/callApi";

export default function ListarGrupos() {
  const { lastUpdateGrupos } = useContext(ProcessarDadosChangeContext);
  const { userSelected, ueSelected } = useContext(GlobalContext);

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<OperationTableType[]>([]);

  async function refreshData() {
    setIsLoading(true);
    
    const resp = await fetchFromApi(`/v1/data/grupo/${userSelected!.id}/${ueSelected!.id}`);
    setData(resp);
    setIsLoading(false);
  }

  useEffect(() => {
    if (userSelected && ueSelected) refreshData();
  }, [, lastUpdateGrupos]);

  if (!userSelected || !ueSelected)
    return <div>Deve selecionar o usuário e a ue para continuar</div>;

  return <TableGrupos isLoading={isLoading} operations={data}></TableGrupos>;
}
