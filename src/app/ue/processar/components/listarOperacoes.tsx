import { apiOperacaoListarTodasPendentesEntreDatas } from "@/api/operacoesApi";
import { GlobalContext } from "@/components/globalContext";
import { OperationTableType } from "@/types/operationTableType";
import { useContext, useEffect, useState } from "react";
import { ProcessarDadosChangeContext } from "./processarDadosChangeContext";
import TableOperations from "./TableOperations";
import { fetchFromApi } from "@/api/callApi";

export default function ListarOperacoes() {
  const { lastUpdateOperacoes } = useContext(ProcessarDadosChangeContext);
  const { userSelected, ueSelected } = useContext(GlobalContext);

  const [isLoading, setIsLoading] = useState(true);

  const [data, setData] = useState<OperationTableType[]>([]);

  
  useEffect(() => {
    async function refreshData() {
      setIsLoading(true);
      const resp = await fetchFromApi(`/v1/data/operacao/pendentes/${userSelected!.id}/${ueSelected!.id}`,
        {
          method: 'get',
          headers: { 
            accept: "application/json"
          }
        }
        );
      setData(resp);
      setIsLoading(false);
    }
    if (userSelected && ueSelected) refreshData();
  }, [, lastUpdateOperacoes]);

  if (!userSelected || !ueSelected)
    return <div>Deve selecionar o usuário e a ue para continuar</div>;

  return <TableOperations isLoading={isLoading} operations={data} />;
}
