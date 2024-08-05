"use client";
import { GlobalContext } from "@/components/globalContext";
import { UeBasicType } from "@/types/basicUUType";
import React from "react";
import UeCard from "./components/ueCard";

const ues: UeBasicType[] = [
  {
    id: 1,
    name: "CSU",
  },
  {
    id: 2,
    name: "UE 2",
  },
  {
    id: 3,
    name: "UE Cleomar",
  },
  {
    id: 1,
    name: "Luis UE",
  },
  {
    id: 2,
    name: "Rafaela UE",
  },
];

export default function SelectUePages() {
  const { userSelected } = React.useContext(GlobalContext);

  if (!userSelected) return <div>Usuário deve ser selecionado!</div>;

  return (
    <div className="mt-10 w-full">
      <UeCard userId={userSelected.id} ues={ues} />
    </div>
  );
}
