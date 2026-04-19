<script lang="ts">
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';

	import logo from '$lib/assets/vh8t.jpg';

	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import * as Card from '$lib/components/ui/card';

	import { ArrowRightIcon } from 'phosphor-svelte';

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

	<main class="flex grow items-center justify-center p-6">
		<div class="w-full max-w-2xl">
			<Card.Root class="p-6 md:p-12">
				<div class="flex flex-col items-start gap-8 md:flex-row md:items-center">
					<div class="shrink-0">
						<img
							src={logo}
							alt="Samuel Golis"
							class="h-24 w-24 border border-border sm:h-28 sm:w-28"
						/>
					</div>

					<div class="flex-1">
						<h1 class="text-3xl font-bold tracking-tight sm:text-4xl">Samuel Golis</h1>
						<p class="mt-2 text-base leading-relaxed text-muted-foreground">
							Focusing on {@render hl('C')}, low-level programming, and performance-oriented
							systems.
						</p>

						<div class="mt-6 flex flex-wrap gap-3">
							<Button href="/projects" variant="outline">
								View Projects
								<ArrowRightIcon class="ml-2 h-4 w-4" />
							</Button>
						</div>
					</div>
				</div>

				<Separator class="my-5" />

				<div class="space-y-4">
					<h2 class="text-xl font-bold tracking-widest text-muted-foreground uppercase">About</h2>
					<div class="border-l-4 border-primary bg-muted/30 p-4">
						<p class="text-base leading-7 text-muted-foreground">
							I am a {@render hl('student')} specializing in {@render hl('systems programming')}. I
							enjoy writing clean, {@render hl('efficient code')} primarily in {@render hl('C')},
							with a focus on low-level architecture and performance optimization.
						</p>
					</div>
				</div>
			</Card.Root>
		</div>
	</main>

	<Footer />
</div>

{#snippet hl(text: string)}
	<span class="font-medium text-foreground">{text}</span>
{/snippet}
