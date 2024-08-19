import { authenticateEndPoint } from '@/api/baseApi';
import NextAuth, { getServerSession, NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
 import CredentialsProvider from "next-auth/providers/credentials";
import Email from 'next-auth/providers/email';
import KeycloakProvider from "next-auth/providers/keycloak";
import OAuthProvider, { OAuthConfig } from "next-auth/providers/oauth";

// const authOptions = {
//   providers: [
//     KeycloakProvider({
//       clientId: process.env.KEYCLOAK_CLIENT_ID!,
//       clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
//       issuer: process.env.KEYCLOAK_ISSUER!,
//     }),
//   ],
//   session: {
//     strategy: 'jwt',
//   },
//   callbacks: {
//     async jwt({ token, account }: {token:any, account:any}) {
//       if (account) {
//         token.accessToken = account.access_token;
//         token.refreshToken = account.refresh_token;
//       }
//       return token;
//     },
//     async session({ session, token }: {session:any, token:any}) {
//       session.accessToken = token.accessToken;
//       return session;
//     },
//   },
// };


const authOptions : NextAuthOptions = {
  providers: [
    KeycloakProvider(
      {
      clientId: process.env.KEYCLOAK_CLIENT_ID,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
      issuer: process.env.KEYCLOAK_ISSUER,
      // // allowDangerousEmailAccountLinking: true
        // authorization: `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/authorize`,
      //   allowDangerousEmailAccountLinking: true,
        // token: {
        //   url: `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`,
      //     async request(context:any) {
      //       // context contains useful properties to help you make the request.
      //       const tokens = await authenticateEndPoint('postman@testes.com', '123');
      //       console.warn(context);
      //       console.warn(tokens);
      //       return { tokens }
      //     }
        // },
        // userinfo: {
        //   url: `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/userinfo`,
      //     // The result of this method will be the input to the `profile` callback.
      //     // async request(context) {
      //       // context contains useful properties to help you make the request.
      //       // return await makeUserinfoRequest(context)
      //     // }
        // },
      //   profile(profile:any) {
      //     return {
      //       id: profile.sub,
      //       name: profile.name,
      //       email: profile.email,
      //       image: profile.picture,
      //     }
      //   }
      }),
//     CredentialsProvider({
//       name: "Password-Provider",
//       credentials: {
//         username: { label: "Email", type: "email", placeholder: "email" },
//         password: { label: "Password", type: "password", placeholder: "senha" }
//       },
//       async authorize(credentials, req) {
//         const { username, password } = credentials as {
//           username: string
//           password: string
//          };
// // console.log(credentials);
//          let a= await authenticateEndPoint(username, password);
//         //  console.log(a);
//          return {
//           "email": username,
//           "name": username,
//           "idToken" : a
//          };
//         // return a.access_token;
//       }
//     }),
    
  ],
  // debug: true,
  // logger: {
  //        error(code, ...message) {
  //          console.error(code, message)
  //        },
  //        warn(code, ...message) {
  //         console.warn(code, message)
  //        },
  //        debug(code, ...message) {
  //         console.debug(code, message)
  //        }
  //      },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.KEYCLOAK_CLIENT_SECRET!,
  callbacks: {
    async jwt({ token, account, profile }: {token:any, account:any, profile:any}) {
      // console.warn('------ JWT -------');
      // console.info(token, account, profile);
      if (account) {
        // console.warn(account.access_token);
        token.idToken = account.access_token;
      }
      // console.warn(token);
      return token;
    },
    async session({ session, token, user }: {session:any, token:any, user:any}) {
      // console.warn('------ SESSION -------');
      session.idToken = token.idToken;
      return session;
    },
  },
};

export const getServerAuthSession = () => getServerSession(authOptions);

const handler = NextAuth(authOptions);


export { handler as GET, handler as POST };

// export default async function auth(req, res) {
//   const providers = [
//     KeycloakProvider({
//       clientId: process.env.KEYCLOAK_CLIENT_ID!,
//       clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
//       issuer: process.env.KEYCLOAK_ISSUER!,
//     }),
//   ]

//   const isDefaultSigninPage = req.method === "GET" && req.query.nextauth.includes("signin")

//   // Will hide the `GoogleProvider` when you visit `/api/auth/signin`
//   if (isDefaultSigninPage) providers.pop()

//   return await NextAuth(req, res, {
//     providers,
//   session: {
//     strategy: 'jwt',
//   },
//   useSecureCookies: false,
//   pages: {
//     signIn: "/login",
//     error: "/error",
//   },
//   callbacks: {
//     async jwt({ token, account }: {token:any, account:any}) {
//       if (account) {
//         token.accessToken = account.access_token;
//         token.refreshToken = account.refresh_token;
//       }
//       return token;
//     },
//     async session({ session, token }: {session:any, token:any}) {
//       session.accessToken = token.accessToken;
//       return session;
//     },
//   },
//   });
// }