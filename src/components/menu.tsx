"use client";
import {
  DatabaseIcon,
  HomeIcon,
  ImportIcon,
  LayoutDashboardIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
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
  const { userSelected, ueSelected } = useContext(GlobalContext);
  const pathname = usePathname();

  function verifyIsOpen(path: string) {
    if (pathname === path)
      return <span className="inline-block mr-2 text-lg">&gt;</span>;
    return <></>;
  }

  return (
    <div>
      <NavigationMenu>
        <NavigationMenuList>
          <Link href="/users" legacyBehavior passHref>
            <NavigationMenuLink
              className={
                (pathname === "/users" ? "disabled " : "") +
                (userSelected
                  ? "text-active-foreground focus:text-active-foreground "
                  : "") +
                "h4rem " +
                navigationMenuTriggerStyle()
              }
            >
              {verifyIsOpen("/users")}
              <UsersIcon className="inline-block mr-2 h-10 w-10" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Acesso</p>
                <p className="text-muted-foreground">
                  {userSelected?.nome ?? "Não conectado"}
                </p>
              </div>
            </NavigationMenuLink>
          </Link>

          <Link href={"/ues"} legacyBehavior passHref>
            <NavigationMenuLink
              className={
                (!userSelected || pathname === "/ues" ? "disabled " : "") +
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
                (!userSelected || !ueSelected || pathname === "/ue"
                  ? "disabled "
                  : "") +
                "h4rem " +
                navigationMenuTriggerStyle()
              }
            >
              {verifyIsOpen("/ue")}

              <HomeIcon className="inline-block mr-2 h-10 w-10" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Home</p>
                <p className="text-muted-foreground">Dashboards</p>
              </div>
            </NavigationMenuLink>
          </Link>

          <Link href={"/ue/importar"} legacyBehavior passHref>
            <NavigationMenuLink
              className={
                (!userSelected || !ueSelected || pathname === "/ue/importar"
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
                <p className="text-muted-foreground">Importar arquivo</p>
              </div>
            </NavigationMenuLink>
          </Link>

          <Link href={"/ue/processar"} legacyBehavior passHref>
            <NavigationMenuLink
              className={
                (!userSelected || !ueSelected || pathname === "/ue/processar"
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
                <p className="text-muted-foreground">Processar dados</p>
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
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
