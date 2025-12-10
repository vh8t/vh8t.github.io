<script lang="ts">
	import { cn } from '$lib/utils';

	import { ArrowRight, ArrowLeft } from '@lucide/svelte';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as ButtonGroup from '$lib/components/ui/button-group';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';

	import type { Block } from '$lib/types';
	import { levels } from '$lib/levels';

	const UNIT = 80;
	const GAP = 8;

	let reset = $state(false);

	class GameStore {
		public levelId = $state(0);
		blocks = $state<Block[]>([]);

		constructor() {
			this.loadLevel(0);
		}

		loadLevel(id: number) {
			if (id < 0 || id >= levels.length) return;
			this.levelId = id;
			this.blocks = JSON.parse(JSON.stringify(levels[id]));
		}

		nextLevel() {
			if (this.levelId + 1 >= levels.length) return;
			this.loadLevel(this.levelId + 1);
		}

		prevLevel() {
			if (this.levelId - 1 < 0) return;
			this.loadLevel(this.levelId - 1);
		}

		reset() {
			this.loadLevel(this.levelId);
		}

		isSolved = $derived.by(() => {
			const hero = this.blocks.find((b) => b.type === 'hero');
			return hero ? hero.x === 1 && hero.y === 3 : false;
		});

		getMoveLimits(id: string) {
			const block = this.blocks.find((b) => b.id === id);
			if (!block) return { minX: 0, maxX: 0, minY: 0, maxY: 0 };

			let left = 0;
			while (this.canMove(block, -(left + 1), 0)) left++;
			let right = 0;
			while (this.canMove(block, right + 1, 0)) right++;
			let up = 0;
			while (this.canMove(block, 0, -(up + 1))) up++;
			let down = 0;
			while (this.canMove(block, 0, down + 1)) down++;

			return {
				minX: -left * UNIT,
				maxX: right * UNIT,
				minY: -up * UNIT,
				maxY: down * UNIT
			};
		}

		move(id: string, dx: number, dy: number) {
			const index = this.blocks.findIndex((b) => b.id === id);
			if (index === -1) return;
			this.blocks[index].x += dx;
			this.blocks[index].y += dy;
		}

		public canMove(block: Block, dx: number, dy: number): boolean {
			const newX = block.x + dx;
			const newY = block.y + dy;

			if (newX < 0 || newX + block.w > 4) return false;
			if (newY < 0 || newY + block.h > 5) return false;

			const others = this.blocks.filter((b) => b.id !== block.id);
			for (const other of others) {
				const isOverlapping =
					newX < other.x + other.w &&
					newX + block.w > other.x &&
					newY < other.y + other.h &&
					newY + block.h > other.y;
				if (isOverlapping) return false;
			}
			return true;
		}
	}

	const game = new GameStore();

	let dragState = $state({
		activeId: null as string | null,
		startX: 0,
		startY: 0,
		currentDeltaX: 0,
		currentDeltaY: 0,
		limits: { minX: 0, maxX: 0, minY: 0, maxY: 0 }
	});

	function handlePointerDown(e: PointerEvent, id: string) {
		const limits = game.getMoveLimits(id);
		if (limits.minX === 0 && limits.maxX === 0 && limits.minY === 0 && limits.maxY === 0) {
			return;
		}

		dragState = {
			activeId: id,
			startX: e.clientX,
			startY: e.clientY,
			currentDeltaX: 0,
			currentDeltaY: 0,
			limits
		};

		(e.target as Element).setPointerCapture(e.pointerId);
	}

	function handlePointerMove(e: PointerEvent) {
		if (!dragState.activeId) return;

		const rawDx = e.clientX - dragState.startX;
		const rawDy = e.clientY - dragState.startY;

		const isHorizontal = Math.abs(rawDx) > Math.abs(rawDy);

		if (isHorizontal) {
			dragState.currentDeltaX = Math.max(
				dragState.limits.minX,
				Math.min(rawDx, dragState.limits.maxX)
			);
			dragState.currentDeltaY = 0;
		} else {
			dragState.currentDeltaX = 0;
			dragState.currentDeltaY = Math.max(
				dragState.limits.minY,
				Math.min(rawDy, dragState.limits.maxY)
			);
		}
	}

	function handlePointerUp(e: PointerEvent) {
		if (!dragState.activeId) return;

		const stepsX = Math.round(dragState.currentDeltaX / UNIT);
		const stepsY = Math.round(dragState.currentDeltaY / UNIT);

		if (stepsX !== 0 || stepsY !== 0) {
			game.move(dragState.activeId, stepsX, stepsY);
		}

		if (e.target instanceof Element) {
			try {
				(e.target as Element).releasePointerCapture(e.pointerId);
			} catch {}
		}

		dragState.activeId = null;
		dragState.currentDeltaX = 0;
		dragState.currentDeltaY = 0;
	}
</script>

<svelte:window onpointermove={handlePointerMove} onpointerup={handlePointerUp} />

<div
	class="flex min-h-screen touch-none flex-col items-center justify-center gap-8 p-4 select-none"
>
	<div class="space-y-2 text-center">
		<h1 class="text-3xl font-bold tracking-tight">Klotski</h1>
		<p class="text-muted-foreground">
			Slide the <span class="font-semibold text-primary">White Block</span> to the exit.
		</p>
	</div>

	<div
		class="relative box-content border-4 border-muted bg-muted shadow-inner"
		style="
      width: {4 * UNIT - GAP}px; 
      height: {5 * UNIT - GAP}px;
      border-radius: {GAP * 2.5}px;
      padding: {GAP}px;
    "
	>
		<div
			class="absolute flex items-center justify-center border-4 border-dashed border-primary/20 bg-primary/5 select-none"
			style="
        transform: translate({1 * UNIT - 3}px, {3 * UNIT - 3}px);
        width: {2 * UNIT - GAP + 6}px;
        height: {2 * UNIT - GAP + 6}px;
        border-radius: {GAP * 2.5 - GAP + 3}px;
      "
		>
			<span class="text-xs font-bold tracking-[0.2em] text-primary/30 uppercase">Exit</span>
		</div>
		{#each game.blocks as block (block.id)}
			{@const isDragging = dragState.activeId === block.id}

			<button
				onpointerdown={(e) => handlePointerDown(e, block.id)}
				class={cn(
					'absolute focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
					isDragging
						? 'z-50 cursor-grabbing transition-none'
						: 'z-10 cursor-grab transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]'
				)}
				style="
          left: 0; top: 0;
          
          transform: translate(
              {block.x * UNIT + GAP + (isDragging ? dragState.currentDeltaX : 0)}px, 
              {block.y * UNIT + GAP + (isDragging ? dragState.currentDeltaY : 0)}px
          );
          
          width: {block.w * UNIT - GAP}px;
          height: {block.h * UNIT - GAP}px;
          border-radius: {GAP * 2.5 - GAP}px;
          
          touch-action: none; 
        "
				aria-label={`Move ${block.type}`}
			>
				<Card.Root
					class={cn(
						'pointer-events-none flex h-full w-full items-center justify-center shadow-sm',
						block.type === 'hero'
							? 'border-primary bg-primary text-primary-foreground'
							: block.type === 'soldier'
								? 'bg-secondary text-secondary-foreground'
								: 'bg-card text-card-foreground hover:bg-accent'
					)}
				>
					{#if block.type === 'hero'}
						<div class="flex flex-col items-center">
							<span class="text-2xl">👑</span>
						</div>
					{:else if block.type === 'soldier'}
						<div class="h-3 w-3 rounded-full bg-current opacity-20"></div>
					{:else if block.type === 'horizontal'}
						<div class="h-1 w-8 rounded-full bg-foreground/10"></div>
					{:else}
						<div class="h-8 w-1 rounded-full bg-foreground/10"></div>
					{/if}
				</Card.Root>
			</button>
		{/each}

		{#if game.isSolved}
			<div
				class="absolute inset-0 z-50 flex items-center justify-center rounded-lg bg-background/80 backdrop-blur-sm"
			>
				<div class="animate-in text-center duration-300 fade-in zoom-in">
					<h2 class="mb-4 text-4xl font-bold text-primary">Solved!</h2>
					<Button onclick={() => game.reset()}>Play Again</Button>
				</div>
			</div>
		{/if}
	</div>

	<div class="mt-[-20px] mb-4 h-2 w-[160px] rounded-full bg-primary/20" aria-hidden="true"></div>

	<ButtonGroup.Root>
		<Button variant="outline" onclick={() => game.prevLevel()}><ArrowLeft /></Button>
		<Button variant="outline" disabled>Level: {game.levelId + 1}</Button>
		<Button variant="outline" onclick={() => game.nextLevel()}><ArrowRight /></Button>
		<AlertDialog.Root bind:open={reset}>
			<AlertDialog.Trigger class={buttonVariants({ variant: 'outline' })}>
				Reset
			</AlertDialog.Trigger>
			<AlertDialog.Content>
				<AlertDialog.Header>
					<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
					<AlertDialog.Description>This action cannot be undone.</AlertDialog.Description>
				</AlertDialog.Header>
				<AlertDialog.Footer>
					<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
					<AlertDialog.Action
						onclick={() => {
							reset = false;
							game.reset();
						}}>Continue</AlertDialog.Action
					>
				</AlertDialog.Footer>
			</AlertDialog.Content>
		</AlertDialog.Root>
	</ButtonGroup.Root>
</div>
