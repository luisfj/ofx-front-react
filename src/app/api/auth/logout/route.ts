import { NextRequest, NextResponse } from 'next/server';
import { setCookie } from '@/lib/cookies';

export async function POST(request: NextRequest) {
  const res = NextResponse.json({ message: 'Logged out' });

  // Remova os cookies de autenticação
  setCookie(res, 'accessToken', '', { maxAge: -1, httpOnly: true, secure: process.env.NODE_ENV === 'production' });
  setCookie(res, 'refreshToken', '', { maxAge: -1, httpOnly: true, secure: process.env.NODE_ENV === 'production' });

  // Enviar uma solicitação de logout ao Keycloak (opcional)
  const keycloakLogoutUrl = `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/logout`;
  const refreshToken = request.cookies.get('refreshToken');

  await fetch(keycloakLogoutUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: process.env.KEYCLOAK_CLIENT_ID!,
      client_secret: process.env.KEYCLOAK_CLIENT_SECRET!,
      refresh_token: refreshToken!,
    }),
  });

  return res;
}
