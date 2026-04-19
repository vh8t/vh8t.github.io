<script lang="ts">
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';

	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';

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
		<div class="flex flex-col items-center gap-6">
			<h1 class="font-mono text-lg font-bold tracking-widest text-foreground sm:text-xl">
				[ ERROR {page.status}: {page.error?.message.toUpperCase().replace(' ', '_') || '???'} ]
			</h1>

			<a
				href={resolve('/')}
				class="group flex items-center gap-2 font-mono text-xs tracking-widest text-muted-foreground uppercase transition-colors hover:text-primary"
			>
				<span class="opacity-0 transition-opacity group-hover:opacity-100">&gt;</span>
				return_to_main_menu
			</a>
		</div>
	</main>

	<Footer />
</div>
