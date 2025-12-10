export type BlockType = 'hero' | 'vertical' | 'horizontal' | 'soldier';

export interface Block {
	type: BlockType;
	x: number;
	y: number;
	w: number;
	h: number;
}

export interface GameState {
	blocks: Block[];
	history: Block[][];
	solved: boolean;
}

export type Level = Block[];
