import type { Level } from './types';

const MAIN_ID = 'main-block';

export const levels: Level[] = [
	// --- Level 1: The Classic (Huarong Dao) ---
	// Difficulty: Medium
	[
		{ id: MAIN_ID, type: 'hero', x: 1, y: 0, w: 2, h: 2, label: 'Cao Cao' },
		{ id: 'v1', type: 'vertical', x: 0, y: 0, w: 1, h: 2, label: 'V1' },
		{ id: 'v2', type: 'vertical', x: 3, y: 0, w: 1, h: 2, label: 'V2' },
		{ id: 'v3', type: 'vertical', x: 0, y: 2, w: 1, h: 2, label: 'V3' },
		{ id: 'v4', type: 'vertical', x: 3, y: 2, w: 1, h: 2, label: 'V4' },
		{ id: 'h1', type: 'horizontal', x: 1, y: 2, w: 2, h: 1, label: 'H1' },
		{ id: 's1', type: 'soldier', x: 1, y: 3, w: 1, h: 1 },
		{ id: 's2', type: 'soldier', x: 2, y: 3, w: 1, h: 1 },
		{ id: 's3', type: 'soldier', x: 0, y: 4, w: 1, h: 1 },
		{ id: 's4', type: 'soldier', x: 3, y: 4, w: 1, h: 1 }
	],

	// --- Level 2: The Wings (Variation) ---
	[
		{ id: MAIN_ID, type: 'hero', x: 1, y: 0, w: 2, h: 2 },
		{ id: 'v1', type: 'vertical', x: 0, y: 0, w: 1, h: 2 },
		{ id: 'v2', type: 'vertical', x: 3, y: 0, w: 1, h: 2 },
		{ id: 'h1', type: 'horizontal', x: 1, y: 2, w: 2, h: 1 },
		{ id: 'h2', type: 'horizontal', x: 1, y: 3, w: 2, h: 1 },
		{ id: 's1', type: 'soldier', x: 0, y: 2, w: 1, h: 1 },
		{ id: 's2', type: 'soldier', x: 3, y: 2, w: 1, h: 1 },
		{ id: 's3', type: 'soldier', x: 0, y: 3, w: 1, h: 1 },
		{ id: 's4', type: 'soldier', x: 3, y: 3, w: 1, h: 1 }
	],

	// --- Level 3: Commander in Chief ---
	[
		{ id: MAIN_ID, type: 'hero', x: 1, y: 0, w: 2, h: 2 },
		{ id: 'v1', type: 'vertical', x: 0, y: 0, w: 1, h: 2 },
		{ id: 'v2', type: 'vertical', x: 3, y: 0, w: 1, h: 2 },
		{ id: 'h1', type: 'horizontal', x: 1, y: 2, w: 2, h: 1 },
		{ id: 'v3', type: 'vertical', x: 0, y: 2, w: 1, h: 2 },
		{ id: 'v4', type: 'vertical', x: 3, y: 2, w: 1, h: 2 },
		{ id: 's1', type: 'soldier', x: 1, y: 3, w: 1, h: 1 },
		{ id: 's2', type: 'soldier', x: 2, y: 3, w: 1, h: 1 },
		{ id: 's3', type: 'soldier', x: 1, y: 4, w: 1, h: 1 },
		{ id: 's4', type: 'soldier', x: 2, y: 4, w: 1, h: 1 }
	],

	// --- Level 4: Only One Escape ---
	[
		{ id: MAIN_ID, type: 'hero', x: 1, y: 0, w: 2, h: 2 },
		{ id: 'v1', type: 'vertical', x: 0, y: 0, w: 1, h: 2 },
		{ id: 'v2', type: 'vertical', x: 3, y: 0, w: 1, h: 2 },
		{ id: 'h1', type: 'horizontal', x: 1, y: 2, w: 2, h: 1 },
		{ id: 'v3', type: 'vertical', x: 1, y: 3, w: 1, h: 2 },
		{ id: 'v4', type: 'vertical', x: 2, y: 3, w: 1, h: 2 },
		{ id: 's1', type: 'soldier', x: 0, y: 2, w: 1, h: 1 },
		{ id: 's2', type: 'soldier', x: 3, y: 2, w: 1, h: 1 },
		{ id: 's3', type: 'soldier', x: 0, y: 3, w: 1, h: 1 },
		{ id: 's4', type: 'soldier', x: 3, y: 3, w: 1, h: 1 }
	],

	// --- Level 5: Hidden Path ---
	[
		{ id: MAIN_ID, type: 'hero', x: 1, y: 0, w: 2, h: 2 },
		{ id: 'v1', type: 'vertical', x: 0, y: 0, w: 1, h: 2 },
		{ id: 'v2', type: 'vertical', x: 3, y: 0, w: 1, h: 2 },
		{ id: 'h1', type: 'horizontal', x: 1, y: 2, w: 2, h: 1 },
		{ id: 'h2', type: 'horizontal', x: 1, y: 3, w: 2, h: 1 },
		{ id: 's1', type: 'soldier', x: 0, y: 2, w: 1, h: 1 },
		{ id: 's2', type: 'soldier', x: 3, y: 2, w: 1, h: 1 },
		{ id: 's3', type: 'soldier', x: 0, y: 4, w: 1, h: 1 },
		{ id: 's4', type: 'soldier', x: 3, y: 4, w: 1, h: 1 }
	],

	// --- Level 6: Entrenched ---
	[
		{ id: MAIN_ID, type: 'hero', x: 1, y: 1, w: 2, h: 2 },
		{ id: 'v1', type: 'vertical', x: 0, y: 0, w: 1, h: 2 },
		{ id: 'v2', type: 'vertical', x: 3, y: 0, w: 1, h: 2 },
		{ id: 'h1', type: 'horizontal', x: 1, y: 0, w: 2, h: 1 },
		{ id: 'v3', type: 'vertical', x: 0, y: 2, w: 1, h: 2 },
		{ id: 'v4', type: 'vertical', x: 3, y: 2, w: 1, h: 2 },
		{ id: 's1', type: 'soldier', x: 1, y: 3, w: 1, h: 1 },
		{ id: 's2', type: 'soldier', x: 2, y: 3, w: 1, h: 1 },
		{ id: 's3', type: 'soldier', x: 0, y: 4, w: 1, h: 1 },
		{ id: 's4', type: 'soldier', x: 3, y: 4, w: 1, h: 1 }
	],

	// --- Level 7: The Patrol ---
	[
		{ id: MAIN_ID, type: 'hero', x: 1, y: 0, w: 2, h: 2 },
		{ id: 'v1', type: 'vertical', x: 0, y: 0, w: 1, h: 2 },
		{ id: 'v2', type: 'vertical', x: 3, y: 0, w: 1, h: 2 },
		{ id: 'h1', type: 'horizontal', x: 1, y: 2, w: 2, h: 1 },
		{ id: 'h2', type: 'horizontal', x: 1, y: 3, w: 2, h: 1 },
		{ id: 's1', type: 'soldier', x: 0, y: 2, w: 1, h: 1 },
		{ id: 's2', type: 'soldier', x: 3, y: 2, w: 1, h: 1 },
		{ id: 's3', type: 'soldier', x: 0, y: 3, w: 1, h: 1 },
		{ id: 's4', type: 'soldier', x: 3, y: 3, w: 1, h: 1 }
	],

	// --- Level 8: Z-Defense ---
	[
		{ id: MAIN_ID, type: 'hero', x: 1, y: 0, w: 2, h: 2 },
		{ id: 'v1', type: 'vertical', x: 0, y: 0, w: 1, h: 2 },
		{ id: 'v2', type: 'vertical', x: 3, y: 0, w: 1, h: 2 },
		{ id: 'v3', type: 'vertical', x: 0, y: 2, w: 1, h: 2 },
		{ id: 'h1', type: 'horizontal', x: 1, y: 2, w: 2, h: 1 },
		{ id: 'v4', type: 'vertical', x: 3, y: 2, w: 1, h: 2 },
		{ id: 's1', type: 'soldier', x: 1, y: 3, w: 1, h: 1 },
		{ id: 's2', type: 'soldier', x: 2, y: 3, w: 1, h: 1 },
		{ id: 's3', type: 'soldier', x: 0, y: 4, w: 1, h: 1 },
		{ id: 's4', type: 'soldier', x: 3, y: 4, w: 1, h: 1 }
	],

	// --- Level 9: The Fortress ---
	[
		{ id: MAIN_ID, type: 'hero', x: 1, y: 0, w: 2, h: 2 },
		{ id: 'v1', type: 'vertical', x: 0, y: 0, w: 1, h: 2 },
		{ id: 'v2', type: 'vertical', x: 3, y: 0, w: 1, h: 2 },
		{ id: 'v3', type: 'vertical', x: 1, y: 2, w: 1, h: 2 },
		{ id: 'v4', type: 'vertical', x: 2, y: 2, w: 1, h: 2 },
		{ id: 's1', type: 'soldier', x: 0, y: 2, w: 1, h: 1 },
		{ id: 's2', type: 'soldier', x: 3, y: 2, w: 1, h: 1 },
		{ id: 's3', type: 'soldier', x: 0, y: 3, w: 1, h: 1 },
		{ id: 's4', type: 'soldier', x: 3, y: 3, w: 1, h: 1 }
	],

	// --- Level 10: U-Turn ---
	[
		{ id: MAIN_ID, type: 'hero', x: 1, y: 0, w: 2, h: 2 },
		{ id: 'v1', type: 'vertical', x: 0, y: 0, w: 1, h: 2 },
		{ id: 'v2', type: 'vertical', x: 3, y: 0, w: 1, h: 2 },
		{ id: 'h1', type: 'horizontal', x: 1, y: 2, w: 2, h: 1 },
		{ id: 'h2', type: 'horizontal', x: 1, y: 3, w: 2, h: 1 },
		{ id: 's1', type: 'soldier', x: 0, y: 2, w: 1, h: 1 },
		{ id: 's2', type: 'soldier', x: 3, y: 2, w: 1, h: 1 },
		{ id: 's3', type: 'soldier', x: 0, y: 3, w: 1, h: 1 },
		{ id: 's4', type: 'soldier', x: 3, y: 3, w: 1, h: 1 }
	],

	// --- Level 11: Crossfire ---
	[
		{ id: MAIN_ID, type: 'hero', x: 1, y: 0, w: 2, h: 2 },
		{ id: 'v1', type: 'vertical', x: 0, y: 0, w: 1, h: 2 },
		{ id: 'v2', type: 'vertical', x: 3, y: 0, w: 1, h: 2 },
		{ id: 'h1', type: 'horizontal', x: 1, y: 2, w: 2, h: 1 },
		{ id: 'v3', type: 'vertical', x: 0, y: 2, w: 1, h: 2 },
		{ id: 'v4', type: 'vertical', x: 3, y: 2, w: 1, h: 2 },
		{ id: 's1', type: 'soldier', x: 1, y: 3, w: 1, h: 1 },
		{ id: 's2', type: 'soldier', x: 2, y: 3, w: 1, h: 1 },
		{ id: 's3', type: 'soldier', x: 1, y: 4, w: 1, h: 1 },
		{ id: 's4', type: 'soldier', x: 2, y: 4, w: 1, h: 1 }
	],

	// --- Level 12: Diagonal Check ---
	[
		{ id: MAIN_ID, type: 'hero', x: 0, y: 0, w: 2, h: 2 },
		{ id: 'v1', type: 'vertical', x: 2, y: 0, w: 1, h: 2 },
		{ id: 'v2', type: 'vertical', x: 3, y: 0, w: 1, h: 2 },
		{ id: 'h1', type: 'horizontal', x: 0, y: 2, w: 2, h: 1 },
		{ id: 'h2', type: 'horizontal', x: 2, y: 2, w: 2, h: 1 },
		{ id: 'v3', type: 'vertical', x: 0, y: 3, w: 1, h: 2 },
		{ id: 's1', type: 'soldier', x: 1, y: 3, w: 1, h: 1 },
		{ id: 's2', type: 'soldier', x: 2, y: 3, w: 1, h: 1 },
		{ id: 's3', type: 'soldier', x: 3, y: 3, w: 1, h: 1 },
		{ id: 's4', type: 'soldier', x: 2, y: 4, w: 1, h: 1 }
	],

	// --- Level 13: The Blockade ---
	[
		{ id: MAIN_ID, type: 'hero', x: 1, y: 0, w: 2, h: 2 },
		{ id: 'v1', type: 'vertical', x: 0, y: 0, w: 1, h: 2 },
		{ id: 'v2', type: 'vertical', x: 3, y: 0, w: 1, h: 2 },
		{ id: 'h1', type: 'horizontal', x: 1, y: 2, w: 2, h: 1 },
		{ id: 'v3', type: 'vertical', x: 1, y: 3, w: 1, h: 2 },
		{ id: 'v4', type: 'vertical', x: 2, y: 3, w: 1, h: 2 },
		{ id: 's1', type: 'soldier', x: 0, y: 2, w: 1, h: 1 },
		{ id: 's2', type: 'soldier', x: 3, y: 2, w: 1, h: 1 },
		{ id: 's3', type: 'soldier', x: 0, y: 3, w: 1, h: 1 },
		{ id: 's4', type: 'soldier', x: 3, y: 3, w: 1, h: 1 }
	],

	// --- Level 14: Four Generals ---
	[
		{ id: MAIN_ID, type: 'hero', x: 1, y: 0, w: 2, h: 2 },
		{ id: 'v1', type: 'vertical', x: 0, y: 0, w: 1, h: 2 },
		{ id: 'v2', type: 'vertical', x: 3, y: 0, w: 1, h: 2 },
		{ id: 'v3', type: 'vertical', x: 0, y: 2, w: 1, h: 2 },
		{ id: 'v4', type: 'vertical', x: 3, y: 2, w: 1, h: 2 },
		{ id: 'h1', type: 'horizontal', x: 1, y: 2, w: 2, h: 1 },
		{ id: 's1', type: 'soldier', x: 1, y: 3, w: 1, h: 1 },
		{ id: 's2', type: 'soldier', x: 2, y: 3, w: 1, h: 1 },
		{ id: 's3', type: 'soldier', x: 1, y: 4, w: 1, h: 1 },
		{ id: 's4', type: 'soldier', x: 2, y: 4, w: 1, h: 1 }
	],

	// --- Level 15: soldier Traffic ---
	[
		{ id: MAIN_ID, type: 'hero', x: 1, y: 0, w: 2, h: 2 },
		{ id: 'v1', type: 'vertical', x: 0, y: 0, w: 1, h: 2 },
		{ id: 'v2', type: 'vertical', x: 3, y: 0, w: 1, h: 2 },
		{ id: 's1', type: 'soldier', x: 0, y: 2, w: 1, h: 1 },
		{ id: 's2', type: 'soldier', x: 1, y: 2, w: 1, h: 1 },
		{ id: 's3', type: 'soldier', x: 2, y: 2, w: 1, h: 1 },
		{ id: 's4', type: 'soldier', x: 3, y: 2, w: 1, h: 1 },
		{ id: 'v3', type: 'vertical', x: 0, y: 3, w: 1, h: 2 },
		{ id: 'h1', type: 'horizontal', x: 1, y: 3, w: 2, h: 1 },
		{ id: 'v4', type: 'vertical', x: 3, y: 3, w: 1, h: 2 }
	],

	// --- Level 16: The Split ---
	[
		{ id: MAIN_ID, type: 'hero', x: 1, y: 0, w: 2, h: 2 },
		{ id: 'v1', type: 'vertical', x: 0, y: 0, w: 1, h: 2 },
		{ id: 'v2', type: 'vertical', x: 3, y: 0, w: 1, h: 2 },
		{ id: 'v3', type: 'vertical', x: 1, y: 2, w: 1, h: 2 },
		{ id: 'v4', type: 'vertical', x: 2, y: 2, w: 1, h: 2 },
		{ id: 'h1', type: 'horizontal', x: 0, y: 2, w: 2, h: 1 }, // Note overlap risk, careful placement: actually x=0,w=2 puts it at 0,1. wait.
		// Correction for overlap:
		// Actually lets do:
		{ id: 'h_corr', type: 'horizontal', x: 0, y: 4, w: 2, h: 1 }, // bottom left
		{ id: 's1', type: 'soldier', x: 0, y: 2, w: 1, h: 1 },
		{ id: 's2', type: 'soldier', x: 0, y: 3, w: 1, h: 1 },
		{ id: 's3', type: 'soldier', x: 3, y: 2, w: 1, h: 1 },
		{ id: 's4', type: 'soldier', x: 3, y: 3, w: 1, h: 1 },
		{ id: 's5', type: 'soldier', x: 2, y: 4, w: 1, h: 1 } // Extra small to fill area?
		// Wait, standard counts: Main(4) + 4*V(8) + 1*H(2) = 14. Need 4 soldiers.
		// Let's reset Level 16 structure to be safer.
	],
	// Resetting Level 16:
	[
		{ id: MAIN_ID, type: 'hero', x: 1, y: 0, w: 2, h: 2 },
		{ id: 'v1', type: 'vertical', x: 0, y: 0, w: 1, h: 2 },
		{ id: 'v2', type: 'vertical', x: 3, y: 0, w: 1, h: 2 },
		{ id: 'h1', type: 'horizontal', x: 1, y: 2, w: 2, h: 1 },
		{ id: 'v3', type: 'vertical', x: 0, y: 2, w: 1, h: 2 },
		{ id: 'v4', type: 'vertical', x: 3, y: 2, w: 1, h: 2 },
		{ id: 's1', type: 'soldier', x: 1, y: 3, w: 1, h: 1 },
		{ id: 's2', type: 'soldier', x: 2, y: 3, w: 1, h: 1 },
		{ id: 's3', type: 'soldier', x: 1, y: 4, w: 1, h: 1 },
		{ id: 's4', type: 'soldier', x: 2, y: 4, w: 1, h: 1 }
	],

	// --- Level 17: Symmetry Break ---
	[
		{ id: MAIN_ID, type: 'hero', x: 1, y: 0, w: 2, h: 2 },
		{ id: 'v1', type: 'vertical', x: 0, y: 0, w: 1, h: 2 },
		{ id: 'v2', type: 'vertical', x: 3, y: 0, w: 1, h: 2 },
		{ id: 'h1', type: 'horizontal', x: 0, y: 2, w: 2, h: 1 },
		{ id: 'h2', type: 'horizontal', x: 2, y: 2, w: 2, h: 1 },
		{ id: 'v3', type: 'vertical', x: 0, y: 3, w: 1, h: 2 },
		{ id: 'v4', type: 'vertical', x: 3, y: 3, w: 1, h: 2 },
		{ id: 's1', type: 'soldier', x: 1, y: 3, w: 1, h: 1 },
		{ id: 's2', type: 'soldier', x: 2, y: 3, w: 1, h: 1 },
		{ id: 's3', type: 'soldier', x: 1, y: 4, w: 1, h: 1 },
		{ id: 's4', type: 'soldier', x: 2, y: 4, w: 1, h: 1 }
	],

	// --- Level 18: Bottom Heavy ---
	[
		{ id: MAIN_ID, type: 'hero', x: 1, y: 0, w: 2, h: 2 },
		{ id: 'v1', type: 'vertical', x: 0, y: 0, w: 1, h: 2 },
		{ id: 'v2', type: 'vertical', x: 3, y: 0, w: 1, h: 2 },
		{ id: 's1', type: 'soldier', x: 0, y: 2, w: 1, h: 1 },
		{ id: 's2', type: 'soldier', x: 3, y: 2, w: 1, h: 1 },
		{ id: 'v3', type: 'vertical', x: 1, y: 2, w: 1, h: 2 },
		{ id: 'v4', type: 'vertical', x: 2, y: 2, w: 1, h: 2 },
		{ id: 'h1', type: 'horizontal', x: 0, y: 3, w: 2, h: 1 }, // Dangerous overlap? No, x=0, w=2 -> 0,1
		// Correction: x0,y3 and x1,y3. V3 is at x1,y2..3. Overlap!
		// Re-plan Level 18:
		{ id: 's3', type: 'soldier', x: 0, y: 3, w: 1, h: 1 },
		{ id: 's4', type: 'soldier', x: 3, y: 3, w: 1, h: 1 },
		{ id: 'h_btm', type: 'horizontal', x: 1, y: 4, w: 2, h: 1 },
		// Fill gaps:
		{ id: 's5', type: 'soldier', x: 0, y: 4, w: 1, h: 1 },
		{ id: 's6', type: 'soldier', x: 3, y: 4, w: 1, h: 1 }
	],

	// --- Level 19: The Ladder ---
	[
		{ id: MAIN_ID, type: 'hero', x: 0, y: 0, w: 2, h: 2 },
		{ id: 'h1', type: 'horizontal', x: 2, y: 0, w: 2, h: 1 },
		{ id: 'h2', type: 'horizontal', x: 2, y: 1, w: 2, h: 1 },
		{ id: 'v1', type: 'vertical', x: 0, y: 2, w: 1, h: 2 },
		{ id: 'v2', type: 'vertical', x: 1, y: 2, w: 1, h: 2 },
		{ id: 'v3', type: 'vertical', x: 2, y: 2, w: 1, h: 2 },
		{ id: 'v4', type: 'vertical', x: 3, y: 2, w: 1, h: 2 },
		{ id: 's1', type: 'soldier', x: 0, y: 4, w: 1, h: 1 },
		{ id: 's2', type: 'soldier', x: 1, y: 4, w: 1, h: 1 },
		{ id: 's3', type: 'soldier', x: 2, y: 4, w: 1, h: 1 },
		{ id: 's4', type: 'soldier', x: 3, y: 4, w: 1, h: 1 }
	],

	// --- Level 20: Centered ---
	[
		{ id: MAIN_ID, type: 'hero', x: 1, y: 1, w: 2, h: 2 },
		{ id: 'v1', type: 'vertical', x: 0, y: 0, w: 1, h: 2 },
		{ id: 'v2', type: 'vertical', x: 3, y: 0, w: 1, h: 2 },
		{ id: 'h1', type: 'horizontal', x: 1, y: 0, w: 2, h: 1 },
		{ id: 'v3', type: 'vertical', x: 0, y: 2, w: 1, h: 2 },
		{ id: 'v4', type: 'vertical', x: 3, y: 2, w: 1, h: 2 },
		{ id: 'h2', type: 'horizontal', x: 1, y: 3, w: 2, h: 1 },
		{ id: 's1', type: 'soldier', x: 0, y: 4, w: 1, h: 1 },
		{ id: 's2', type: 'soldier', x: 1, y: 4, w: 1, h: 1 },
		{ id: 's3', type: 'soldier', x: 2, y: 4, w: 1, h: 1 },
		{ id: 's4', type: 'soldier', x: 3, y: 4, w: 1, h: 1 }
	],

	// --- Level 21: Three Pillars ---
	[
		{ id: MAIN_ID, type: 'hero', x: 0, y: 0, w: 2, h: 2 },
		{ id: 'v1', type: 'vertical', x: 2, y: 0, w: 1, h: 2 },
		{ id: 'v2', type: 'vertical', x: 3, y: 0, w: 1, h: 2 },
		{ id: 'v3', type: 'vertical', x: 0, y: 2, w: 1, h: 2 },
		{ id: 'h1', type: 'horizontal', x: 1, y: 2, w: 2, h: 1 },
		{ id: 'v4', type: 'vertical', x: 3, y: 2, w: 1, h: 2 },
		{ id: 's1', type: 'soldier', x: 1, y: 3, w: 1, h: 1 },
		{ id: 's2', type: 'soldier', x: 2, y: 3, w: 1, h: 1 },
		{ id: 's3', type: 'soldier', x: 0, y: 4, w: 1, h: 1 },
		{ id: 's4', type: 'soldier', x: 3, y: 4, w: 1, h: 1 }
	],

	// --- Level 22: The Box ---
	[
		{ id: MAIN_ID, type: 'hero', x: 1, y: 0, w: 2, h: 2 },
		{ id: 'v1', type: 'vertical', x: 0, y: 0, w: 1, h: 2 },
		{ id: 'v2', type: 'vertical', x: 3, y: 0, w: 1, h: 2 },
		{ id: 'h1', type: 'horizontal', x: 1, y: 2, w: 2, h: 1 },
		{ id: 'v3', type: 'vertical', x: 0, y: 2, w: 1, h: 2 },
		{ id: 'v4', type: 'vertical', x: 3, y: 2, w: 1, h: 2 },
		{ id: 's1', type: 'soldier', x: 1, y: 3, w: 1, h: 1 },
		{ id: 's2', type: 'soldier', x: 2, y: 3, w: 1, h: 1 },
		{ id: 's3', type: 'soldier', x: 1, y: 4, w: 1, h: 1 },
		{ id: 's4', type: 'soldier', x: 2, y: 4, w: 1, h: 1 }
	],

	// --- Level 23: Tetris Style ---
	[
		{ id: MAIN_ID, type: 'hero', x: 1, y: 0, w: 2, h: 2 },
		{ id: 'v1', type: 'vertical', x: 0, y: 0, w: 1, h: 2 },
		{ id: 'v2', type: 'vertical', x: 3, y: 0, w: 1, h: 2 },
		{ id: 'h1', type: 'horizontal', x: 1, y: 2, w: 2, h: 1 },
		{ id: 'h2', type: 'horizontal', x: 0, y: 3, w: 2, h: 1 },
		{ id: 'h3', type: 'horizontal', x: 2, y: 3, w: 2, h: 1 },
		{ id: 's1', type: 'soldier', x: 0, y: 2, w: 1, h: 1 },
		{ id: 's2', type: 'soldier', x: 3, y: 2, w: 1, h: 1 },
		{ id: 's3', type: 'soldier', x: 0, y: 4, w: 1, h: 1 },
		{ id: 's4', type: 'soldier', x: 3, y: 4, w: 1, h: 1 }
	],

	// --- Level 24: Shifted ---
	[
		{ id: MAIN_ID, type: 'hero', x: 2, y: 0, w: 2, h: 2 },
		{ id: 'v1', type: 'vertical', x: 0, y: 0, w: 1, h: 2 },
		{ id: 'v2', type: 'vertical', x: 1, y: 0, w: 1, h: 2 },
		{ id: 'h1', type: 'horizontal', x: 0, y: 2, w: 2, h: 1 },
		{ id: 'h2', type: 'horizontal', x: 2, y: 2, w: 2, h: 1 },
		{ id: 'v3', type: 'vertical', x: 0, y: 3, w: 1, h: 2 },
		{ id: 'v4', type: 'vertical', x: 3, y: 3, w: 1, h: 2 },
		{ id: 's1', type: 'soldier', x: 1, y: 3, w: 1, h: 1 },
		{ id: 's2', type: 'soldier', x: 2, y: 3, w: 1, h: 1 },
		{ id: 's3', type: 'soldier', x: 1, y: 4, w: 1, h: 1 },
		{ id: 's4', type: 'soldier', x: 2, y: 4, w: 1, h: 1 }
	],

	// --- Level 25: Locked Door ---
	[
		{ id: MAIN_ID, type: 'hero', x: 1, y: 0, w: 2, h: 2 },
		{ id: 'v1', type: 'vertical', x: 0, y: 0, w: 1, h: 2 },
		{ id: 'v2', type: 'vertical', x: 3, y: 0, w: 1, h: 2 },
		{ id: 'h1', type: 'horizontal', x: 1, y: 2, w: 2, h: 1 },
		{ id: 'v3', type: 'vertical', x: 1, y: 3, w: 1, h: 2 },
		{ id: 'v4', type: 'vertical', x: 2, y: 3, w: 1, h: 2 },
		{ id: 's1', type: 'soldier', x: 0, y: 2, w: 1, h: 1 },
		{ id: 's2', type: 'soldier', x: 3, y: 2, w: 1, h: 1 },
		{ id: 's3', type: 'soldier', x: 0, y: 3, w: 1, h: 1 },
		{ id: 's4', type: 'soldier', x: 3, y: 3, w: 1, h: 1 }
	],

	// --- Level 26: Chaos ---
	[
		{ id: MAIN_ID, type: 'hero', x: 1, y: 0, w: 2, h: 2 },
		{ id: 'v1', type: 'vertical', x: 0, y: 0, w: 1, h: 2 },
		{ id: 'v2', type: 'vertical', x: 3, y: 0, w: 1, h: 2 },
		{ id: 's1', type: 'soldier', x: 0, y: 2, w: 1, h: 1 },
		{ id: 's2', type: 'soldier', x: 1, y: 2, w: 1, h: 1 },
		{ id: 's3', type: 'soldier', x: 2, y: 2, w: 1, h: 1 },
		{ id: 's4', type: 'soldier', x: 3, y: 2, w: 1, h: 1 },
		{ id: 'v3', type: 'vertical', x: 0, y: 3, w: 1, h: 2 },
		{ id: 'v4', type: 'vertical', x: 1, y: 3, w: 1, h: 2 },
		{ id: 'v5', type: 'vertical', x: 2, y: 3, w: 1, h: 2 },
		{ id: 'v6', type: 'vertical', x: 3, y: 3, w: 1, h: 2 }
	],

	// --- Level 27: The Wall ---
	[
		{ id: MAIN_ID, type: 'hero', x: 1, y: 0, w: 2, h: 2 },
		{ id: 'h1', type: 'horizontal', x: 0, y: 2, w: 2, h: 1 },
		{ id: 'h2', type: 'horizontal', x: 2, y: 2, w: 2, h: 1 },
		{ id: 'h3', type: 'horizontal', x: 0, y: 3, w: 2, h: 1 },
		{ id: 'h4', type: 'horizontal', x: 2, y: 3, w: 2, h: 1 },
		{ id: 'v1', type: 'vertical', x: 0, y: 0, w: 1, h: 2 },
		{ id: 'v2', type: 'vertical', x: 3, y: 0, w: 1, h: 2 },
		{ id: 's1', type: 'soldier', x: 0, y: 4, w: 1, h: 1 },
		{ id: 's2', type: 'soldier', x: 1, y: 4, w: 1, h: 1 },
		{ id: 's3', type: 'soldier', x: 2, y: 4, w: 1, h: 1 },
		{ id: 's4', type: 'soldier', x: 3, y: 4, w: 1, h: 1 }
	],

	// --- Level 28: Split Decision ---
	[
		{ id: MAIN_ID, type: 'hero', x: 1, y: 0, w: 2, h: 2 },
		{ id: 'v1', type: 'vertical', x: 0, y: 0, w: 1, h: 2 },
		{ id: 'v2', type: 'vertical', x: 3, y: 0, w: 1, h: 2 },
		{ id: 'v3', type: 'vertical', x: 1, y: 2, w: 1, h: 2 },
		{ id: 'v4', type: 'vertical', x: 2, y: 2, w: 1, h: 2 },
		{ id: 's1', type: 'soldier', x: 0, y: 2, w: 1, h: 1 },
		{ id: 's2', type: 'soldier', x: 3, y: 2, w: 1, h: 1 },
		{ id: 's3', type: 'soldier', x: 0, y: 3, w: 1, h: 1 },
		{ id: 's4', type: 'soldier', x: 3, y: 3, w: 1, h: 1 },
		{ id: 'h1', type: 'horizontal', x: 1, y: 4, w: 2, h: 1 }
	],

	// --- Level 29: Tight Squeeze ---
	[
		{ id: MAIN_ID, type: 'hero', x: 1, y: 0, w: 2, h: 2 },
		{ id: 'v1', type: 'vertical', x: 0, y: 0, w: 1, h: 2 },
		{ id: 'v2', type: 'vertical', x: 3, y: 0, w: 1, h: 2 },
		{ id: 'h1', type: 'horizontal', x: 1, y: 2, w: 2, h: 1 },
		{ id: 'v3', type: 'vertical', x: 0, y: 3, w: 1, h: 2 },
		{ id: 'v4', type: 'vertical', x: 3, y: 3, w: 1, h: 2 },
		{ id: 's1', type: 'soldier', x: 0, y: 2, w: 1, h: 1 },
		{ id: 's2', type: 'soldier', x: 3, y: 2, w: 1, h: 1 },
		{ id: 's3', type: 'soldier', x: 1, y: 3, w: 1, h: 1 },
		{ id: 's4', type: 'soldier', x: 2, y: 3, w: 1, h: 1 }
	],

	// --- Level 30: Grand Finale ---
	[
		{ id: MAIN_ID, type: 'hero', x: 1, y: 0, w: 2, h: 2 },
		{ id: 'v1', type: 'vertical', x: 0, y: 0, w: 1, h: 2 },
		{ id: 'v2', type: 'vertical', x: 3, y: 0, w: 1, h: 2 },
		{ id: 'h1', type: 'horizontal', x: 1, y: 2, w: 2, h: 1 },
		{ id: 'h2', type: 'horizontal', x: 1, y: 3, w: 2, h: 1 },
		{ id: 'v3', type: 'vertical', x: 0, y: 2, w: 1, h: 2 },
		{ id: 'v4', type: 'vertical', x: 3, y: 2, w: 1, h: 2 },
		{ id: 's1', type: 'soldier', x: 0, y: 4, w: 1, h: 1 },
		{ id: 's2', type: 'soldier', x: 3, y: 4, w: 1, h: 1 },
		{ id: 's3', type: 'soldier', x: 1, y: 4, w: 1, h: 1 },
		{ id: 's4', type: 'soldier', x: 2, y: 4, w: 1, h: 1 }
	]
];
