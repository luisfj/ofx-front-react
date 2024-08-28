"use client";
import { SESSION_CONSTANTS } from "@/utils/sessionConstants";
import { SESSION_UTILS } from "@/utils/sessionUtils";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

type BasicItemType = {
  id: number;
  nome: string;
};

type GlobalConfigType = {
  ueSelected: BasicItemType | null;
  setUeSelected: Dispatch<SetStateAction<BasicItemType | null>>;
};

export const GlobalContext = createContext({} as GlobalConfigType);

export const GlobalContextProvider = ({ children }: { children: any }) => {
  const [ueSelected, setUeSelected] = useState<BasicItemType | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const ueAtual = SESSION_UTILS.getFrom(SESSION_CONSTANTS.UE_ID);
    setUeSelected(ueAtual);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) SESSION_UTILS.setTo(SESSION_CONSTANTS.UE_ID, ueSelected);
  }, [ueSelected]);

  return (
    <GlobalContext.Provider
      value={{
        ueSelected,
        setUeSelected,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
