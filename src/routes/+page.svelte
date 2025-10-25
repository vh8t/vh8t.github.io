<script lang="ts">
	import SiteFooter from '$lib/components/site-footer.svelte';
	import SiteHeader from '$lib/components/site-header.svelte';
	import logo from '$lib/assets/vh8t.jpg';

	import * as Card from '$lib/components/ui/card';

	import { Separator } from '$lib/components/ui/separator';
	import { Button } from '$lib/components/ui/button';
	import { ArrowRight } from '@lucide/svelte';
</script>

<div class="flex min-h-screen flex-col">
	<SiteHeader />

	<main class="flex flex-grow items-center justify-center p-4 sm:p-8">
		<div class="w-full max-w-4xl">
			<Card.Root class="p-6 shadow-lg md:p-10">
				<div class="flex flex-col items-center gap-6 md:flex-row md:gap-10">
					<div class="flex-shrink-0">
						<img
							src={logo}
							alt="vh8t.jpg"
							class="h-24 w-24 rounded-full object-cover sm:h-32 sm:w-32"
						/>
					</div>

					<div class="text-center md:text-left">
						<h1 class="text-4xl tracking-tight sm:text-5xl">Samuel Golis</h1>
						<p class="mt-2 text-lg text-muted-foreground">
							Focusing on <span class="font-semibold text-foreground">C and C++</span>, low-level
							programming, and performance-oriented systems.
						</p>

						<Button href="/projects" class="mt-4" variant="default" size="lg">
							View Projects
							<ArrowRight class="ml-2 h-4 w-4" />
						</Button>
					</div>
				</div>

				<Separator class="my-8" />

				<div class="space-y-4 text-center md:text-left">
					<h2 class="text-2xl font-semibold tracking-tight">About</h2>
					<p class="text-muted-foreground">
						I am a <span class="font-semibold text-primary">student</span> specializing in
						<span class="font-semibold text-primary">systems programming</span>. I enjoy writing
						clean,
						<span class="font-semibold text-primary">efficient code</span> primarily in
						<span class="font-semibold text-primary">C/C++</span>, with a focus on low-level
						architecture and performance. I also utilize
						<span class="font-semibold text-primary">Go</span> for tooling.
					</p>
				</div>
			</Card.Root>
		</div>
	</main>

	<SiteFooter />
</div>
