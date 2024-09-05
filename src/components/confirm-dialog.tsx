import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CircleCheckBigIcon, ReplyIcon, TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";

export type ConfirmDialogType = {
  idConvite: number;
  onClick: React.Dispatch<number>;
  tipo: "REMOVE" | "DELETE" | "MOVE" | "CONFIRM";
  message?: string;
};

export default function ConfirmDialog({
  dataConfirm,
  setDataConfirm,
}: {
  dataConfirm: ConfirmDialogType;
  setDataConfirm: React.Dispatch<React.SetStateAction<ConfirmDialogType>>;
}) {
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [idExcluir, setIdExcluir] = useState(0);

  useEffect(() => {
    if (dataConfirm.idConvite > 0) {
      setIdExcluir(dataConfirm.idConvite);
      setMessage(
        dataConfirm.message
          ? dataConfirm.message
          : dataConfirm.tipo == "DELETE"
          ? "Esta ação não poderá ser desfeita, o item será apagado permanentemente! Confirma?"
          : "Confirma mover este item?"
      );
      setOpen(true);
      setDataConfirm({
        idConvite: 0,
        onClick: dataConfirm.onClick,
        tipo: dataConfirm.tipo,
      });
    }
  }, [dataConfirm]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {dataConfirm.tipo === "DELETE" ? (
              <TrashIcon className="inline-block h-6 w-12" />
            ) : dataConfirm.tipo === "CONFIRM" ? (
              <CircleCheckBigIcon className="inline-block h-6 w-12" />
            ) : (
              <ReplyIcon className="inline-block h-6 w-12" />
            )}
            Tem certeza?
          </AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => dataConfirm.onClick(idExcluir)}>
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
