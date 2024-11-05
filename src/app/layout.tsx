import { GlobalContextProvider } from "@/components/globalContext";
import MenuBar from "@/components/menu";
import { NextAuthProvider } from "@/components/nextAuthProvider";
import TopBar from "@/components/topBar";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SseConnectComponent from "./messages/components/sseConnect";
import { Session } from "next-auth";
import { headers } from "next/headers";
import { getSession } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

async function getSession2(cookie: string): Promise<Session> {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/session`, {
    headers: {
      cookie,
    }
  })

  const session = await response.json()

  return Object.keys(session).length > 0 ? session : null
}

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session2 = await getSession2(headers().get('cookie') ?? '');
  const session = await getSession();
  console.log("session manual: ", session2);
  console.log("session next-auth: ", session);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className + " text-sm"}>
        <main>
          <NextAuthProvider session={session2}>
            <GlobalContextProvider>
              <TopBar />
              <MenuBar />
              <SseConnectComponent />
              <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                  {/* <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                      <p className="text-2xl text-gray-400 dark:text-gray-500">
                          
                      </p>
                    </div>
                    <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                      <p className="text-2xl text-gray-400 dark:text-gray-500">
                        <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                        </svg>
                      </p>
                    </div>
                    <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                      <p className="text-2xl text-gray-400 dark:text-gray-500">
                        <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                        </svg>
                      </p>
                    </div>
                  </div> */}
                  {children}
                  {/* <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
                  </div> */}
                  {/* <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                      <p className="text-2xl text-gray-400 dark:text-gray-500">
                        <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                        </svg>
                      </p>
                    </div>
                    <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                      <p className="text-2xl text-gray-400 dark:text-gray-500">
                        <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                        </svg>
                      </p>
                    </div>
                    <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                      <p className="text-2xl text-gray-400 dark:text-gray-500">
                        <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                        </svg>
                      </p>
                    </div>
                    <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                      <p className="text-2xl text-gray-400 dark:text-gray-500">
                        <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                        </svg>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
                    <p className="text-2xl text-gray-400 dark:text-gray-500">
                      <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                      </svg>
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                      <p className="text-2xl text-gray-400 dark:text-gray-500">
                        <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                        </svg>
                      </p>
                    </div>
                    <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                      <p className="text-2xl text-gray-400 dark:text-gray-500">
                        <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                        </svg>
                      </p>
                    </div>
                    <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                      <p className="text-2xl text-gray-400 dark:text-gray-500">
                        <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                        </svg>
                      </p>
                    </div>
                    <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                      <p className="text-2xl text-gray-400 dark:text-gray-500">
                        <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                        </svg>
                      </p>
                    </div> 
                  </div>*/}
                </div>
              </div>
            </GlobalContextProvider>
          </NextAuthProvider>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
