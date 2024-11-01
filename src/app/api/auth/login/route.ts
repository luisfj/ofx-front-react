import { NextRequest, NextResponse } from 'next/server';
import { setCookie } from '@/lib/cookies';

export async function POST(request: NextRequest) {
  console.warn('------POSTTT DO LOGINNNNN--------');
  const { email, password } = await request.json();

  const keycloakTokenEndpoint = `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`;

  const response = await fetch(keycloakTokenEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'password',
      client_id: process.env.KEYCLOAK_CLIENT_ID!,
      client_secret: process.env.KEYCLOAK_CLIENT_SECRET!,
      username: email,
      password: password,
      scope: 'openid',
    }),
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const data = await response.json();
  const res = NextResponse.json(data);
  setCookie(res, 'accessToken', data.access_token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
  setCookie(res, 'refreshToken', data.refresh_token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

  return res;
}