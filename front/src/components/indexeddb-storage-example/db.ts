import Dexie from 'dexie';
import { Todo } from './interfaces';


class AppDatabase extends Dexie {
    todos!: Dexie.Table<Todo, number>; // number = type of the primkey

    constructor({ dbName, dbVersion }: { dbName: string, dbVersion: number }) {
        super(dbName);
        this.version(dbVersion).stores({
            todos: '++id, label',
        });
    }
}

export const db = new AppDatabase({ dbName: "appDatabase", dbVersion: 1 });
