export type CreateOperacaoResponseType = {
    id: number,
    dataHora: string;
    valor: number;
    fitId: string | null;
    refNum: string | null;
    memo: string;
    ordem: number;
    idGrupo: number | null;
};