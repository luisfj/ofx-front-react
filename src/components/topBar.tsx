'use client'

import { EnterIcon, ExitIcon } from "@radix-ui/react-icons";
import { signIn, signOut, useSession } from "next-auth/react";
import { useContext } from "react";
import { GlobalContext } from "./globalContext";
import { ModeToggle } from "./modeToggle";
import { ThemeProvider } from "./theme-provider";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";

export default function TopBar() {
    const { ueSelected } = useContext(GlobalContext);

    const { data: session } = useSession();

    if (session) {
        return (
            <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">
                            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                                <span className="sr-only">Open sidebar</span>
                                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                </svg>
                            </button>
                            <a href="/" className="flex ms-2 md:me-24">
                                <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 me-3" alt="Logo" />
                                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">OFX Import</span>
                            </a>
                        </div>
                        <div className="flex items-center">
                            <span className="self-center text-x font-semibold sm:text-xl whitespace-nowrap dark:text-white">
                                {ueSelected ? `UE: ${ueSelected.nome}` : "Nenhuma UE selecionada"}
                            </span>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center ms-3">
                                <ThemeProvider
                                    attribute="class"
                                    defaultTheme="Light"
                                    disableTransitionOnChange
                                >
                                    <ModeToggle />
                                </ThemeProvider>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <Avatar className="mr-4 ml-8">
                                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>Profile</DropdownMenuItem>
                                        <DropdownMenuItem>Billing</DropdownMenuItem>
                                        <DropdownMenuItem>Team</DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <a href="#"
                                                className="grid grid-cols-3 h-full w-full select-none items-center justify-center"
                                                onClick={() => signOut({ redirect: true, callbackUrl: '/' })}>
                                                <ExitIcon className=" h-4 w-4" />
                                                <div className="col-span-2">
                                                    Sair
                                                </div>
                                            </a>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    } else {
        return (
            <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">
                            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                                <span className="sr-only">Open sidebar</span>
                                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                </svg>
                            </button>
                            <a href="/" className="flex ms-2 md:me-24">
                                <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 me-3" alt="Logo" />
                                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">OFX Import</span>
                            </a>
                        </div>

                        <div className="flex items-center">
                            <div className="flex items-center ms-3">
                                <ThemeProvider
                                    attribute="class"
                                    defaultTheme="Light"
                                    disableTransitionOnChange
                                >
                                    <ModeToggle />
                                </ThemeProvider>
                                <a href="#"
                                    className="mr-4 ml-8 grid grid-cols-3 select-none items-center justify-center
                                    button rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                                    onClick={() =>
                                        signIn('keycloak', {
                                            redirect: true,
                                            callbackUrl: '/ues',
                                        })}>
                                    <EnterIcon className=" h-4 w-4" />
                                    <div className="col-span-2">
                                        Entrar
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}