export type OperationTableType = {
    id: number;
    idUser: number | null;
    idUe: number | null;
    nomeUe: string;
    idConta: number | null;
    nomeConta: null | null;
    nrConta: null | null;
    banco: null | null;
    corConta: null | null;
    idImportacao: number | null;
    tipo: string | null;
    dataHora: string | null;
    valor: number | null;
    fitId: string | null;
    refNum: string | null;
    memo: string | null;
    status: string | null;
    ordem: number | null;
    idGrupo: number | null;
    filhos: OperationTableType[];
    tipoAlteracao: string | null;
};

export type ProcOperationTableType = OperationTableType & {    
    nomeGrupo: string;
    dataHoraGrupo: string | null;
};