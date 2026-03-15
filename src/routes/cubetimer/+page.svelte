<script lang="ts">
	import { solve_manager } from '$lib/solves.svelte';
	import { generate_scramble } from '$lib/scrambler';
	import type { CubeType, Solve } from '$lib/types';

	import * as Card from '$lib/components/ui/card';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Select from '$lib/components/ui/select';
	import * as Table from '$lib/components/ui/table';
	import { Button } from '$lib/components/ui/button';

	import 'cubing/twisty';

	import {
		RefreshCw,
		Trash2,
		Trophy,
		ChartNoAxesColumn,
		Cuboid,
		Lock,
		LockOpen,
		Pencil,
		Check,
		Copy,
		CheckCheck
	} from '@lucide/svelte';
	import { onMount, untrack } from 'svelte';

	const CUBE_STORAGE_KEY = 'CUBE';
	let is_mounted: boolean = $state(false);

	let timer_state: 'idle' | 'pressing' | 'ready' | 'running' = $state('idle');
	let current_time_ms: number = $state(0);

	let start_timestamp: number = 0;
	let hold_timeout: ReturnType<typeof setTimeout>;
	let running_interval: ReturnType<typeof setInterval>;
	const HOLD_DELAY = 350;

	let current_cube: CubeType = $state('3x3');
	let current_scramble: string = $state('Generating...');

	let is_locked: boolean = $state(false);
	let is_editing: boolean = $state(false);
	let is_copied: boolean = $state(false);

	let selected_solve: Solve | null = $state(null);
	let is_dialog_open: boolean = $state(false);

	$effect(() => {
		const cube = current_cube;
		if (!is_mounted) {
			return;
		}

		localStorage.setItem(CUBE_STORAGE_KEY, cube);
		untrack(() => {
			if (!is_locked && !is_editing) {
				current_scramble = 'Generating...';
				generate_scramble(cube).then((scramble) => {
					current_scramble = scramble;
				});
			}
		});
	});

	function handle_keydown(e: KeyboardEvent) {
		if (e.code !== 'Space' && e.code !== 'Escape') return;
		if (document.activeElement?.tagName === 'INPUT') return;

		if (e.code === 'Escape') {
			if (timer_state !== 'idle') {
				cancel_timer();
			}
			return;
		}

		e.preventDefault();
		if (e.repeat) return;

		if (timer_state === 'idle') {
			timer_state = 'pressing';
			hold_timeout = setTimeout(() => {
				timer_state = 'ready';
			}, HOLD_DELAY);
		} else if (timer_state === 'running') {
			stop_timer();
		}
	}

	function handle_keyup(e: KeyboardEvent) {
		if (e.code !== 'Space') return;
		if (document.activeElement?.tagName === 'INPUT') return;

		if (timer_state === 'pressing') {
			clearTimeout(hold_timeout);
			timer_state = 'idle';
		} else if (timer_state === 'ready') {
			timer_state = 'running';
			start_timestamp = performance.now();
			current_time_ms = 0;
			running_interval = setInterval(() => {
				current_time_ms = performance.now() - start_timestamp;
			}, 10);
		}
	}

	function cancel_timer() {
		clearInterval(running_interval);
		clearTimeout(hold_timeout);

		timer_state = 'idle';
		current_time_ms = 0;

		get_new_scramble();
	}

	function stop_timer() {
		clearInterval(running_interval);
		timer_state = 'idle';

		const final_time = performance.now() - start_timestamp;
		current_time_ms = final_time;

		solve_manager.add_solve(final_time, current_cube, current_scramble);

		get_new_scramble();
	}

	function format_timer_display(ms: number): string {
		return (ms / 1000).toFixed(2);
	}

	function get_new_scramble() {
		if (!is_locked) {
			generate_scramble(current_cube).then((scramble) => {
				current_scramble = scramble;
			});
		}
	}

	function format_time(ms: number | null, decimals: number = 2): string {
		if (ms === null || isNaN(ms)) return '--';

		const total_seconds = ms / 1000;
		if (total_seconds < 60) {
			return total_seconds.toFixed(decimals);
		}

		const minutes = Math.floor(total_seconds / 60);
		const seconds = total_seconds % 60;

		const formatted_seconds =
			seconds < 10 ? `0${seconds.toFixed(decimals)}` : seconds.toFixed(decimals);

		return `${minutes}:${formatted_seconds}`;
	}

	function get_stat(stat: string): string {
		if (stat === 'pb') {
			return format_time(solve_manager.get_best_time(current_cube));
		} else if (stat === 'worst') {
			return format_time(solve_manager.get_worst_time(current_cube));
		} else if (stat === 'average') {
			return format_time(solve_manager.get_average(current_cube));
		} else if (stat === 'ao5') {
			return format_time(solve_manager.get_ao5(current_cube));
		} else if (stat === 'ao12') {
			return format_time(solve_manager.get_ao12(current_cube));
		}
		return '--';
	}

	function open_solve_details(solve: Solve) {
		selected_solve = solve;
		is_dialog_open = true;
	}

	async function copy_scramble() {
		try {
			await navigator.clipboard.writeText(current_scramble);
			is_copied = true;
			setTimeout(() => {
				is_copied = false;
			}, 1500);
		} catch (err) {
			console.error('Failed to copy text: ', err);
		}
	}

	let is_solve_copied: boolean = $state(false);

	async function copy_solve_details() {
		if (!selected_solve) return;
		const text_to_copy = `Cube: ${selected_solve.cube}\nTime: ${selected_solve.dnf ? 'DNF' : format_time(selected_solve.time + (selected_solve.penalty ? 2 : 0), 3)}s\nScramble: ${selected_solve.scramble}`;
		try {
			await navigator.clipboard.writeText(text_to_copy);
			is_solve_copied = true;
			setTimeout(() => {
				is_solve_copied = false;
			}, 1500);
		} catch (err) {
			console.error('Failed to copy text: ', err);
		}
	}

	let current_cube_solves = $derived(
		solve_manager.solves.filter((solve) => solve.cube === current_cube)
	);

	onMount(async () => {
		current_cube = (localStorage.getItem(CUBE_STORAGE_KEY) as CubeType) || '3x3';
		const dark_mode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
		if (dark_mode && dark_mode.matches) {
			document.documentElement.classList.add('dark');
		}
		is_mounted = true;
	});
</script>

{#snippet stats(name: string)}
	<span class="absolute top-2 left-2 text-xs font-medium text-muted-foreground">{name}</span>
	<span class="mt-3 font-mono text-xl font-bold">{get_stat(name.toLowerCase())}</span>
{/snippet}

{#snippet stats1(name: string)}
	<div class="relative flex flex-col items-center justify-center rounded-lg border bg-muted/20 p-2">
		{@render stats(name)}
	</div>
{/snippet}

{#snippet stats2(name: string)}
	<div
		class="relative col-span-2 flex flex-col items-center justify-center rounded-lg border bg-muted/20 p-2"
	>
		{@render stats(name)}
	</div>
{/snippet}

<svelte:window onkeydown={handle_keydown} onkeyup={handle_keyup} />

<div class="relative flex h-screen w-full flex-col overflow-hidden bg-background">
	{#if timer_state === 'idle'}
		<div class="absolute top-6 left-6 z-10">
			<Select.Root type="single" bind:value={current_cube}>
				<Select.Trigger class="w-[150px] bg-background/50 backdrop-blur-sm">
					{current_cube}
				</Select.Trigger>
				<Select.Content>
					<Select.Group>
						<Select.Item value="2x2">2x2 Cube</Select.Item>
						<Select.Item value="3x3">3x3 Cube</Select.Item>
					</Select.Group>
				</Select.Content>
			</Select.Root>
		</div>
	{/if}

	<main class="flex flex-1 flex-col items-center justify-center p-6">
		{#if timer_state !== 'running'}
			<div class="mb-12 flex w-full flex-col items-center gap-4">
				{#if is_editing}
					<!-- svelte-ignore a11y_autofocus -->
					<input
						type="text"
						bind:value={current_scramble}
						style="width: {current_scramble.length > 0 ? current_scramble.length + 3 : 25}ch;"
						class="max-w-full border-b-2 border-primary bg-transparent py-1 text-center font-mono text-xl font-medium tracking-wide outline-none focus:border-primary"
						placeholder="Enter custom scramble..."
						autofocus
					/>
				{:else}
					<p class="max-w-3xl text-center font-mono text-xl font-medium tracking-wide">
						{current_scramble}
					</p>
				{/if}

				<div class="flex items-center gap-2">
					<Button
						variant="ghost"
						size="icon"
						class="text-muted-foreground"
						onclick={get_new_scramble}
						disabled={is_locked || is_editing}
						title="New Scramble"
					>
						<RefreshCw class="h-4 w-4" />
					</Button>

					<Button
						variant={is_locked ? 'secondary' : 'ghost'}
						size="icon"
						class={is_locked ? 'text-primary' : 'text-muted-foreground'}
						onclick={() => (is_locked = !is_locked)}
						title={is_locked ? 'Unlock Scramble' : 'Lock Scramble'}
					>
						{#if is_locked}
							<Lock class="h-4 w-4" />
						{:else}
							<LockOpen class="h-4 w-4" />
						{/if}
					</Button>

					<Button
						variant={is_editing ? 'secondary' : 'ghost'}
						size="icon"
						class={is_editing ? 'text-primary' : 'text-muted-foreground'}
						onclick={() => (is_editing = !is_editing)}
						title={is_editing ? 'Save Scramble' : 'Edit Scramble'}
					>
						{#if is_editing}
							<Check class="h-4 w-4" />
						{:else}
							<Pencil class="h-4 w-4" />
						{/if}
					</Button>

					<Button
						variant="ghost"
						size="icon"
						class={is_copied ? 'text-green-500' : 'text-muted-foreground'}
						onclick={copy_scramble}
						title="Copy Scramble"
					>
						{#if is_copied}
							<CheckCheck class="h-4 w-4" />
						{:else}
							<Copy class="h-4 w-4" />
						{/if}
					</Button>
				</div>
			</div>
		{/if}

		<div
			class="flex flex-col items-center justify-center {timer_state === 'idle'
				? 'opacity-50'
				: 'opacity-100'} transition-opacity"
		>
			<h1
				class="font-mono text-8xl tracking-tighter transition-colors
          {timer_state === 'pressing' ? 'text-yellow-500' : ''}
          {timer_state === 'ready' ? 'text-green-500' : ''}
        "
			>
				{format_timer_display(current_time_ms)}
			</h1>
		</div>
	</main>

	{#if timer_state !== 'running'}
		<div class="grid grid-cols-1 gap-6 p-6 md:grid-cols-3">
			<Card.Root class="flex h-76 flex-col shadow-none">
				<Card.Header>
					<Card.Title class="flex items-center gap-2 text-lg">
						<Trophy class="h-5 w-5 text-yellow-500" />
						Recent Solves
					</Card.Title>
				</Card.Header>
				<Card.Content class="flex-1 overflow-y-auto pr-2">
					{#if current_cube_solves.length === 0}
						<p class="py-8 text-center text-muted-foreground">No solves yet.</p>
					{:else}
						<Table.Root>
							<Table.Body>
								{#each current_cube_solves as solve, i}
									<Table.Row
										class="cursor-pointer hover:bg-muted/50"
										onclick={() => open_solve_details(solve)}
									>
										<Table.Cell class="w-8 font-medium text-muted-foreground">
											{current_cube_solves.length - i}.
										</Table.Cell>

										<Table.Cell
											class="font-mono text-base font-bold {solve.dnf
												? 'text-destructive'
												: ''} {solve.penalty ? 'text-yellow-600 dark:text-yellow-500' : ''}"
										>
											{#if solve.dnf}
												DNF
											{:else}
												{format_time(solve.time + (solve.penalty ? 2000 : 0))}{solve.penalty
													? '+'
													: ''}
											{/if}
										</Table.Cell>

										<Table.Cell class="flex justify-end gap-1 text-right">
											<Button
												variant={solve.penalty ? 'secondary' : 'ghost'}
												size="sm"
												class="h-8 px-2 text-xs text-muted-foreground {solve.penalty
													? 'text-yellow-600 dark:text-yellow-500'
													: ''}"
												onclick={(e) => {
													e.stopPropagation();
													solve_manager.toggle_penalty(solve.id);
												}}
											>
												+2
											</Button>

											<Button
												variant={solve.dnf ? 'secondary' : 'ghost'}
												size="sm"
												class="h-8 px-2 text-xs text-muted-foreground {solve.dnf
													? 'text-destructive'
													: ''}"
												onclick={(e) => {
													e.stopPropagation();
													solve_manager.toggle_dnf(solve.id);
												}}
											>
												DNF
											</Button>

											<Button
												variant="ghost"
												size="icon"
												class="h-8 w-8 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
												onclick={(e) => {
													e.stopPropagation();
													solve_manager.delete_solve(solve.id);
												}}
											>
												<Trash2 class="h-4 w-4" />
											</Button>
										</Table.Cell>
									</Table.Row>
								{/each}
							</Table.Body>
						</Table.Root>
					{/if}
				</Card.Content>
			</Card.Root>

			<Card.Root class="flex h-76 flex-col shadow-none">
				<Card.Header>
					<Card.Title class="flex items-center gap-2 text-lg">
						<ChartNoAxesColumn class="h-5 w-5 text-blue-500" />
						Statistics
					</Card.Title>
				</Card.Header>
				<Card.Content class="grid flex-1 grid-cols-2 gap-3 pb-4">
					{@render stats1('PB')}
					{@render stats1('Worst')}
					{@render stats1('Average')}
					{@render stats1('Ao5')}
					{@render stats2('Ao12')}
				</Card.Content>
			</Card.Root>

			<Card.Root class="flex h-76 flex-col shadow-none">
				<Card.Header>
					<Card.Title class="flex items-center gap-2 text-lg">
						<Cuboid class="h-5 w-5 text-emerald-500" />
						Preview
					</Card.Title>
				</Card.Header>
				<Card.Content class="mx-4 mb-4 flex flex-1 items-center justify-center overflow-hidden">
					<twisty-player
						puzzle={current_cube === '3x3' ? '3x3x3' : '2x2x2'}
						alg={current_scramble}
						visualization="2D"
						control-panel="none"
						background="none"
						class="pointer-events-none h-full max-h-48 w-full"
					></twisty-player>
				</Card.Content>
			</Card.Root>
		</div>
	{/if}

	<Dialog.Root bind:open={is_dialog_open}>
		<Dialog.Content class="border-none p-6 shadow-xl sm:max-w-[400px]">
			<Dialog.Title class="sr-only">Solve Details</Dialog.Title>

			{#if selected_solve}
				<div class="flex flex-col gap-6">
					<div class="flex flex-col items-center justify-center">
						<span class="text-xs font-medium tracking-wider text-muted-foreground uppercase">
							{selected_solve.cube} Solve
						</span>
						<span
							class="mt-1 font-mono text-6xl font-bold tracking-tighter {selected_solve.dnf
								? 'text-destructive'
								: ''} {selected_solve.penalty ? 'text-yellow-600 dark:text-yellow-500' : ''}"
						>
							{#if selected_solve.dnf}
								DNF
							{:else}
								{format_time(
									selected_solve.time + (selected_solve.penalty ? 2000 : 0)
								)}{selected_solve.penalty ? '+' : ''}
							{/if}
						</span>
						<span class="text-xs text-muted-foreground">
							{new Date(selected_solve.timestamp).toLocaleDateString()} at {new Date(
								selected_solve.timestamp
							).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
						</span>
					</div>

					<div class="mt-2 flex flex-col gap-2">
						<span class="ml-1 text-xs font-medium text-muted-foreground">Scramble</span>
						<div
							class="rounded-md bg-muted/50 p-2 text-center font-mono text-sm leading-relaxed tracking-wide"
						>
							{selected_solve.scramble}
						</div>
					</div>

					<div class="flex items-center gap-3 pt-2">
						<Button variant="secondary" class="flex-1" onclick={copy_solve_details}>
							{#if is_solve_copied}
								<CheckCheck class="mr-2 h-4 w-4 text-green-500" />
								<span class="text-green-500">Copied!</span>
							{:else}
								<Copy class="mr-2 h-4 w-4" />
								Copy
							{/if}
						</Button>
						<Button variant="outline" class="flex-1" onclick={() => (is_dialog_open = false)}>
							Close
						</Button>
					</div>
				</div>
			{/if}
		</Dialog.Content>
	</Dialog.Root>
</div>
