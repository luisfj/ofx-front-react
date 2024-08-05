"use client";

import { GlobalContext } from "@/components/globalContext";
import { UeBasicType } from "@/types/basicUUType";
import { DEFAULT_COLORS } from "@/utils/colorsConstants";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function UeCard({
  userId,
  ues,
}: {
  userId: number;
  ues: UeBasicType[];
}) {
  const router = useRouter();
  const { ueSelected, setUeSelected } = useContext(GlobalContext);

  function goToPage(ue: UeBasicType) {
    if (ueSelected?.id !== ue.id) {
      setUeSelected({ id: ue.id, nome: ue.name });
    }
    router.push("/ue");
  }

  return (
    <div className="w-full grid grid-cols-3">
      {ues.map((ue, index) => (
        <a
          key={index}
          onClick={() => goToPage(ue)}
          href="#"
          className={`${
            ue.color ?? DEFAULT_COLORS[0]
          } mb-4 mr-4 group rounded-lg border px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30`}
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            {ue.name + " "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <div className="grid gap-4 m-0 max-w-[30ch] text-sm opacity-50">
            <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">UE acessível</p>
                <p className="text-sm text-muted-foreground">Acessar a UE</p>
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
