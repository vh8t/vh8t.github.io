<script lang="ts">
	import TCGdex, { Query, type CardResume, type Card as SDKCard } from '@tcgdex/sdk';

	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Toaster } from '$lib/components/ui/sonner';
	import * as Card from '$lib/components/ui/card';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Select from '$lib/components/ui/select';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';

	import type { Filter, CardVariant, CardCondition, UserCollection, Tab } from '$lib/types';
	import { loadCollection, saveCollection, addToCollection } from '$lib/storage.svelte';

	import {
		MagnifyingGlassIcon,
		HouseIcon,
		BriefcaseIcon,
		UserIcon,
		ImageSquareIcon,
		TrashIcon,
		MinusIcon,
		CircleNotchIcon,
		DownloadSimpleIcon,
		UploadSimpleIcon,
		CardsIcon,
		VaultIcon,
		TrophyIcon
	} from 'phosphor-svelte';

	import { toast } from 'svelte-sonner';
	import { onMount } from 'svelte';
	import { SvelteMap } from 'svelte/reactivity';

	const tcgdex = new TCGdex('en');

	let query = $state('');
	let cards = $state<CardResume[]>([]);
	let activeTab = $state<Tab>('home');
	let brokenImages = $state(new Set<string>());
	let collection = $state<UserCollection>({});
	let isLoaded = $state(false);
	let portfolio = $state<SDKCard[]>([]);
	let isModalOpen = $state(false);
	let selectedCard = $state<CardResume | null>(null);
	let selectedVariant = $state<CardVariant>('normal');
	let selectedCondition = $state<CardCondition>('NM');
	let searchFilter = $state<Filter>('name');
	let isSearching = $state(false);
	let hasSearched = $state(false);
	let showWipeAlert = $state(false);
	let fullSelectedCard = $state<SDKCard | null>(null);
	let isLoadingModalData = $state(false);
	let previewCard = $state<SDKCard | null>(null);
	let isPreviewOpen = $state(false);

	const modalDisplayPrice = $derived.by(() => {
		if (!fullSelectedCard) return 0;
		return getPriceValue(fullSelectedCard, selectedVariant, selectedCondition);
	});

	const totalValue = $derived.by(() => {
		return portfolio.reduce((sum, card) => {
			const instances = collection[card.id] || [];
			const cardVal = instances.reduce((s, i) => {
				const price = getPriceValue(card, i.v, i.c);
				return s + price * i.q;
			}, 0);
			return sum + cardVal;
		}, 0);
	});

	const topCards = $derived.by(() => {
		return portfolio
			.map((card) => {
				const instances = collection[card.id] || [];
				const prices = instances.map((i) => getPriceValue(card, i.v, i.c));
				const bestPrice = prices.length > 0 ? Math.max(...prices) : 0;
				return { ...card, bestPrice };
			})
			.filter((c) => c.bestPrice > 0)
			.sort((a, b) => b.bestPrice - a.bestPrice)
			.slice(0, 5);
	});

	let lastHash = 0;

	const getPriceValue = (card: SDKCard, variant: string, condition: string) => {
		// @ts-expect-error the API returns pricing but was not updated properly in the types
		const pricing = card.pricing?.cardmarket;
		if (!pricing) return 0;

		const isHolo = variant === 'holo' || variant === 'reverse';
		const holoTrend = pricing['trend-holo'] || pricing['avg-holo'] || 0;
		const generalTrend = pricing.trend || pricing.avg || 0;

		let base = generalTrend;
		if (isHolo) {
			base = holoTrend > generalTrend * 0.8 ? holoTrend : generalTrend;
		}

		const multipliers: Record<string, number> = {
			NM: 1,
			LP: 0.85,
			MP: 0.7,
			HP: 0.5,
			DM: 0.25
		};

		return base * (multipliers[condition] || 1);
	};

	const variantToString = (variant: CardVariant): string => {
		if (variant === 'normal') return 'Normal';
		if (variant === 'holo') return 'Holofoil';
		if (variant === 'reverse') return 'Reverse Holofoil';
		if (variant === 'first-edition') return '1st Edition';
		return '???';
	};

	const conditionToString = (condition: CardCondition): string => {
		if (condition === 'NM') return 'Near Mint (NM)';
		if (condition === 'LP') return 'Lightly Played (LP)';
		if (condition === 'MP') return 'Moderately Played (MP)';
		if (condition === 'HP') return 'Heavily Played (HP)';
		if (condition === 'DM') return 'Damaged (DM)';
		return '';
	};

	const exportData = () => {
		const dataStr = JSON.stringify($state.snapshot(collection), null, 2);
		const blob = new Blob([dataStr], { type: 'application/json' });
		const url = URL.createObjectURL(blob);

		const a = document.createElement('a');
		a.href = url;
		a.download = `pokefolio-backup-${new Date().toISOString().split('T')[0]}.json`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};

	const importData = (event: Event) => {
		const input = event.target as HTMLInputElement;
		if (!input.files?.length) return;

		const file = input.files[0];
		const reader = new FileReader();

		reader.onload = (e) => {
			try {
				const imported = JSON.parse(e.target?.result as string);
				if (typeof imported === 'object' && imported !== null) {
					collection = imported;
					toast.success('Collection restored successfully!');
				}
			} catch {
				toast.error('Failed to parse backup file. Please ensure it is a valid PokeFolio JSON.');
			}

			input.value = '';
		};
		reader.readAsText(file);
	};

	const wipeData = () => {
		collection = {};
		portfolio = [];
		toast.success('Database completely wiped.');
		showWipeAlert = false;
	};

	const generateHash = (ids: string[]) => {
		const str = ids.sort().join('|');
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
			const char = str.charCodeAt(i);
			hash = (hash << 5) - hash + char;
			hash |= 0;
		}
		return hash;
	};

	const removeCardInstance = (cardId: string, variant: CardVariant, condition: CardCondition) => {
		if (!collection[cardId]) {
			return;
		}

		const index = collection[cardId].findIndex((i) => i.v === variant && i.c === condition);
		if (index != -1) {
			if (collection[cardId][index].q > 1) {
				collection[cardId][index].q--;
			} else {
				collection[cardId].splice(index, 1);
			}

			if (collection[cardId].length === 0) {
				delete collection[cardId];
				portfolio = portfolio.filter((c) => c.id !== cardId);
			}
		}
	};

	const openPreview = (card: SDKCard) => {
		previewCard = card;
		isPreviewOpen = true;
	};

	const openAddModal = async (card: CardResume) => {
		selectedCard = card;
		fullSelectedCard = null;
		selectedVariant = 'normal';
		selectedCondition = 'NM';
		isModalOpen = true;

		isLoadingModalData = true;
		try {
			fullSelectedCard = await tcgdex.card.get(card.id);
		} catch (error) {
			console.error('Failed to fetch full card data:', error);
		} finally {
			isLoadingModalData = false;
		}
	};

	const confirmAddCard = () => {
		if (!selectedCard) {
			return;
		}

		addToCollection(collection, selectedCard.id, selectedVariant, selectedCondition);

		isModalOpen = false;
		selectedCard = null;
	};

	const loadPortfolio = async () => {
		const ownedIds = Object.keys(collection);

		if (ownedIds.length === 0) {
			portfolio = [];
			lastHash = 0;
			return;
		}

		const currentHash = generateHash(ownedIds);
		if (currentHash === lastHash) {
			return;
		}

		const promises = ownedIds.map((id) => tcgdex.card.get(id));
		const results = await Promise.all(promises);

		portfolio = results.filter((c) => !!c);
	};

	const getCards = async () => {
		if (!query) return;

		isSearching = true;

		try {
			let q = Query.create();
			if (searchFilter === 'name') {
				q.contains('name', query);
			} else if (searchFilter === 'id') {
				q.contains('localId', query);
			} else if (searchFilter === 'illustrator') {
				q.contains('illustrator', query);
			}

			const rawResults = await tcgdex.card.list(q);

			const uniqueCards = new SvelteMap<string, CardResume>();
			for (const card of rawResults) {
				if (!uniqueCards.has(card.id)) {
					uniqueCards.set(card.id, card);
				}
			}

			cards = Array.from(uniqueCards.values());
			brokenImages.clear();
			hasSearched = true;
		} catch (error) {
			console.error('Search failed:', error);
		} finally {
			isSearching = false;
		}
	};

	$effect(() => {
		const ids = Object.keys(collection);

		if (ids.length === 0) {
			if (portfolio.length > 0) portfolio = [];
			return;
		}

		const sync = async () => {
			const existingIds = portfolio.map((p) => p.id);
			const missingIds = ids.filter((id) => !existingIds.includes(id));

			if (missingIds.length > 0) {
				const newCards = await Promise.all(missingIds.map((id) => tcgdex.card.get(id)));
				portfolio = [...portfolio, ...newCards.filter((c) => !!c)];
			}

			if (portfolio.length !== ids.length) {
				portfolio = portfolio.filter((p) => ids.includes(p.id));
			}
		};

		sync();
	});

	$effect(() => {
		if (activeTab === 'portfolio' && isLoaded) {
			loadPortfolio();
		}
	});

	$effect(() => {
		if (isLoaded) {
			saveCollection(collection);
		}
	});

	onMount(() => {
		const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
		if (darkModeQuery.matches) {
			document.documentElement.classList.add('dark');
		}

		const handler = (e: MediaQueryListEvent) =>
			document.documentElement.classList.toggle('dark', e.matches);
		darkModeQuery.addEventListener('change', handler);

		loadCollection().then((data) => {
			collection = data;
			isLoaded = true;
		});

		return () => darkModeQuery.removeEventListener('change', handler);
	});
</script>

<div class="flex min-h-screen flex-col bg-background pb-20 text-foreground">
	<Toaster />

	<header class="sticky top-0 z-10 border-b bg-background/95 px-4 py-3 backdrop-blur">
		<h1 class="text-xl font-bold tracking-tight">PokeFolio</h1>
	</header>

	<main class="flex-1 p-4">
		{#if activeTab === 'search'}
			<div class="space-y-4">
				<div class="flex gap-2">
					<Select.Root type="single" bind:value={searchFilter}>
						<Select.Trigger class="w-110px">
							{searchFilter}
						</Select.Trigger>
						<Select.Content>
							<Select.Item value="name">Name</Select.Item>
							<Select.Item value="id">Card #</Select.Item>
							<Select.Item value="illustrator">Artist</Select.Item>
						</Select.Content>
					</Select.Root>

					<Input
						type="text"
						placeholder="Search cards (e.g. Charizard)..."
						bind:value={query}
						onkeydown={(e) => e.key === 'Enter' && getCards()}
					/>

					<Button variant="default" size="icon" onclick={getCards}>
						<MagnifyingGlassIcon size={20} />
					</Button>
				</div>

				<div class="mt-4">
					{#if isSearching}
						<div
							class="flex h-64 flex-col items-center justify-center text-center text-muted-foreground"
						>
							<CircleNotchIcon size={40} class="mb-4 animate-spin text-primary opacity-40" />
							<p class="text-sm font-medium">Scanning database...</p>
						</div>
					{:else if hasSearched && cards.length === 0}
						<div
							class="flex h-64 flex-col items-center justify-center border border-dashed border-muted-foreground/20 bg-muted/30 text-center text-muted-foreground"
						>
							<MagnifyingGlassIcon size={48} weight="thin" class="mb-3 text-primary opacity-30" />
							<p class="font-semibold text-foreground">No matches found</p>
							<p class="max-w-200px mt-1 text-xs opacity-75">
								We couldn't find any cards matching "{query}". Try adjusting your filters.
							</p>
						</div>
					{:else if cards.length > 0}
						<div class="grid grid-cols-2 gap-3">
							{#each cards as card (card.id)}
								<Card.Root
									class="overflow-hidden border-none bg-secondary/50 p-0"
									onclick={() => openAddModal(card)}
									role="button"
									tabindex={0}
								>
									<Card.Content class="p-0">
										<div
											class="relative flex aspect-2.5/3.5 w-full items-center justify-center overflow-hidden bg-muted"
										>
											{#if !brokenImages.has(card.id) && card.image}
												<img
													src="{card.image}/low.webp"
													alt={card.name}
													class="h-full w-full object-contain"
													loading="lazy"
													onerror={() => brokenImages.add(card.id)}
												/>
											{:else}
												<div
													class="flex h-full w-full flex-col items-center justify-center border-2 border-dashed border-muted-foreground/10 p-4 text-center text-muted-foreground/30"
												>
													<ImageSquareIcon size={32} weight="thin" />
													<span class="mt-2 text-[10px] font-bold tracking-tight uppercase">
														No Image
													</span>
												</div>
											{/if}
										</div>
										<div class="p-2">
											<p class="truncate text-xs font-medium">{card.name}</p>
											<p class="text-[10px] text-muted-foreground uppercase">ID: {card.id}</p>
										</div>
									</Card.Content>
								</Card.Root>
							{/each}
						</div>
					{:else}
						<div
							class="flex h-64 flex-col items-center justify-center text-center text-muted-foreground/50"
						>
							<MagnifyingGlassIcon size={56} weight="thin" class="mb-4 opacity-20" />
							<h3 class="text-base font-medium text-foreground/70">Start your search</h3>
							<p class="mt-1 px-8 text-xs">
								Find cards by name, artist, or local ID to add them to your portfolio.
							</p>
						</div>
					{/if}
				</div>
			</div>
		{:else if activeTab === 'portfolio'}
			<div class="space-y-4">
				<div class="flex items-center justify-between">
					<h2 class="text-lg font-semibold">My Collection</h2>
					<span class="text-sm text-muted-foreground">
						{Object.values(collection)
							.flat()
							.reduce((acc, curr) => acc + curr.q, 0)} Cards
					</span>
				</div>

				{#if portfolio.length === 0}
					<div class="flex h-64 flex-col items-center justify-center text-center">
						<BriefcaseIcon size={48} weight="thin" class="mb-2 opacity-20" />
						<p class="text-muted-foreground">No cards found in your database.</p>
					</div>
				{:else}
					<div class="grid grid-cols-2 gap-3">
						{#each portfolio as card (card.id)}
							{@const instances = collection[card.id] || []}
							{@const totalQty = instances.reduce((sum, i) => sum + i.q, 0)}
							{@const cardTotalValue = instances.reduce(
								(sum, inst) => sum + getPriceValue(card, inst.v, inst.c) * inst.q,
								0
							)}

							{@const conditionColors = {
								NM: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
								LP: 'border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-400',
								MP: 'border-yellow-500/30 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400',
								HP: 'border-orange-500/30 bg-orange-500/10 text-orange-700 dark:text-orange-400',
								DM: 'border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-400'
							}}

							<Card.Root class="relative overflow-hidden border-none bg-secondary/30 p-0 shadow-sm">
								<Badge
									class="absolute top-2 right-2 z-5 px-1.5 py-0 text-[10px] font-bold shadow-sm"
								>
									x{totalQty}
								</Badge>

								<Card.Content class="p-0">
									<button
										class="relative flex aspect-2.5/3.5 w-full items-center justify-center overflow-hidden bg-muted"
										onclick={() => openPreview(card)}
									>
										{#if !brokenImages.has(card.id) && card.image}
											<img
												src="{card.image}/low.webp"
												alt={card.name}
												class="h-full w-full object-contain drop-shadow-md"
												loading="lazy"
												onerror={() => brokenImages.add(card.id)}
											/>
										{:else}
											<div
												class="flex h-full w-full flex-col items-center justify-center border-2 border-dashed border-muted-foreground/10 p-4 text-center text-muted-foreground/30"
											>
												<ImageSquareIcon size={32} weight="thin" />
												<span class="mt-2 text-[10px] font-bold tracking-tight uppercase">
													No Image
												</span>
											</div>
										{/if}
									</button>

									<div class="flex flex-col gap-2 p-3">
										<div class="flex items-start justify-between gap-2">
											<div class="space-y-0.5 overflow-hidden">
												<p class="truncate text-sm leading-none font-bold">{card.name}</p>
												<p class="truncate text-[10px] font-medium text-muted-foreground">
													{card.set.name}
												</p>
												<p
													class="text-[9px] font-semibold tracking-wider text-muted-foreground/60 uppercase"
												>
													{card.rarity} · {card.localId}
												</p>
											</div>

											{#if cardTotalValue > 0}
												<div class="shrink-0 text-right">
													<p class="text-xs font-bold text-emerald-600 dark:text-emerald-400">
														€{cardTotalValue.toFixed(2)}
													</p>
												</div>
											{/if}
										</div>

										<div class="flex flex-col gap-1.5 border-t border-border/50 pt-1">
											{#each instances as inst (inst)}
												{@const instancePrice = getPriceValue(card, inst.v, inst.c)}
												<div
													class="group flex items-center justify-between bg-background/50 px-1.5 py-1 text-[10px] transition-colors hover:bg-muted/50"
												>
													<div class="flex items-center gap-1.5 overflow-hidden pr-2">
														<span class="truncate font-medium uppercase opacity-75">
															{variantToString(inst.v)}
														</span>
														{#if instancePrice > 0}
															<span class="text-[8.5px] font-medium text-muted-foreground/70">
																(€{instancePrice.toFixed(2)})
															</span>
														{/if}
													</div>

													<div class="flex shrink-0 items-center gap-1.5">
														{#if inst.q > 1}
															<span class="font-bold text-muted-foreground opacity-60">
																x{inst.q}
															</span>
														{/if}

														<Badge
															variant="outline"
															class="h-4 px-1 text-[8px] font-bold tracking-wider
															  {conditionColors[inst.c] || ''}"
														>
															{inst.c}
														</Badge>

														<button
															class="flex h-5 w-5 items-center justify-center text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive active:scale-95"
															onclick={(e) => {
																e.stopPropagation();
																removeCardInstance(card.id, inst.v, inst.c);
															}}
															aria-label="Remove card"
														>
															{#if inst.q > 1}
																<MinusIcon size={12} weight="bold" />
															{:else}
																<TrashIcon size={12} weight="bold" />
															{/if}
														</button>
													</div>
												</div>
											{/each}
										</div>
									</div>
								</Card.Content>
							</Card.Root>
						{/each}
					</div>
				{/if}
			</div>
		{:else if activeTab === 'home'}
			<div class="space-y-6">
				<div>
					<h2 class="text-2xl font-bold tracking-tight">Dashboard</h2>
					<p class="text-sm text-muted-foreground">Snapshot of your local collection.</p>
				</div>

				<div class="grid grid-cols-2 gap-4">
					<Card.Root class="col-span-2 border-none bg-emerald-500/10 shadow-sm">
						<Card.Content class="flex items-center justify-between p-6">
							<div class="space-y-1">
								<p
									class="text-sm font-medium tracking-wider text-emerald-600 uppercase dark:text-emerald-400"
								>
									Estimated Value
								</p>
								<p class="text-4xl font-black text-emerald-700 dark:text-emerald-300">
									€{totalValue.toFixed(2)}
								</p>
							</div>
						</Card.Content>
					</Card.Root>

					<Card.Root class="border-none bg-primary/5 shadow-sm">
						<Card.Content class="flex flex-col gap-1 p-4">
							<CardsIcon size={24} class="mb-2 text-primary" weight="duotone" />
							<p class="text-2xl font-bold">
								{Object.values(collection)
									.flat()
									.reduce((acc, curr) => acc + curr.q, 0)}
							</p>
							<p class="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
								Total Cards
							</p>
						</Card.Content>
					</Card.Root>

					<Card.Root class="border-none bg-secondary/50 shadow-sm">
						<Card.Content class="flex flex-col gap-1 p-4">
							<VaultIcon size={24} class="mb-2 text-muted-foreground" weight="duotone" />
							<p class="text-2xl font-bold">
								{Object.keys(collection).length}
							</p>
							<p class="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
								Unique IDs
							</p>
						</Card.Content>
					</Card.Root>
				</div>

				{#if topCards.length > 0}
					<div class="space-y-4">
						<div class="flex items-center gap-2">
							<TrophyIcon size={20} class="text-yellow-500" weight="fill" />
							<h3 class="text-lg font-bold">Top 5 Value</h3>
						</div>

						<div class="space-y-2">
							{#each topCards as card (card.id)}
								<div class="flex items-center gap-3 border border-border/50 bg-secondary/20 p-2">
									<img src="{card.image}/low.webp" alt="" class="h-12 w-auto object-contain" />
									<div class="min-w-0 flex-1">
										<p class="truncate text-xs font-bold uppercase">{card.name}</p>
										<p class="truncate text-[10px] text-muted-foreground">{card.set.name}</p>
									</div>
									<p
										class="mr-2 font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400"
									>
										€{card.bestPrice.toFixed(2)}
									</p>
								</div>
							{/each}
						</div>
					</div>
				{/if}
			</div>
		{:else if activeTab === 'profile'}
			<div class="space-y-6">
				<div>
					<h2 class="text-2xl font-bold tracking-tight">Data Management</h2>
					<p class="text-sm text-muted-foreground">
						Manage your offline database and collection exports.
					</p>
				</div>

				<div class="space-y-4">
					<Card.Root class="border-none bg-secondary/30 shadow-sm">
						<Card.Header class="pb-3">
							<Card.Title class="text-base">Backup & Restore</Card.Title>
							<Card.Description>
								Export your collection to safeguard it or move it to another device.
							</Card.Description>
						</Card.Header>
						<Card.Content class="space-y-3">
							<Button
								variant="default"
								class="flex w-full gap-2 font-semibold"
								onclick={exportData}
							>
								<DownloadSimpleIcon size={18} weight="bold" />
								Export Collection (.json)
							</Button>

							<div class="relative">
								<Input
									type="file"
									accept=".json"
									onchange={importData}
									class="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
								/>
								<Button
									variant="outline"
									class="flex w-full gap-2 border-border/50 bg-background/50"
								>
									<UploadSimpleIcon size={18} weight="bold" />
									Import Collection
								</Button>
							</div>
						</Card.Content>
					</Card.Root>

					<Card.Root class="border-destructive/20 bg-destructive/5 shadow-sm">
						<Card.Header class="pb-3">
							<Card.Title class="text-base text-destructive">Danger Zone</Card.Title>
							<Card.Description class="text-destructive/80">
								Permanently delete all your saved cards. This action cannot be undone.
							</Card.Description>
						</Card.Header>
						<Card.Content>
							<AlertDialog.Root bind:open={showWipeAlert}>
								<AlertDialog.Trigger>
									{#snippet child({ props })}
										<Button {...props} variant="destructive" class="flex w-full gap-2 font-bold">
											<TrashIcon size={18} weight="bold" />
											Wipe Database
										</Button>
									{/snippet}
								</AlertDialog.Trigger>

								<AlertDialog.Content>
									<AlertDialog.Header>
										<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
										<AlertDialog.Description>
											This action cannot be undone. This will permanently delete your entire local
											collection and clear your storage.
										</AlertDialog.Description>
									</AlertDialog.Header>
									<AlertDialog.Footer>
										<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
										<AlertDialog.Action onclick={wipeData}>Yes, wipe it</AlertDialog.Action>
									</AlertDialog.Footer>
								</AlertDialog.Content>
							</AlertDialog.Root>
						</Card.Content>
					</Card.Root>
				</div>
			</div>
		{/if}
	</main>

	<Dialog.Root bind:open={isModalOpen}>
		<Dialog.Content class="max-w-425px w-[90vw]">
			<Dialog.Header>
				<Dialog.Title>Add to Collection</Dialog.Title>
				<Dialog.Description class="flex items-center gap-2">
					<span class="truncate font-bold text-foreground">{selectedCard?.name}</span>
					{#if fullSelectedCard}
						<span class="text-xs opacity-70">
							{fullSelectedCard.set.name} · {fullSelectedCard.localId}/{fullSelectedCard.set
								.cardCount.official}
						</span>
					{/if}
				</Dialog.Description>
			</Dialog.Header>

			<div class="grid gap-4 py-4">
				<div class="flex items-center justify-between bg-secondary/30 p-3">
					<div class="flex flex-col">
						<span class="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
							Estimated Value
						</span>
						{#if isLoadingModalData}
							<CircleNotchIcon size={16} class="mt-1 animate-spin opacity-40" />
						{:else}
							<span class="text-xl font-black text-emerald-600 dark:text-emerald-400">
								€{modalDisplayPrice.toFixed(2)}
							</span>
						{/if}
					</div>
					{#if fullSelectedCard?.rarity}
						<Badge variant="outline" class="h-fit py-0 text-[10px] uppercase">
							{fullSelectedCard.rarity}
						</Badge>
					{/if}
				</div>

				<div class="flex flex-col gap-2">
					<label for="variant" class="text-sm font-medium">Variant</label>
					<Select.Root type="single" bind:value={selectedVariant}>
						<Select.Trigger id="variant" class="w-full">
							{variantToString(selectedVariant)}
						</Select.Trigger>
						<Select.Content>
							<Select.Item value="normal">Normal</Select.Item>
							<Select.Item value="holo">Holofoil</Select.Item>
							<Select.Item value="reverse">Reverse Holofoil</Select.Item>
							<Select.Item value="first-edition">1st Edition</Select.Item>
						</Select.Content>
					</Select.Root>
				</div>

				<div class="flex flex-col gap-2">
					<label for="condition" class="text-sm font-medium">Condition</label>
					<Select.Root type="single" bind:value={selectedCondition}>
						<Select.Trigger id="condition" class="w-full">
							{conditionToString(selectedCondition)}
						</Select.Trigger>
						<Select.Content>
							<Select.Item value="NM">Near Mint (NM)</Select.Item>
							<Select.Item value="LP">Lightly Played (LP)</Select.Item>
							<Select.Item value="MP">Moderately Played (MP)</Select.Item>
							<Select.Item value="HP">Heavily Played (HP)</Select.Item>
							<Select.Item value="DM">Damaged (DM)</Select.Item>
						</Select.Content>
					</Select.Root>
				</div>
			</div>

			<Dialog.Footer>
				<Button onclick={confirmAddCard} class="w-full font-bold" disabled={isLoadingModalData}>
					{isLoadingModalData ? 'Loading Data...' : 'Add to Collection'}
				</Button>
			</Dialog.Footer>
		</Dialog.Content>
	</Dialog.Root>

	<Dialog.Root bind:open={isPreviewOpen}>
		<Dialog.Content class="sm:max-w-450px max-w-[95vw] overflow-hidden border-none bg-card p-0">
			{#if previewCard}
				<div class="relative aspect-2.5/3.5 w-full bg-muted">
					<img
						src="{previewCard.image}/high.webp"
						alt={previewCard.name}
						class="h-full w-full object-contain"
					/>
				</div>

				<div class="space-y-4 p-6">
					<div class="flex items-center justify-between">
						<div>
							<Dialog.Header class="text-left">
								<Dialog.Title class="text-xl font-bold">{previewCard.name}</Dialog.Title>
								<Dialog.Description class="text-sm font-medium text-primary">
									{previewCard.set.name} · {previewCard.localId}/{previewCard.set.cardCount
										.official}
								</Dialog.Description>
							</Dialog.Header>
						</div>
						<Badge variant="outline" class="font-bold tracking-tighter uppercase">
							{previewCard.rarity}
						</Badge>
					</div>

					<div class="grid grid-cols-2 gap-4 border-y border-border/50 py-4">
						<div class="space-y-1">
							<p class="text-[10px] font-bold text-muted-foreground uppercase">Illustrator</p>
							<p class="text-sm font-medium">{previewCard.illustrator || 'Unknown'}</p>
						</div>
						<div class="space-y-1">
							<p class="text-[10px] font-bold text-muted-foreground uppercase">Category</p>
							<p class="text-sm font-medium">{previewCard.category}</p>
						</div>
					</div>

					<div class="flex items-center justify-between pt-2">
						<div class="flex flex-col">
							<span class="text-[10px] font-bold text-muted-foreground uppercase">
								Market Trend (EU)
							</span>
							<span class="text-lg font-black text-emerald-600 dark:text-emerald-400">
								€{// @ts-expect-error the API returns pricing but was not updated properly in the types
								previewCard.pricing?.cardmarket.trend?.toFixed(2) || '0.00'}
							</span>
						</div>
						<Button variant="outline" size="sm" onclick={() => (isPreviewOpen = false)}>
							Close
						</Button>
					</div>
				</div>
			{/if}
		</Dialog.Content>
	</Dialog.Root>

	<nav
		class="pb-safe fixed right-0 bottom-0 left-0 z-50 border-t bg-background/80 backdrop-blur-lg"
	>
		<div class="grid h-16 grid-cols-4 items-center justify-items-center">
			<Button variant="ghost" size="icon-lg" onclick={() => (activeTab = 'home')}>
				<HouseIcon weight={activeTab === 'home' ? 'fill' : 'regular'} />
			</Button>

			<Button variant="ghost" size="icon-lg" onclick={() => (activeTab = 'search')}>
				<MagnifyingGlassIcon weight={activeTab === 'search' ? 'fill' : 'regular'} />
			</Button>

			<Button variant="ghost" size="icon-lg" onclick={() => (activeTab = 'portfolio')}>
				<BriefcaseIcon weight={activeTab === 'portfolio' ? 'fill' : 'regular'} />
			</Button>

			<Button variant="ghost" size="icon-lg" onclick={() => (activeTab = 'profile')}>
				<UserIcon weight={activeTab === 'profile' ? 'fill' : 'regular'} />
			</Button>
		</div>
	</nav>
</div>
