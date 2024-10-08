"use client";

import { GlobalContext } from "@/components/globalContext";
import { UeBasicType } from "@/types/basicUUType";
import { DEFAULT_COLORS } from "@/utils/colorsConstants";
import { PenIcon, User2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext } from "react";


export default function UeCard({
  ue,
  userEmail,
  setEditUe,
}: {
  ue: UeBasicType;
  userEmail: string;
  setEditUe: React.Dispatch<React.SetStateAction<UeBasicType | undefined>>;
}) {  
  const router = useRouter();
  const { ueSelected, setUeSelected } = useContext(GlobalContext);

  function goToPage(ue: UeBasicType) {
    if (ueSelected?.id !== ue.ueId) {
      setUeSelected({ id: ue.ueId, nome: ue.ueName });
    }
    router.push("/ue");
  }

  function createActions(ue: UeBasicType) {
    if (ue.administrator)
      return (
        <>
          <a
            onClick={() => setEditUe(ue)}
            href="#"
            className="text-gray-50 group-hover:text-gray-700 hover:border-gray-300 hover:dark:border-neutral-700"
            rel="noopener noreferrer"
          >
            <PenIcon className="small h-[6ch] hover:text-yellow-500" />
          </a>
          <a
          onClick={() => router.push(`/ue/permissions/${ue.ueId}`)}
            href="#"
            className="text-gray-50 group-hover:text-gray-700"
            rel="noopener noreferrer"
          >
            <User2Icon className="small h-[6ch] hover:text-yellow-500" />
          </a>
        </>
      )
    return <></>
  }

  return (
    <div className="relative mb-6 mr-9 group w-[25ch] h-[13ch]">
      {createActions(ue)}
      <a
        onClick={() => goToPage(ue)}
        href="#"
        className={`absolute top-0 left-0 ${ue.color && ue.color !== '' ? ue.color : DEFAULT_COLORS[0]
          } rounded-lg border px-5 py-4 transition-colors hover:border-yellow-500  
      hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30
       inline-block transition-transform group-hover:translate-x-10 motion-reduce:transform-none`}
        // {`${ue.color ?? DEFAULT_COLORS[0]
        //   } mb-4 mr-4 group rounded-lg border px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30`}
        rel="noopener noreferrer"
      >
        <h2 className="mb-3 text-l font-semibold">
          {ue.ueName.length < 20 ? ue.ueName : ue.ueName.substring(0, 16) + "... "}
          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            -&gt;
          </span>
        </h2>
        <div className="grid gap-4 m-0 max-w-[30ch] text-sm opacity-80">
          <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
            <span className={"flex h-2 w-2 translate-y-1 rounded-full opacity-100 " + (userEmail === ue.createdEmail ? 'bg-green-500' : 'bg-yellow-500')} />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Criado por</p>
              <p className="text-sm text-muted-foreground">{ue.createdEmail}</p>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
