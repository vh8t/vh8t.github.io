import { randomScrambleForEvent } from 'cubing/scramble';
import type { CubeType } from './types';
import { browser } from '$app/environment';

const queues: Record<CubeType, string[]> = {
	'3x3': [],
	'2x2': []
};

const is_refilling: Record<CubeType, boolean> = {
	'3x3': false,
	'2x2': false
};

const QUEUE_TARGET = 5;

async function refill_queue(cube: CubeType) {
	if (is_refilling[cube]) return;
	is_refilling[cube] = true;

	const event_id = cube === '3x3' ? '333' : '222';

	while (queues[cube].length < QUEUE_TARGET) {
		try {
			const scramble = await randomScrambleForEvent(event_id);
			queues[cube].push(scramble.toString());
		} catch (e) {
			console.error(`Failed to generate ${cube} scramble:`, e);
			break;
		}
	}

	is_refilling[cube] = false;
}

if (browser) {
	refill_queue('3x3');
	refill_queue('2x2');
}

export async function generate_scramble(cube: CubeType): Promise<string> {
	refill_queue(cube);

	if (queues[cube].length > 0) {
		return queues[cube].shift() as string;
	}

	const event_id = cube === '3x3' ? '333' : '222';
	const fallback = await randomScrambleForEvent(event_id);
	return fallback.toString();
}
