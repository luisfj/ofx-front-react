"use client";

import { HomeIcon } from "lucide-react";
import Image from "next/image";

import Link from "next/link";

export default function Home() {
  // const links: OperationTableType[] = [
  //   {
  //     id: 484,
  //     idUser: 1,
  //     idUe: 1,
  //     nomeUe: "Ue teste",
  //     idConta: null,
  //     nomeConta: null,
  //     nrConta: null,
  //     banco: null,
  //     corConta: null,
  //     idImportacao: null,
  //     tipo: "DEBIT",
  //     dataHora: "02/05/2024 00:00:00",
  //     valor: -1104.0,
  //     fitId: "PIX BAR",
  //     refNum: "PIX BAR",
  //     memo: "PIX BAR",
  //     status: "IMPORTADO",
  //     ordem: 1,
  //     idGrupo: null,
  //     filhos: [
  //       {
  //         id: 485,
  //         idUser: 1,
  //         idUe: 1,
  //         nomeUe: "Ue teste",
  //         idConta: null,
  //         nomeConta: null,
  //         nrConta: null,
  //         banco: null,
  //         corConta: null,
  //         idImportacao: null,
  //         tipo: "DEBIT",
  //         dataHora: "02/05/2024 15:25:00",
  //         valor: -1104.0,
  //         fitId: "PIX_DEB   01508678910 NOEMI MARLI JACOBI POOTZ-1",
  //         refNum: "PIX_DEB   01508678910 NOEMI MARLI JACOBI POOTZ",
  //         memo: "PAGAMENTO PIX",
  //         status: "IMPORTADO",
  //         ordem: 1,
  //         idGrupo: 484,
  //         filhos: [],
  //         tipoAlteracao: null,
  //       },
  //     ],
  //     tipoAlteracao: null,
  //   },
  //   {
  //     id: 300,
  //     idUser: 1,
  //     idUe: 1,
  //     nomeUe: "Ue teste",
  //     idConta: null,
  //     nomeConta: null,
  //     nrConta: null,
  //     banco: null,
  //     corConta: null,
  //     idImportacao: null,
  //     tipo: "DEBIT",
  //     dataHora: "02/05/2024 00:00:00",
  //     valor: -1104.0,
  //     fitId: "PIX BAR",
  //     refNum: "PIX BAR",
  //     memo: "PIX BAR",
  //     status: "IMPORTADO",
  //     ordem: 1,
  //     idGrupo: null,
  //     filhos: [],
  //     tipoAlteracao: null,
  //   },
  //   {
  //     id: 301,
  //     idUser: 1,
  //     idUe: 1,
  //     nomeUe: "Ue teste",
  //     idConta: null,
  //     nomeConta: null,
  //     nrConta: null,
  //     banco: null,
  //     corConta: null,
  //     idImportacao: null,
  //     tipo: "DEBIT",
  //     dataHora: "02/05/2024 00:00:00",
  //     valor: -1104.0,
  //     fitId: "PIX BAR",
  //     refNum: "PIX BAR",
  //     memo: "PIX BAR",
  //     status: "IMPORTADO",
  //     ordem: 1,
  //     idGrupo: null,
  //     filhos: [],
  //     tipoAlteracao: null,
  //   },
  //   {
  //     id: 2,
  //     idUser: 1,
  //     idUe: 1,
  //     nomeUe: "Ue teste 2",
  //     idConta: null,
  //     nomeConta: null,
  //     nrConta: null,
  //     banco: null,
  //     corConta: null,
  //     idImportacao: null,
  //     tipo: "CREDIT",
  //     dataHora: "02/05/2024 00:00:00",
  //     valor: 5000.0,
  //     fitId: "ENTRADA TESTE",
  //     refNum: "ENTRADA TESTE",
  //     memo: "ENTRADA TESTE",
  //     status: "IMPORTADO",
  //     ordem: 1,
  //     idGrupo: null,
  //     filhos: [
  //       {
  //         id: 22,
  //         idUser: 1,
  //         idUe: 1,
  //         nomeUe: "Ue teste 2",
  //         idConta: null,
  //         nomeConta: null,
  //         nrConta: null,
  //         banco: null,
  //         corConta: null,
  //         idImportacao: null,
  //         tipo: "CREDIT",
  //         dataHora: "02/05/2024 15:25:00",
  //         valor: 500.0,
  //         fitId: "PIX_DEB   01508678910 NOEMI MARLI JACOBI POOTZ-1",
  //         refNum: "PIX_DEB   01508678910 NOEMI MARLI JACOBI POOTZ",
  //         memo: "RECEBIMENTO PIX",
  //         status: "IMPORTADO",
  //         ordem: 1,
  //         idGrupo: 484,
  //         filhos: [],
  //         tipoAlteracao: null,
  //       },
  //       {
  //         id: 25,
  //         idUser: 1,
  //         idUe: 1,
  //         nomeUe: "Ue teste 2",
  //         idConta: null,
  //         nomeConta: null,
  //         nrConta: null,
  //         banco: null,
  //         corConta: null,
  //         idImportacao: null,
  //         tipo: "CREDIT",
  //         dataHora: "02/05/2024 15:25:00",
  //         valor: 4500.0,
  //         fitId: "PIX_DEB   01508678910 NOEMI MARLI JACOBI POOTZ-1",
  //         refNum: "PIX_DEB   01508678910 NOEMI MARLI JACOBI POOTZ",
  //         memo: "RECEBIMENTO PIX",
  //         status: "IMPORTADO",
  //         ordem: 1,
  //         idGrupo: 484,
  //         filhos: [],
  //         tipoAlteracao: null,
  //       },
  //     ],
  //     tipoAlteracao: null,
  //   },
  // ];

  // const opInit: OperationTableType[] = [];

  // const [operacoes, setOperacoes] = useState(opInit);
  // const [grupos, setGrupos] = useState(opInit);

  // useEffect(() => {
  //   function setData() {
  //     setGrupos(links.filter((l) => l.filhos && l.filhos.length > 0));
  //     setOperacoes(links.filter((l) => !l.filhos || l.filhos.length == 0));
  //   }

  //   setData();
  // });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        {/* <main className="min-h-screen w-full items-center justify-between p-24"> */}
        <Link href={"/1/1/processar"}>Processar Dados</Link>
        <div className="gap-5 columns-2">
          {/* <LinksTable operations={operacoes}></LinksTable>
          <LinksTable operations={grupos}></LinksTable> */}
        </div>
        {/* </main> */}
      </div>

      <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Docs{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Learn{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Templates{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Explore starter templates for Next.js.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Deploy{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt; <HomeIcon />
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-balance text-sm opacity-50">
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  );
}
