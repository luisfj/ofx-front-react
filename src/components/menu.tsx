"use client";
import { fetchFromApi } from "@/api/callApi";
import { UeUserInviteDetail } from "@/types/ueUserType";
import { Link2Icon, ReaderIcon } from "@radix-ui/react-icons";
import {
  DatabaseIcon,
  GroupIcon,
  ImportIcon,
  LayoutDashboardIcon
} from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "./globalContext";

export default function MenuBar() {
  const { ueSelected } = useContext(GlobalContext);
  const pathname = usePathname();
  const { data: session } = useSession();
  const [openInvites, setOpenInvites] = useState(0);

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signIn('keycloak', {
        redirect: true,
        callbackUrl: pathname ?? '/',
      }); // Force sign in to hopefully resolve error
    }
    if (session)
      refreshMenuInfo();
  }, [session]);

  async function refreshMenuInfo() {
    try {
      const resp: UeUserInviteDetail[] = await fetchFromApi(`/v1/permission-checker/ue/invites/`);
      setOpenInvites(resp.length);
    } catch (ex: any) {
      console.error(ex);
    }
  }

  if (session) {
    return (
      <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <a href={"/ues"}
                className={(pathname === "/ues" ? "font-semibold " : " ") + "text-gray-900 flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"}>
                <DatabaseIcon className={(pathname === "/ues" ? "text-gray-900 " : "text-gray-500 ") + "w-5 h-5 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"} />
                <span className="ms-3">Listar UEs</span>
              </a>
            </li>
            {/* <li>
                      <a href={"/ues"} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                          <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                          <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                        </svg>
                        <span className="ms-3">Dashboards</span>
                      </a>
                    </li> */}
            <li>
              <a href={"/ue"}
                className={(!ueSelected ? "disabled " : "") + (pathname === "/ue" ? "font-semibold " : " ") + "text-gray-900 flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"}>
                <GroupIcon className={(pathname === "/ue" ? "text-gray-900 " : "text-gray-500 ") + "w-5 h-5 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"} />
                <span className="ms-3">Grupos</span>
              </a>
            </li>
            <li>
              <a href={"/ue/operacoes"}
                className={(!ueSelected ? "disabled " : "") + (pathname === "/ue/operacoes" ? "font-semibold " : " ") + "text-gray-900 flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"}>
                <ReaderIcon viewBox="0 0 14 14" className={(pathname === "/ue/operacoes" ? "text-gray-900 " : "text-gray-500 ") + "w-5 h-5 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"} />
                <span className="ms-3">Operações</span>
              </a>
            </li>
            <li>
              <a href={"/ue/importar"}
                className={(!ueSelected ? "disabled " : "") + (pathname === "/ue/importar" ? "font-semibold " : " ") + "text-gray-900 flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"}>
                <ImportIcon className={(pathname === "/ue/importar" ? "text-gray-900 " : "text-gray-500 ") + "w-5 h-5 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"} />
                <span className="ms-3">Importar</span>
              </a>
            </li>
            <li>
              <a href={"/ue/processar"}
                className={(!ueSelected ? "disabled " : "") + (pathname === "/ue/processar" ? "font-semibold " : " ") + "text-gray-900 flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"}>
                <LayoutDashboardIcon className={(pathname === "/ue/processar" ? "text-gray-900 " : "text-gray-500 ") + "w-5 h-5 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"} />
                <span className="ms-3">Processar</span>
              </a>
            </li>
            {/* <li>
              <a href={"/messages"}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <EnvelopeClosedIcon className={(pathname === "/messages" ? "text-gray-900 " : "text-gray-500 ") + "w-5 h-5 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"} />
                <span className="flex-1 ms-3 whitespace-nowrap">Mensagens</span>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  3
                </span>
              </a>
            </li> */}
            <li>
              <a href={"/invites"}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <Link2Icon className={(pathname === "/messages" ? "text-gray-900 " : "text-gray-500 ") + "w-5 h-5 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"} />
                <span className="flex-1 ms-3 whitespace-nowrap">Convites</span>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  {openInvites}
                </span>
              </a>
            </li>
            {/* <li>
              <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Kanban</span>
                <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Inbox</span>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
              </a>
            </li> */}

          </ul>
        </div>
      </aside>
    )
  } else {
    return (<div>
      Not signed in <br />
      <button onClick={() => signIn("keycloak", {
        redirect: false,
        callbackUrl: '/ues'
      })}>Sign in</button>
    </div>);
  }
}
