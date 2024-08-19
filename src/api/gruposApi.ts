import { CreateGrupoType } from "@/types/createGrupoType";
import { OperationTableType } from "@/types/operationTableType";
import useSWR from "swr";
import { deleteFetcher, fetcher, AUTH_FETCHER, postFetcher, putFetcher } from "./baseApi";

function useGruposList(idUser: number, idUe: number) {
  const { data, error, isLoading } = useSWR<OperationTableType[]>(
    `/v1/data/grupo/${idUser}/${idUe}`,
    fetcher
  );

  return {
    data,
    error,
    isLoading
  }
}

const apiGruposListarTodosComOperacoes = async (idUser: number, idUe: number): Promise<OperationTableType[]> => {
  const response = await AUTH_FETCHER(`/v1/data/grupo/${idUser}/${idUe}`);
  const json = await response.json() as Promise<OperationTableType[]>;
  return json;
}

const apiGrupoSave = async (idUser: number, idUe: number, dataObject: CreateGrupoType) => {
  const resp = await postFetcher(`/v1/data/grupo/${idUser}/${idUe}`, dataObject);
  return resp;
}

const apiGrupoUpdate = async (idUser: number, idUe: number, idGrupo: number, dataObject: CreateGrupoType) => {
  const resp = await putFetcher(`/v1/data/grupo/${idUser}/${idUe}/${idGrupo}`, dataObject);
  return resp;
}

const apiGrupoDelete = async (idUser: number, idUe: number, idGrupo: number) => {
  const resp = await deleteFetcher(`/v1/data/grupo/${idUser}/${idUe}/${idGrupo}`);
  return resp;
}

export { apiGrupoDelete, apiGrupoSave, apiGruposListarTodosComOperacoes, apiGrupoUpdate, useGruposList };

