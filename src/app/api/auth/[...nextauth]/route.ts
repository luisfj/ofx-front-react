import NextAuth from 'next-auth';
import KeycloakProvider from 'next-auth/providers/keycloak';

import type { JWT } from 'next-auth/jwt';

function isTokenExpired(expiresAt: number): boolean {
  const now = Math.floor(Date.now() / 1000);
  return now >= expiresAt;
}

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
/**
 * @param  {JWT} token
 */
const refreshAccessToken = async (token: JWT) => {
  try {
    console.warn('-----REFRESH TOKEN------');

    if (Date.now() > token.refreshTokenExpired) throw Error;
    const details = {
      client_id: process.env.KEYCLOAK_CLIENT_ID,
      client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
      grant_type: "refresh_token",
      refresh_token: token.refreshToken,
    };

    const formBody: string[] = [];
    Object.entries(details).forEach(([key, value]: [string, any]) => {
      const encodedKey = encodeURIComponent(key);
      const encodedValue = encodeURIComponent(value);
      formBody.push(encodedKey + '=' + encodedValue);
    });
    const formData = formBody.join('&');
    const url = `${process.env.KEYCLOAK_BASE_URL}/protocol/openid-connect/token`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    const refreshedTokens = await response.json();

    if (!response.ok) throw refreshedTokens;
    return {
      ...token,
      idToken: refreshedTokens.id_token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpired: Math.floor(Date.now() / 1000 + (refreshedTokens.expires_in - 15)),
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
      refreshTokenExpired:
        Date.now() + (refreshedTokens.refresh_expires_in - 15) * 1000,
    };
  } catch (error) {
    console.error(error);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
};

const handler = NextAuth({
  providers: [
    KeycloakProvider({
      id: 'keycloak',
      name: 'Keycloak',
      clientId: process.env.KEYCLOAK_CLIENT_ID,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
      issuer: process.env.KEYCLOAK_ISSUER,
      profile: (profile) => {
        return {
          ...profile,
          id: profile.sub,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.KEYCLOAK_CLIENT_SECRET!,
  callbacks: {
    async signIn({ user, account }) {
      if (account && user) {
        return true;
      } else {
        return '/unauthorized';
      }
    },

    async redirect(urlObj) {
      return urlObj.url.startsWith(urlObj.baseUrl) ? urlObj.url : urlObj.baseUrl;
    },

    async session({ session, token }: { session: any, token: JWT }) {
      if (token) {
        session.user = token.user;
        session.error = token.error;
        session.accessToken = token.accessToken;
      }
      return session;
    },

    async jwt({ token, user, account }: { token: JWT, user: any, account: any }) {
      if (account && user) {
        console.warn('------LOGIN--------');
        token.idToken = account.id_token;
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpired = account.expires_at - 15;
        token.refreshTokenExpired = Date.now() + (account.refresh_expires_in - 15) * 1000;
        token.user = user;

        return token;
      }

      if (!isTokenExpired(token.accessTokenExpired)) return token;

      return refreshAccessToken(token);
    },
  },
  events: {
    async signOut({ token }: { token: JWT }) {
      console.warn("-----------SIGNOUT-------------");
      // if (token.provider === "keycloak") {
      const issuerUrl = process.env.KEYCLOAK_ISSUER;
      const logOutUrl = new URL(`${issuerUrl}/protocol/openid-connect/logout`);
      logOutUrl.searchParams.set("id_token_hint", token.idToken);

      await fetch(logOutUrl);
      // }
    },
  },
});

export { handler as GET, handler as POST };