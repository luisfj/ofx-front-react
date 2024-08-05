import { OperationTableType } from "@/types/operationTableType";
import { createContext, Dispatch, SetStateAction, useState } from "react";

type ProcessarDadosChangeType = {
  lastUpdateGrupos: Date;
  setLastUpdateGrupos: Dispatch<SetStateAction<Date>> | null;
  lastUpdateOperacoes: Date;
  setLastUpdateOperacoes: Dispatch<SetStateAction<Date>> | null;
  selectedGrupos: OperationTableType[];
  setSelectedGrupos: Dispatch<SetStateAction<OperationTableType[]>> | null;
};

export const ProcessarDadosChangeContext = createContext({
  lastUpdateGrupos: new Date(),
  setLastUpdateGrupos: null,
  lastUpdateOperacoes: new Date(),
  setLastUpdateOperacoes: null,
  selectedGrupos: [],
  setSelectedGrupos: null,
} as ProcessarDadosChangeType);

export const ProcessarDadosChangeContextProvider = ({
  children,
}: {
  children: any;
}) => {
  const [lastUpdateGrupos, setLastUpdateGrupos] = useState<Date>(new Date());
  const [lastUpdateOperacoes, setLastUpdateOperacoes] = useState<Date>(
    new Date()
  );
  const [selectedGrupos, setSelectedGrupos] = useState<OperationTableType[]>(
    []
  );

  return (
    <ProcessarDadosChangeContext.Provider
      value={{
        lastUpdateGrupos,
        setLastUpdateGrupos,
        lastUpdateOperacoes,
        setLastUpdateOperacoes,
        selectedGrupos,
        setSelectedGrupos,
      }}
    >
      {children}
    </ProcessarDadosChangeContext.Provider>
  );
};
