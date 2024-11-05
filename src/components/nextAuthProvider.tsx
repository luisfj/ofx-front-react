"use client";

import { Session } from "next-auth";
import { getSession, SessionProvider } from "next-auth/react";

type Props = {
  children?: React.ReactNode;
  session: Session | null;
};

export const NextAuthProvider = ({ children, session }: Props) => {
  return <SessionProvider baseUrl={process.env.NEXTAUTH_URL} refetchInterval={60 * 5} session={session}>{children}</SessionProvider>;
};

// NextAuthProvider.getInitialProps = async (context) => {
//   const { ctx } = context;
//   const session = await getSession(ctx);

//   return {
//     session,
//   };
// };