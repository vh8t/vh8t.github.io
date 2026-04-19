import { get, set } from 'idb-keyval';
import type { UserCollection, CardVariant, CardCondition } from '$lib/types';

const COLLECTION_KEY = 'poke_collection';

export const loadCollection = async (): Promise<UserCollection> => {
	try {
		const data = await get<UserCollection>(COLLECTION_KEY);
		return data || {};
	} catch (error) {
		console.error('IndexedDB Load Error:', error);
		return {};
	}
};

export const saveCollection = async (collection: UserCollection) => {
	await set(COLLECTION_KEY, $state.snapshot(collection));
};

export const addToCollection = (
	collection: UserCollection,
	cardId: string,
	variant: CardVariant,
	condition: CardCondition
) => {
	if (!collection[cardId]) {
		collection[cardId] = [];
	}

	const existing = collection[cardId].find((i) => i.v === variant && i.c === condition);
	if (existing) {
		existing.q++;
	} else {
		collection[cardId].push({
			v: variant,
			c: condition,
			q: 1,
			a: Date.now()
		});
	}
};
