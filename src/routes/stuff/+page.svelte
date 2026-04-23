<script lang="ts">
	import Footer from '$lib/components/footer.svelte';
	import Header from '$lib/components/header.svelte';

	import { LinkSimpleIcon, CopyIcon, CheckIcon, InfoIcon } from 'phosphor-svelte';

	import { fade } from 'svelte/transition';
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';

	let counter: number = $state(0);
	let show: boolean = $derived(counter >= 5);
	let copiedIndex = $state<number | null>(null);

	let timer: ReturnType<typeof setTimeout> | null = null;

	type Entry = {
		text: string;
		url?: string;
		copyText?: string;
	};

	let stuff: Entry[] = [
		{
			text: 'AJ Prezentace - Vysoke Skoly',
			url: 'https://docs.google.com/presentation/d/1jDIsVeKMQFI2yHZraYj1n7pwvPNP96t_EIwoiNrW0VM/edit?usp=sharing'
		},
		{
			text: 'CJ Prezentace - Brno',
			url: 'https://docs.google.com/presentation/d/1Kcsz0axR2VZ5xry6LVEcuyOww1_vjPOwnTM0iwq6eBY/edit?usp=sharing'
		},
		{
			text: 'CJ Prezentace - Post-Black Metal',
			url: 'https://docs.google.com/presentation/d/1lgSBPHHGT2_1W4AFzsECedYY58DEHS3y2TkKvAovwJA/edit?usp=sharing'
		},
		{
			text: 'OBN Prezentace - Geopolitický spor o Čagoské ostrovy',
			url: 'https://docs.google.com/presentation/d/1_rPkgqpemKPl3HpWCfpB-hPu5ouKI1qaPQGISLkQZQ4/edit?usp=sharing'
		},
		{
			text: 'Win setup',
			copyText:
				'$l = New-WinUserLanguageList "en-US"; $l.add("cs-CZ"); Set-WinUserLanguageList $l -Force; New-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize" -Name "AppsUseLightTheme" -Value 0 -Type DWord -Force; New-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize" -Name "SystemUsesLightTheme" -Value 0 -Type DWord -Force'
		}
	];

	const handleCopy = async (text: string, index: number) => {
		await navigator.clipboard.writeText(text);
		copiedIndex = index;
		setTimeout(() => (copiedIndex = null), 2000);
	};

	const handleInteraction = () => {
		if (timer) {
			clearTimeout(timer);
		}

		counter++;
		if (counter < 5) {
			timer = setTimeout(() => {
				counter = 0;
			}, 2000);
		}
	};

	onMount(() => {
		const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
		if (darkModeQuery.matches) {
			document.documentElement.classList.add('dark');
		}

		const handler = (e: MediaQueryListEvent) =>
			document.documentElement.classList.toggle('dark', e.matches);
		darkModeQuery.addEventListener('change', handler);

		return () => darkModeQuery.removeEventListener('change', handler);
	});
</script>

<div class="flex min-h-screen flex-col bg-background font-sans antialiased">
	<Header />

	<main class="flex grow flex-col items-center justify-center p-6">
		<div class="w-full max-w-2xl">
			{#if show}
				<div in:fade class="flex flex-col border-t-2 border-border">
					{#each stuff as item, i (i)}
						<button
							class="group flex w-full items-center justify-between border-b-2 border-border px-2 py-4 transition-colors hover:bg-muted/50"
							onclick={() => {
								if (item.url) window.open(item.url, '_blank');
								else if (item.copyText) handleCopy(item.copyText, i);
							}}
						>
							<div class="flex flex-col items-start gap-1 overflow-hidden pr-4">
								<span class="text-sm font-bold tracking-tight text-foreground uppercase">
									{item.text}
								</span>
								{#if item.url}
									<span class="truncate font-mono text-xs text-muted-foreground/60">
										{item.url.replace(/^https?:\/\//, '')}
									</span>
								{/if}
							</div>

							<div class="shrink-0 font-mono text-xs font-bold tracking-widest uppercase">
								{#if item.url}
									<div
										class="flex items-center gap-2 text-muted-foreground/40 group-hover:text-primary"
									>
										<span>Visit</span>
										<LinkSimpleIcon size={14} />
									</div>
								{:else if item.copyText}
									<div
										class="flex items-center gap-2 {copiedIndex === i
											? 'text-green-500'
											: 'text-muted-foreground/40 group-hover:text-primary'}"
									>
										<span>{copiedIndex === i ? 'Copied' : 'Copy'}</span>
										{#if copiedIndex === i}
											<CheckIcon size={14} />
										{:else}
											<CopyIcon size={14} />
										{/if}
									</div>
								{:else}
									<div class="flex items-center gap-2 text-muted-foreground/20">
										<span>Info</span>
										<InfoIcon size={14} />
									</div>
								{/if}
							</div>
						</button>
					{/each}
				</div>
			{:else}
				<div class="flex flex-col items-center gap-6">
					<button
						class="font-mono text-lg font-bold tracking-widest text-foreground sm:text-xl"
						onclick={handleInteraction}
					>
						[ ERROR 404: NOT_FOUND ]
					</button>

					<a
						href={resolve('/')}
						class="group flex items-center gap-2 font-mono text-xs tracking-widest text-muted-foreground uppercase transition-colors hover:text-primary"
					>
						<span class="opacity-0 transition-opacity group-hover:opacity-100">&gt;</span>
						return_to_main_menu
					</a>
				</div>
			{/if}
		</div>
	</main>

	<Footer />
</div>
