export type BlockType = 'hero' | 'vertical' | 'horizontal' | 'soldier';

export interface Block {
	id: string;
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

export type CubeType = '2x2' | '3x3';

export interface Solve {
	id: string;
	time: number;
	cube: CubeType;
	scramble: string;
	timestamp: number;
	penalty: boolean;
	dnf: boolean;
}
