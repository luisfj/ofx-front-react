import { useSession } from "next-auth/react";

export const baseUrl = process.env.NODE_ENV === 'production' ? 'https://luisjohann.dev/ofx-api' : 'http://localhost:8080/api';

export async function AUTH_FETCHER(url: string) {
    const { data: session } = useSession();

    return fetch(baseUrl + url,
        {
            headers: { 
                accept: "application/json",
                Authorization: `Bearer ${session?.idToken}`
             }
        }
    ).then((res) => res.json());
}

export const fetcher = (url: string) => AUTH_FETCHER(url);

export const postFetcher = (url: string, data: any) => fetch(baseUrl + url, {
    method: 'post',
    headers: {
        accept: "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
});

export const postUploadFileFetcher = (url: string, data: any) => fetch(baseUrl + url, {
    method: 'post',
    redirect: 'follow',
    body: data
});

export const putFetcher = (url: string, data: any) => fetch(baseUrl + url, {
    method: 'put',
    headers: {
        accept: "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
});

export const putFetcherNoBody = (url: string) => fetch(baseUrl + url, {
    method: 'put',
    headers: {
        accept: "application/json",
        "Content-Type": "application/json"
    }
});

// export const getFetcher = (url: string) => fetch(baseUrl + url, {
//     method: 'get',
//     headers: {
//         accept: "application/json",
//     },
// });

export const getFetcher = (url: string) => AUTH_FETCHER(url);

export const patchFetcher = (url: string) => fetch(baseUrl + url, {
    method: 'patch',
    headers: {
        accept: "application/json",
    },
});

export const deleteFetcher = (url: string) => fetch(baseUrl + url, {
    method: 'delete',
    headers: {
        accept: "application/json",
    },
});


export const authenticateEndPoint = async (email:string, password:string) => {
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
    return { error: 'Invalid credentials' }
  }

  const data = await response.json();
//   const res = JSON.parse(data);
//   setCookie(res, 'accessToken', data.access_token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
//   setCookie(res, 'refreshToken', data.refresh_token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

  return data;
}