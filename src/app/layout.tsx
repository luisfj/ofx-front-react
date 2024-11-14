import { GlobalContextProvider } from "@/components/globalContext";
import { NextAuthProvider } from "@/components/nextAuthProvider";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
// import './globals.css';
// import './home.css';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OFX Manager - Gerencie Seus Extratos Bancários",
  description: "Aplicativo para importação e gerenciamento de arquivos OFX de extratos bancários. Organize e processe suas finanças com eficiência.",
  keywords: "importação de OFX, extrato bancário, gerenciamento de finanças, processamento de arquivos OFX, aplicativo financeiro",
  authors: { name: "Luis Fernando Johann", url: "https://csu-ofx.top" }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = headers();
  const pathname = headersList.get("x-path") || "";

  if (pathname === '/'){
    return (
      <html lang="pt-br">

        <head>
          {/* <meta charset="UTF-8"></meta> */}
          <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
          {/* <meta name="description" content="Aplicativo para importação e gerenciamento de arquivos OFX de extratos bancários. Organize e processe suas finanças com eficiência."></meta> */}
          {/* <meta name="keywords" content="importação de OFX, extrato bancário, gerenciamento de finanças, processamento de arquivos OFX, aplicativo financeiro"></meta> */}
          {/* <meta name="author" content="Sua Empresa"></meta> */}
          {/* <title>OFX Manager - Gerencie Seus Extratos Bancários</title> */}

          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" />


          <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet" />

        </head>

        <body>
          {children}
        </body>
      </html>
    );
}

  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={inter.className + " text-sm"}>
        <NextAuthProvider>
          <GlobalContextProvider>
            {children}
          </GlobalContextProvider>
        </NextAuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
