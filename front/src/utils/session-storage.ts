export type SessionStorageSubscriber = (key: string, newValue: string, oldValue: string| null)=> void;

export class SessionStorageService {
    public static subscribers: Set<SessionStorageSubscriber> = new Set();

    public static subscribe(cb: SessionStorageSubscriber){
        this.subscribers.add(cb);
    }

    public static unsubscribe(cb: SessionStorageSubscriber){
        this.subscribers.delete(cb);
    }

    public static setItem(key: string, value:string): void {
        const oldValue = sessionStorage.getItem(key);
        sessionStorage.setItem(key, value);
        this.subscribers.forEach((cb)=> cb(key, value, oldValue))
    }

    public static getItem(key: string): string | null {
        return sessionStorage.getItem(key);
    }
}