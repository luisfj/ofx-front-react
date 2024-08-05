import { CreateOperacaoResponseType } from "@/types/createOperacaoResponseType";
import { CreateOperacaoType } from "@/types/createOperationType";
import { OperationTableType } from "@/types/operationTableType";
import useSWR from "swr";
import { deleteFetcher, fetcher, getFetcher, postFetcher, putFetcher, putFetcherNoBody } from "./baseApi";

function useApiOperacaoFindById(idUser: number, idUe: number, idOperacao: number) {
  const { data, error, isLoading } = useSWR<CreateOperacaoResponseType>(
    `/v1/data/operacao/single/${idUser}/${idUe}/${idOperacao}`,
    fetcher
  );

  return {
    data,
    error,
    isLoading
  }
}

const apiOperacaoListarTodasPendentesEntreDatas = async (idUser: number, idUe: number): Promise<OperationTableType[]> => {
  const response = await getFetcher(`/v1/data/operacao/pendentes/${idUser}/${idUe}`);
  const json = await response.json() as Promise<OperationTableType[]>;
  return json;
}

const apiOperacaoFindById = async (idUser: number, idUe: number, idOperacao: number): Promise<CreateOperacaoResponseType> => {
  const response = await getFetcher(`/v1/data/operacao/single/${idUser}/${idUe}/${idOperacao}`);
  const json = await response.json() as Promise<CreateOperacaoResponseType>;
  return json;
}

const apiOperacaoAdicionarOperacoesAoGrupo = async (idUser: number, idUe: number, idGrupo: number,
  idsOperacoesAdicionar: number[]) => {
  const resp = await postFetcher(`/v1/data/operacao/agrupar/${idUser}/${idUe}/${idGrupo}`, idsOperacoesAdicionar);
  return resp;
}

const apiOperacaoSave = async (idUser: number, idUe: number, dataObject: CreateOperacaoType) => {
  const resp = await postFetcher(`/v1/data/operacao/single/${idUser}/${idUe}`, dataObject);
  return resp;
}

const apiOperacaoUpdate = async (idUser: number, idUe: number, idOperacao: number, dataObject: CreateOperacaoType) => {
  const resp = await putFetcher(`/v1/data/operacao/single/${idUser}/${idUe}/${idOperacao}`, dataObject);

  return resp;
}

const apiOperacaoDelete = async (idUser: number, idUe: number, idOperacao: number) => {
  const resp = await deleteFetcher(`/v1/data/operacao/single/${idUser}/${idUe}/${idOperacao}`);
  return resp;
}

const apiOperacaoRemoverDoGrupo = async (idUser: number, idUe: number, idOperacao: number) => {
  const resp = await putFetcherNoBody(`/v1/data/operacao/remover-grupo/${idUser}/${idUe}/${idOperacao}`);
  return resp;
}


export { apiOperacaoAdicionarOperacoesAoGrupo, apiOperacaoDelete, apiOperacaoFindById, apiOperacaoListarTodasPendentesEntreDatas, apiOperacaoRemoverDoGrupo, apiOperacaoSave, apiOperacaoUpdate, useApiOperacaoFindById };

