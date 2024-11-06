"use client"
import { getSession } from 'next-auth/react';
import { env } from 'process';

export const baseUrl = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BASE_BACKEND_URL : 'http://localhost:8080/api';

export async function fetchFromApi(endpoint:string) {
  console.info(`[callApi:fetchFromApi] - Buscando dados da api= ${baseUrl}${endpoint}`);
  const session : any = await getSession();

  if (!session || !session.accessToken) {
    console.error(`[callApi:fetchFromApi] - User not authentucated`);
    throw new Error('User not authenticated');
  }

  const response = await fetch(baseUrl + endpoint, {    
    method: 'GET',
    headers: {
        accept: "application/json",
        // "Content-Type": "application/json",
        "Authorization": `Bearer ${session.accessToken}`,
    },
  });

  if (!response.ok) {
    console.error(`[callApi:fetchFromApi] - resposta da chamada a api não foi ok: ${response.status}: ${response.statusText}`);
    throw new Error('Network response was not ok');
  }

  return response.json();
}

export async function fetchPostToApi(endpoint:string, data:any) {
  console.info(`[callApi:fetchPostToApi] - Salvando dados na api= ${baseUrl}${endpoint} com dados: ${JSON.stringify(data)}`);
  const session : any = await getSession();

  if (!session || !session.accessToken) {
    console.error(`[callApi:fetchPostToApi] - User not authentucated`);
    throw new Error('User not authenticated');
  }

  const response = await fetch(baseUrl + endpoint, {    
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session.accessToken}`,
    },
  });

  if (!response.ok && response.status !== 201) {
    console.error(`[callApi:fetchPostToApi] - resposta da chamada a api não foi ok: ${response.status}: ${response.statusText}`);
    throw new Error('Network response was not ok');
  }

  return response;
}

export async function fetchPutToApi(endpoint:string, data:any) {
  console.info(`[callApi:fetchPutToApi] - Salvando dados na api= ${baseUrl}${endpoint} com dados: ${JSON.stringify(data)}`);
  const session : any = await getSession();

  if (!session || !session.accessToken) {
    console.error(`[callApi:fetchPutToApi] - User not authentucated`);
    throw new Error('User not authenticated');
  }

  const response = await fetch(baseUrl + endpoint, {    
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session.accessToken}`,
    },
  });

  if (!response.ok && response.status !== 201) {
    console.error(`[callApi:fetchPutToApi] - resposta da chamada a api não foi ok: ${response.status}: ${response.statusText}`);
    throw new Error('Network response was not ok');
  }

  return response;
}

export async function fetchPutToApiNoBody(endpoint:string) {
  console.info(`[callApi:fetchPutToApiNoBody] - Salvando dados na api= ${baseUrl}${endpoint} sem dados`);
  const session : any = await getSession();

  if (!session || !session.accessToken) {
    console.error(`[callApi:fetchPutToApiNoBody] - User not authentucated`);
    throw new Error('User not authenticated');
  }

  const response = await fetch(baseUrl + endpoint, {    
    method: 'PUT',
    headers: {
        "Authorization": `Bearer ${session.accessToken}`,
    },
  });

  if (!response.ok && response.status !== 201) {
    console.error(`[callApi:fetchPutToApiNoBody] - resposta da chamada a api não foi ok: ${response.status}: ${response.statusText}`);
    throw new Error('Network response was not ok');
  }

  return response;
}

export async function fetchDeleteToApi(endpoint:string) {
  console.info(`[callApi:fetchDeleteToApi] - Deletando dados na api= ${baseUrl}${endpoint}`);
  const session : any = await getSession();

  if (!session || !session.accessToken) {
    console.error(`[callApi:fetchDeleteToApi] - User not authentucated`);
    throw new Error('User not authenticated');
  }

  const response = await fetch(baseUrl + endpoint, {    
    method: 'DELETE',
    headers: {
        "Authorization": `Bearer ${session.accessToken}`,
    },
  });

  if (!response.ok && response.status !== 201) {
    console.error(`[callApi:fetchDeleteToApi] - resposta da chamada a api não foi ok: ${response.status}: ${response.statusText}`);
    throw new Error('Network response was not ok');
  }

  return response;
}

export async function fetchUploadToApi(endpoint:string, data:FormData) {
  console.info(`[callApi:fetchUploadToApi] - Fazendo upload de arquivo na api= ${baseUrl}${endpoint}`);
  const session : any = await getSession();

  if (!session || !session.accessToken) {
    console.error(`[callApi:fetchUploadToApi] - User not authentucated`);
    throw new Error('User not authenticated');
  }

  const response = await fetch(baseUrl + endpoint, {    
    method: 'POST',
    redirect: 'follow',
    body: data,
    headers: {
        "Authorization": `Bearer ${session.accessToken}`,
    },
  });

  if (!response.ok && response.status !== 200) {
    console.error(`[callApi:fetchUploadToApi] - resposta da chamada a api não foi ok: ${response.status}: ${response.statusText}`);
    throw new Error('Network response was not ok');
  }

  return response;
}
