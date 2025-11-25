import Dexie, { type Table } from 'dexie';

export interface Note {
	id?: number;
	content: string;
	createdAt: Date;
}

export class Database extends Dexie {
	notes!: Table<Note, number>;

	constructor() {
		super('notes');

		this.version(1).stores({
			notes: '++id, createdAt'
		});
	}
}

export const db = new Database();
