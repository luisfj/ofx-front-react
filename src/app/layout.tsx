import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './globals.css';
import { NextAuthProvider } from "@/components/nextAuthProvider";
import { GlobalContextProvider } from "@/components/globalContext";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CSU OFX Import",
  description: "Importe arquivos OFX e processe os lançamentos!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
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
