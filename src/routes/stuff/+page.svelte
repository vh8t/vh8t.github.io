<script lang="ts">
	import SiteFooter from '$lib/components/site-footer.svelte';
	import SiteHeader from '$lib/components/site-header.svelte';

	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { ExternalLink, Copy, Check, Info } from '@lucide/svelte';

	import { fade } from 'svelte/transition';

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
			text: 'OBN Prezentace - Geopolitický spor o Čagoské ostrovy',
			url: 'https://docs.google.com/presentation/d/1_rPkgqpemKPl3HpWCfpB-hPu5ouKI1qaPQGISLkQZQ4/edit?usp=sharing'
		},
		{
			text: 'Win setup',
			copyText:
				'Set-WinUserLanguageList -LanguageList "en-US" -Force; New-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize" -Name "AppsUseLightTheme" -Value 0 -Type DWord -Force; New-ItemProperty -Path "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize" -Name "SystemUsesLightTheme" -Value 0 -Type DWord -Force'
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
</script>

<div class="flex min-h-screen flex-col">
	<SiteHeader />

	{#if show}
		<div in:fade class="mx-auto w-full max-w-5xl flex-1 px-8 py-10">
			<div class="flex flex-col">
				{#each stuff as item, i}
					<button
						class="group flex w-full cursor-pointer items-center justify-between rounded-lg px-4 py-3 text-left transition-all hover:bg-accent/40 active:scale-[0.995]"
						onclick={() => {
							if (item.url) {
								window.open(item.url, '_blank');
							} else if (item.copyText) {
								handleCopy(item.copyText!, i);
							}
						}}
					>
						<div class="flex flex-1 items-center gap-6 overflow-hidden">
							<div class="flex flex-col">
								<span class="text-base font-medium tracking-tight">
									{item.text}
								</span>
								{#if item.url}
									<span class="truncate text-xs text-muted-foreground opacity-60">
										{item.url}
									</span>
								{/if}
							</div>
						</div>

						<div class="flex items-center">
							{#if item.url}
								<div
									class="flex items-center gap-2 px-3 text-sm font-medium text-muted-foreground/60 transition-colors group-hover:text-primary"
								>
									<ExternalLink size={14} />
									Visit Site
								</div>
							{:else if item.copyText}
								<div
									class="flex items-center gap-2 px-3 text-sm font-medium transition-colors
                    {copiedIndex === i
										? 'text-green-300'
										: 'text-muted-foreground/60 group-hover:text-primary'}"
								>
									{#if copiedIndex === i}
										<Check size={14} />
										Copied
									{:else}
										<Copy size={14} />
										Copy
									{/if}
								</div>
							{:else}
								<div class="flex items-center gap-2 px-3 text-sm text-muted-foreground/40 italic">
									<Info size={14} />
									Reference
								</div>
							{/if}
						</div>
					</button>

					{#if i < stuff.length - 1}
						<Separator class="opacity-30" />
					{/if}
				{/each}
			</div>
		</div>
	{:else}
		<div class="flex flex-1 flex-col items-center justify-center">
			<button
				onclick={handleInteraction}
				class="cursor-default border-none bg-transparent p-0 select-none focus:outline-none"
			>
				<p>404 Page not Found</p>
			</button>
		</div>
	{/if}

	<SiteFooter />
</div>
