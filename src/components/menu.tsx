"use client";
import { ExitIcon, ReaderIcon } from "@radix-ui/react-icons";
import {
  DatabaseIcon,
  GroupIcon,
  ImportIcon,
  LayoutDashboardIcon
} from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect } from "react";
import { GlobalContext } from "./globalContext";
import { ModeToggle } from "./modeToggle";
import { ThemeProvider } from "./theme-provider";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";

export default function MenuBar() {
  const { ueSelected } = useContext(GlobalContext);
  const pathname = usePathname();
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signIn('keycloak', {
        redirect: true,
        callbackUrl: pathname ?? '/',
      }); // Force sign in to hopefully resolve error
    }
  }, [session]);

  function verifyIsOpen(path: string) {
    if (pathname === path)
      return <span className="inline-block mr-2 text-lg">&gt;</span>;
    return <></>;
  }

  if (session) {
    return (
      <div>
        <NavigationMenu>
          <NavigationMenuList>
            <Link href={"/ues"} legacyBehavior passHref>
              <NavigationMenuLink
                className={
                  (pathname === "/ues" ? "disabled " : "") +
                  (ueSelected
                    ? "text-active-foreground focus:text-active-foreground hover:text-active-foreground "
                    : "") +
                  "h4rem " +
                  navigationMenuTriggerStyle()
                }
              >
                {verifyIsOpen("/ues")}

                <DatabaseIcon className="inline-block mr-2 h-10 w-10" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">UE</p>
                  <p className="text-muted-foreground">
                    {ueSelected?.nome ?? "Não conectado"}
                  </p>
                </div>
              </NavigationMenuLink>
            </Link>

            <Link href={"/ue"} legacyBehavior passHref>
              <NavigationMenuLink
                className={
                  (!ueSelected || pathname === "/ue"
                    ? "disabled "
                    : "") +
                  "h4rem " +
                  navigationMenuTriggerStyle()
                }
              >
                {verifyIsOpen("/ue")}

                <GroupIcon className="inline-block mr-2 h-10 w-10" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Grupos</p>
                  <p className="text-muted-foreground">Listar</p>
                </div>
              </NavigationMenuLink>
            </Link>

            <Link href={"/ue/operacoes"} legacyBehavior passHref>
              <NavigationMenuLink
                className={
                  (!ueSelected || pathname === "/ue/operacoes"
                    ? "disabled "
                    : "") +
                  "h4rem " +
                  navigationMenuTriggerStyle()
                }
              >
                {verifyIsOpen("/ue/operacoes")}

                <ReaderIcon className="inline-block mr-2 h-10 w-10" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Operações</p>
                  <p className="text-muted-foreground">Processadas</p>
                </div>
              </NavigationMenuLink>
            </Link>

            <Link href={"/ue/importar"} legacyBehavior passHref>
              <NavigationMenuLink
                className={
                  (!ueSelected || pathname === "/ue/importar"
                    ? "disabled "
                    : "") +
                  "h4rem " +
                  navigationMenuTriggerStyle()
                }
              >
                {verifyIsOpen("/ue/importar")}

                <ImportIcon className="inline-block mr-2 h-10 w-10" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Importar</p>
                  <p className="text-muted-foreground">Arquivos OFX</p>
                </div>
              </NavigationMenuLink>
            </Link>

            <Link href={"/ue/processar"} legacyBehavior passHref>
              <NavigationMenuLink
                className={
                  (!ueSelected || pathname === "/ue/processar"
                    ? "disabled "
                    : "") +
                  "h4rem " +
                  navigationMenuTriggerStyle()
                }
              >
                {verifyIsOpen("/ue/processar")}

                <LayoutDashboardIcon className="inline-block mr-2 h-10 w-10" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Processar</p>
                  <p className="text-muted-foreground">Dados</p>
                </div>
              </NavigationMenuLink>
            </Link>

            <ThemeProvider
              attribute="class"
              defaultTheme="Light"
              disableTransitionOnChange
            >
              <ModeToggle />
            </ThemeProvider>

            <>
              {/* Signed in as {session.user.email} <br /> */}
              {/* <button onClick={() => signOut({ redirect: false, callbackUrl: '/ues' })}> */}
              <a href="#" className="h4rem group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                onClick={() => signOut({ redirect: true, callbackUrl: '/' })}>
                <ExitIcon className="inline-block mr-2 h-10 w-10" />
                Sign out
                {/* </button> */}
              </a>
            </>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
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
