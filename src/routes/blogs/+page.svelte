<script lang="ts">
	import SiteFooter from '$lib/components/site-footer.svelte';
	import SiteHeader from '$lib/components/site-header.svelte';

	import * as Card from '$lib/components/ui/card';

	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { ArrowRight } from '@lucide/svelte';

	interface BlogPost {
		slug: string;
		title: string;
		date: string;
		summary: string;
	}

	const posts: BlogPost[] = [];
</script>

{#snippet BlogPost(post: BlogPost)}
	<article>
		<div class="flex flex-col">
			<time class="mb-2 text-sm font-medium tracking-wider text-primary uppercase">
				{post.date}
			</time>

			<h2 class="text-2xl leading-snug sm:text-3xl">
				{post.title}
			</h2>

			<p class="mt-3 max-w-[70ch] text-base text-muted-foreground sm:text-lg">
				{post.summary}
			</p>

			<div class="mt-4">
				<Button
					href={`/blogs/${post.slug}`}
					variant="link"
					class="h-auto p-0 text-base font-semibold"
				>
					Read Article <ArrowRight class="ml-2 h-4 w-4" />
				</Button>
			</div>
		</div>
	</article>
{/snippet}

<div class="flex min-h-screen flex-col">
	<SiteHeader />

	<main class="flex-grow p-4 sm:p-8">
		<div class="container mx-auto max-w-4xl pt-8 pb-12">
			<header class="mb-12 text-center">
				<h1 class="text-4xl font-bold tracking-tight sm:text-5xl">Blog & Articles ✍️</h1>
				<p class="mt-2 text-lg text-muted-foreground">
					Thoughts and deep dives on low-level programming and systems architecture.
				</p>
			</header>

			{#if posts.length > 0}
				<div class="space-y-8">
					{#each posts as post}
						{@render BlogPost(post)}
						{#if post !== posts[posts.length - 1]}
							<Separator />
						{/if}
					{/each}
				</div>
			{:else}
				<Card.Root class="border-2 border-dashed bg-muted/20 py-12 text-center">
					<Card.Title class="text-2xl font-semibold">Nothing to read yet!</Card.Title>
					<Card.Description class="mt-2 text-muted-foreground">
						I'm currently working on some new articles. Check back soon for deep dives into systems
						programming.
					</Card.Description>
				</Card.Root>
			{/if}
		</div>
	</main>

	<SiteFooter />
</div>
