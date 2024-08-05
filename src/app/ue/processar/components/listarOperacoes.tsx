import { apiOperacaoListarTodasPendentesEntreDatas } from "@/api/operacoesApi";
import { GlobalContext } from "@/components/globalContext";
import { OperationTableType } from "@/types/operationTableType";
import { useContext, useEffect, useState } from "react";
import { ProcessarDadosChangeContext } from "./processarDadosChangeContext";
import TableOperations from "./TableOperations";

export default function ListarOperacoes() {
  const { lastUpdateOperacoes } = useContext(ProcessarDadosChangeContext);
  const { userSelected, ueSelected } = useContext(GlobalContext);

  const [isLoading, setIsLoading] = useState(true);

  const [data, setData] = useState<OperationTableType[]>([]);

  async function refreshData() {
    setIsLoading(true);
    const resp = await apiOperacaoListarTodasPendentesEntreDatas(
      userSelected!.id,
      ueSelected!.id
    );
    setData(resp);
    setIsLoading(false);
  }

  useEffect(() => {
    if (userSelected && ueSelected) refreshData();
  }, [, lastUpdateOperacoes]);

  if (!userSelected || !ueSelected)
    return <div>Deve selecionar o usuário e a ue para continuar</div>;

  return <TableOperations isLoading={isLoading} operations={data} />;
}
