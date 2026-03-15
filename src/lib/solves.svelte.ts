import type { Solve, CubeType } from './types';

const SOLVES_STORAGE_KEY = 'CUBE_SOLVES';

export class SolveManager {
	solves = $state<Solve[]>([]);

	constructor() {
		this.load_solves();
	}

	private load_solves() {
		if (typeof window !== 'undefined') {
			const stored = localStorage.getItem(SOLVES_STORAGE_KEY);
			if (stored) {
				try {
					this.solves = JSON.parse(stored);
				} catch (e) {
					console.error('Failed to parse solves from local storage:', e);
				}
			}
		}
	}

	private save() {
		if (typeof window !== 'undefined') {
			localStorage.setItem(SOLVES_STORAGE_KEY, JSON.stringify(this.solves));
		}
	}

	add_solve(time: number, cube: CubeType, scramble: string) {
		const new_solve: Solve = {
			id: crypto.randomUUID(),
			time,
			cube,
			scramble,
			timestamp: Date.now(),
			penalty: false,
			dnf: false
		};

		this.solves.unshift(new_solve);
		this.save();
	}

	toggle_penalty(id: string) {
		this.solves
			.filter((solve) => solve.id === id)
			.forEach((solve) => {
				solve.penalty = !solve.penalty;
				if (solve.penalty) {
					solve.dnf = false;
				}
			});
		this.save();
	}

	toggle_dnf(id: string) {
		this.solves
			.filter((solve) => solve.id === id)
			.forEach((solve) => {
				solve.dnf = !solve.dnf;
				if (solve.dnf) {
					solve.penalty = false;
				}
			});
		this.save();
	}

	delete_solve(id: string) {
		this.solves = this.solves.filter((solve) => solve.id !== id);
		this.save();
	}

	clear_all_solves() {
		this.solves = [];
		this.save();
	}

	get_best_time(cube: CubeType): number | null {
		const valid_times = this.solves
			.filter((solve) => solve.cube === cube && !solve.dnf)
			.map((solve) => solve.time + (solve.penalty ? 2000 : 0));

		if (valid_times.length === 0) return null;
		return Math.min(...valid_times);
	}

	get_worst_time(cube: CubeType): number | null {
		const valid_times = this.solves
			.filter((solve) => solve.cube === cube && !solve.dnf)
			.map((solve) => solve.time + (solve.penalty ? 2000 : 0));

		if (valid_times.length === 0) return null;
		return Math.max(...valid_times);
	}

	get_average(cube: CubeType): number | null {
		const valid_times = this.solves
			.filter((solve) => solve.cube === cube && !solve.dnf)
			.map((solve) => solve.time + (solve.penalty ? 2000 : 0));

		if (valid_times.length === 0) return null;

		const total = valid_times.reduce((sum, time) => sum + time, 0);
		return total / valid_times.length;
	}

	private calculate_aox(solves: Solve[], count: number): number | null {
		if (solves.length < count) return null;

		const recent_solves = solves.slice(0, count);
		const times = recent_solves.map((s) => (s.dnf ? Infinity : s.time + (s.penalty ? 2000 : 0)));
		const dnf_count = times.filter((t) => t === Infinity).length;
		if (dnf_count > 1) return null;

		times.sort((a, b) => a - b);

		const trimmed_times = times.slice(1, -1);
		const sum = trimmed_times.reduce((acc, val) => acc + val, 0);
		return sum / trimmed_times.length;
	}

	get_ao5(cube: CubeType): number | null {
		const cube_solves = this.solves.filter((solve) => solve.cube === cube);
		return this.calculate_aox(cube_solves, 5);
	}

	get_ao12(cube: CubeType): number | null {
		const cube_solves = this.solves.filter((solve) => solve.cube === cube);
		return this.calculate_aox(cube_solves, 12);
	}
}

export const solve_manager = new SolveManager();
