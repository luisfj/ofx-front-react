import { getSession } from 'next-auth/react';

export const baseUrl = process.env.NODE_ENV === 'production' ? 'https://luisjohann.dev/ofx-api' : 'http://localhost:8080/api';

export async function fetchFromApi(endpoint:string, options = {}) {
  const session = await getSession();

  if (!session || !session.idToken) {
    throw new Error('User not authenticated');
  }

  const response = await fetch(baseUrl + endpoint, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${session.idToken}`,
    },
    mode: "no-cors",
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
}
