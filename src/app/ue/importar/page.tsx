"use client";

import { apiUploadOfx } from "@/api/importacoesApi";
import { GlobalContext } from "@/components/globalContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { CheckIcon, ImportIcon } from "lucide-react";
import { useContext, useState } from "react";

export default function ImportarOfxPage() {
  const [selectedFile, setSelectedFile] = useState();
  const { userSelected, ueSelected } = useContext(GlobalContext);

  if (!userSelected || !ueSelected)
    return <div>Deve selecionar usuário e ue para continuar</div>;

  const changeHandler = (event: any) => {
    if (event.target.files) setSelectedFile(event.target.files[0]);
  };

  const handleSubmission = async () => {
    if (!selectedFile) {
      toast({
        title: "Atenção",
        variant: "destructive",
        description: "Um arquivo deve ser selecionado",
      });
      return;
    }

    var formData = new FormData();

    formData.append("file", selectedFile, (selectedFile as File).name);

    apiUploadOfx(userSelected.id, ueSelected.id, formData)
      .then((response) => response.text())
      .then((result) => {
        setSelectedFile(undefined);
        toast({
          title: "Sucesso!",
          description: `${result}: uma mensagem será exibida na central quando o arquivo for processado!`,
        });
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Erro!",
          variant: "destructive",
          description: `Erro ao carregar arquivo: ${error.message}`,
        });
      });
  };

  return (
    <div className="w-full mt-10 grid grid-cols-1">
      <Card>
        <CardHeader>
          <CardTitle>Importar OFX</CardTitle>
          <CardDescription>Importação de arquivos OFX.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className=" flex items-center space-x-4 rounded-md border p-4">
            <ImportIcon />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                <Label htmlFor="fileSelect">
                  Selecione o arquivo OFX para importar
                </Label>
              </p>
              <p className="text-sm text-muted-foreground">
                <Input
                  id="fileSelect"
                  type="file"
                  accept=".ofx"
                  onChange={changeHandler}
                />
              </p>
            </div>
          </div>
          <div>
            <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                {selectedFile ? (
                  <div>
                    <p className="mb-3 text-sm font-medium leading-none">
                      Dados do arquivo a importar:
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Nome: {(selectedFile as File).name}
                      <p>Tamanho: {(selectedFile as File).size / 1000} Kb</p>
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Selecione o arquivo para exibir os detalhes
                  </p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            disabled={!selectedFile}
            onClick={handleSubmission}
            className="w-full"
          >
            <CheckIcon className="mr-2 h-4 w-4" /> Importar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
