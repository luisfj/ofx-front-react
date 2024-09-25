"use client";

import sseSingleton from "@/api/sseSingleton";
import { toast } from "@/components/ui/use-toast";
import { SseMessage } from "@/types/SseMessageType";
import { getSession } from "next-auth/react";
import React from "react";

async function connectSse() {
    const session: any = await getSession();

    if (!session || !session.accessToken) {
        throw new Error('User not authenticated');
    }

    sseSingleton.connect(session.accessToken).onmessage = (e: MessageEvent) => {
        console.log(e);
        const message = JSON.parse(e.data) as SseMessage;
        toast({
            title: message.title,
            variant: message.status == "SUCCESS" ? "default" : "destructive",
            description: `${message.message}!! Em: ${message.formatedEventDateTime}`
        });
    };
}

export default function SseConnectComponent() {

    React.useEffect(() => {
        connectSse();
    }, []);

    return (
        <>
        </>
    );
}