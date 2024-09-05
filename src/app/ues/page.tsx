"use client";
import { fetchFromApi } from "@/api/callApi";
import { Button } from "@/components/ui/button";
import { UeBasicType } from "@/types/basicUUType";
import { PlusIcon } from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import FormUeDrawer from "./components/formUeDrawer";
import UeCard from "./components/ueCard";
import MyInvites from "./components/myInvites";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function SelectUePages() {
  const { data: session } = useSession();
  const [ues, setUes] = useState<UeBasicType[]>([]);
  const [selected, setSelected] = useState<UeBasicType>();
  const [openForm, setOpenForm] = useState(false);
  const [refreshData, setRefreshData] = useState(true);

  useEffect(() => {
    if (!refreshData)
      return;
    fetchFromApi('/v1/permission-checker/ue/all')
      .then(u => {
        setUes(u);
      });
    setRefreshData(false);
  }, [, refreshData]);

  useEffect(() => {
    if (!selected)
      return;

    setOpenForm(true);
  }, [selected]);

  if (!session || !session.user)
    return (<>Sem autorização</>);


  return (
    <div className="mt-10 w-full">

      <MyInvites setRefreshUeListDate={setRefreshData} />

      <Button variant={"secondary"} onClick={() => { setSelected(undefined); setOpenForm(true); }}>
        <PlusIcon className="small" /> Nova UE
      </Button>
      <div className="w-full grid grid-cols-3 mt-2">
        {ues.map((ue, index) => (
          <UeCard key={index} ue={ue} userEmail={session?.user.email} setEditUe={setSelected} />
        ))}
      </div>
      <FormUeDrawer objectData={selected} openDrawer={openForm} setOpenDrawer={setOpenForm} setRefreshData={setRefreshData} />
    </div>
  );
}
