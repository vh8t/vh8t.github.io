<script lang="ts">
	import SiteFooter from '$lib/components/site-footer.svelte';
	import SiteHeader from '$lib/components/site-header.svelte';

	let counter: number = $state(0);
	let show: boolean = $derived(counter >= 5);

	let timer: ReturnType<typeof setTimeout> | null = null;

	// std::vector<std::pair<std::string, std::optional<std::string>>>
	let stuff: [string, string | undefined][] = [
		[
			'AJ Prezentace',
			'https://docs.google.com/presentation/d/1jDIsVeKMQFI2yHZraYj1n7pwvPNP96t_EIwoiNrW0VM/edit?usp=sharing'
		]
	];

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
		<div class="flex flex-1 flex-col gap-2 px-8 py-4">
			{#each stuff as [text, url]}
				{#if url}
					<a
						href={url}
						target="_blank"
						rel="noopener noreferrer"
						class="w-fit font-medium text-blue-600 transition-colors hover:text-blue-800 hover:underline"
						>{text}</a
					>
				{:else}
					<p class="text-gray-700">{text}</p>
				{/if}
			{/each}
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
