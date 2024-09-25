"use client";

import { useSession } from "next-auth/react";
import MyInvites from "./components/myInvites";

export default function MyInvitesPage() {
    const { data: session } = useSession();

    if (!session || !session.user)
        return (<>Sem autorização</>);

    return (
        <div className="mt-10 w-full">

            <MyInvites />

        </div>
    );
}