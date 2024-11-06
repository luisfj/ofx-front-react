import { baseUrl } from "./baseApi";

class SseSingleton {
    private static instance: SseSingleton;
    private sse: EventSource | null = null;

    private constructor() { }

    public static getInstance(): SseSingleton {
        if (!SseSingleton.instance) {
            SseSingleton.instance = new SseSingleton();
        }
        return SseSingleton.instance;
    }

    public connect(accessToken: string): EventSource {
        if (!this.sse) {
            this.sse = new EventSource(`${baseUrl}/v1/sse/subscribe?token=${accessToken}`);
            this.sse.onmessage = this.handleMessage;
            this.sse.onerror = (ev: Event) => this.handleError(ev, accessToken);
        }
        return this.sse;
    }

    private handleMessage(event: MessageEvent): void {
        console.log('New message:', event.data);
        // Processar a mensagem recebida
    }

    private handleError(event: Event, accessToken: String): void {
        console.error('Sse error:', event);
        setTimeout(() => {
            this.sse = new EventSource(`${baseUrl}/v1/sse/subscribe?token=${accessToken}`);
        }, 1000);
    }

    public disconnect(): void {
        if (this.sse) {
            this.sse.close();
            this.sse = null;
        }
    }
}

export default SseSingleton.getInstance();