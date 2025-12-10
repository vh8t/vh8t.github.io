export type BlockType = 'hero' | 'vertical' | 'horizontal' | 'soldier';

export interface Block {
	id: string;
	type: BlockType;
	x: number;
	y: number;
	w: number;
	h: number;
	label?: string;
}

export interface GameState {
	blocks: Block[];
	history: Block[][];
	solved: boolean;
}

export type Level = Block[];
