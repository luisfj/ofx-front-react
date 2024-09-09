export type OperacaoSaveType = {
  dataHora: string;
  memo: string;
  refNum: string | null;
  fitId: string | null;
  valor: number;
};


export type OperacaoSaveTypeModal = OperacaoSaveType & {
  adicionarComGrupo?: boolean;
};