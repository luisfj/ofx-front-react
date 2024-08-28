"use client"
import { getSession } from 'next-auth/react';

export const baseUrl = process.env.NODE_ENV === 'production' ? 'https://luisjohann.dev/ofx-api' : 'http://localhost:8080/api';

export async function fetchFromApi(endpoint:string) {
  const session : any = await getSession();

  if (!session || !session.accessToken) {
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
    throw new Error('Network response was not ok');
  }

  return response.json();
}

export async function fetchPostToApi(endpoint:string, data:any) {
  const session : any = await getSession();

  if (!session || !session.accessToken) {
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
    throw new Error('Network response was not ok');
  }

  return response;
}

export async function fetchPutToApi(endpoint:string, data:any) {
  const session : any = await getSession();

  if (!session || !session.accessToken) {
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
    throw new Error('Network response was not ok');
  }

  return response;
}

export async function fetchPutToApiNoBody(endpoint:string) {
  const session : any = await getSession();

  if (!session || !session.accessToken) {
    throw new Error('User not authenticated');
  }

  const response = await fetch(baseUrl + endpoint, {    
    method: 'PUT',
    headers: {
        "Authorization": `Bearer ${session.accessToken}`,
    },
  });

  if (!response.ok && response.status !== 201) {
    throw new Error('Network response was not ok');
  }

  return response;
}

export async function fetchDeleteToApi(endpoint:string) {
  const session : any = await getSession();

  if (!session || !session.accessToken) {
    throw new Error('User not authenticated');
  }

  const response = await fetch(baseUrl + endpoint, {    
    method: 'DELETE',
    headers: {
        "Authorization": `Bearer ${session.accessToken}`,
    },
  });

  if (!response.ok && response.status !== 201) {
    throw new Error('Network response was not ok');
  }

  return response;
}

export async function fetchUploadToApi(endpoint:string, data:FormData) {
  const session : any = await getSession();

  if (!session || !session.accessToken) {
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
    throw new Error('Network response was not ok');
  }

  return response;
}
