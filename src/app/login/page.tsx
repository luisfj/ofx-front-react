"use client";
import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function Login() {
  const { data: session } = useSession();
  console.log(session);

  if (session) {
    return (
      <div style={{ fontFamily: 'sans-serif', margin: '10px 20px' }}>
        <p>Welcome, {session.user.name}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  } else {
    return (
      <div>
        <p>Please sign in</p>
        <button onClick={() => signIn("google", { callbackUrl: '/account' })}>Sign in with Google</button>
      </div>
    );
  }
}

Login.getLayout = function getRootLayout(page: any) {
  return getRootLayout(page);
};
