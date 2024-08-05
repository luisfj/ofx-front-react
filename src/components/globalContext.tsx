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
  userSelected: BasicItemType | null;
  setUserSelected: Dispatch<SetStateAction<BasicItemType | null>>;
  ueSelected: BasicItemType | null;
  setUeSelected: Dispatch<SetStateAction<BasicItemType | null>>;
};

export const GlobalContext = createContext({} as GlobalConfigType);

export const GlobalContextProvider = ({ children }: { children: any }) => {
  const [userSelected, setUserSelected] = useState<BasicItemType | null>(null);
  const [ueSelected, setUeSelected] = useState<BasicItemType | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const userAtual = SESSION_UTILS.getFrom(SESSION_CONSTANTS.USER_ID);
    const ueAtual = SESSION_UTILS.getFrom(SESSION_CONSTANTS.UE_ID);
    setUserSelected(userAtual);
    setUeSelected(ueAtual);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      const userAtual = SESSION_UTILS.getFrom(SESSION_CONSTANTS.USER_ID);
      if (!userAtual || userAtual.id !== userSelected?.id) setUeSelected(null);

      SESSION_UTILS.setTo(SESSION_CONSTANTS.USER_ID, userSelected);
    }
  }, [userSelected]);

  useEffect(() => {
    if (isLoaded) SESSION_UTILS.setTo(SESSION_CONSTANTS.UE_ID, ueSelected);
  }, [ueSelected]);

  return (
    <GlobalContext.Provider
      value={{
        userSelected,
        setUserSelected,
        ueSelected,
        setUeSelected,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
