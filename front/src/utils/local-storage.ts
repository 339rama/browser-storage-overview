export type LocalStorageSubscriber = (key: string, newValue: string | null, oldValue: string | null) => void;

class LocalStorage {
    constructor() {
        window.addEventListener('storage', (event) => {
            if (this.isLocalStorage(event.storageArea) && event.key) {
                this.notify(event.key, event.newValue, event.oldValue)
            }
        })
    }
    public subscribers: Set<LocalStorageSubscriber> = new Set();

    private isLocalStorage(storage: Storage | null) {
        return storage === localStorage;
    }

    private notify(key: string, value: string | null, oldValue: string | null) {
        this.subscribers.forEach((cb) => cb(key, value, oldValue))
    }

    public subscribe(cb: LocalStorageSubscriber) {
        this.subscribers.add(cb);
    }

    public unsubscribe(cb: LocalStorageSubscriber) {
        this.subscribers.delete(cb);
    }

    public setItem(key: string, value: string): void {
        const oldValue = localStorage.getItem(key);
        localStorage.setItem(key, value);
        this.notify(key, value, oldValue)
    }

    public getItem(key: string): string | null {
        return localStorage.getItem(key);
    }
}

export const LocalStorageService = new LocalStorage();