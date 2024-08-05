export class SESSION_UTILS {
    static getFrom(key: string) {
        const sessionValue = sessionStorage.getItem(key);
        if (!sessionValue) return null;
        return JSON.parse(sessionValue);
    }

    static setTo(key: string, obj: object | null) {
        if (!obj) {
            this.clear(key);
            return;
        }
        const objJson = JSON.stringify(obj);
        sessionStorage.setItem(key, objJson);
    }

    static clear(key: string) {
        sessionStorage.removeItem(key);
    }
}