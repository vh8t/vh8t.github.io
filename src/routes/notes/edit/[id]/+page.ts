import { db } from '$lib/db';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const id = Number(params.id);

	if (isNaN(id)) {
		throw error(400, 'Invalid note ID');
	}

	const note = await db.notes.get(id);

	if (!note) {
		throw error(404, 'Note not found');
	}

	return { note };
};
