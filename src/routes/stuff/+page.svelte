<script lang="ts">
	import SiteFooter from '$lib/components/site-footer.svelte';
	import SiteHeader from '$lib/components/site-header.svelte';

	let counter: number = $state(0);
	let show: boolean = $derived(counter >= 5);

	let timer: ReturnType<typeof setTimeout> | null = null;

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
		<div class="flex flex-1 flex-col p-4">
			<p class="text-xl font-medium">Hello</p>
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
