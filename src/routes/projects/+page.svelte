<script lang="ts">
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';

	import { projects, type Project } from '$lib/projects';

	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import * as Card from '$lib/components/ui/card';
	import * as Select from '$lib/components/ui/select';

	import { GithubLogoIcon, MagnifyingGlassIcon } from 'phosphor-svelte';
	import { onMount } from 'svelte';

	let query = $state('');
	let tag = $state('All');
	let trigger = $derived(tag === 'All' ? 'Filter by Tag' : tag);

	const tags = ['All', ...Array.from(new Set(projects.flatMap((p) => p.tags)))].sort();

	let filtered = $derived.by(() => {
		const q = query.toLowerCase().trim();
		return projects.filter((project) => {
			const queryMatch =
				q === '' ||
				project.name.toLowerCase().includes(q) ||
				project.description.toLowerCase().includes(q);
			const tagMatch = tag === 'All' || project.tags.includes(tag);
			return queryMatch && tagMatch;
		});
	});

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

	<main class="grow p-4 sm:p-8">
		<div class="container mx-auto max-w-4xl pt-8 pb-12">
			<header class="mb-10 text-center">
				<h1 class="text-4xl font-bold tracking-tight sm:text-5xl">My Projects 🛠️</h1>
				<p class="mt-2 text-lg text-muted-foreground">
					A collection of systems-level code, tooling, and hobby explorations.
				</p>
			</header>

			<div class="mx-auto mb-8 w-full max-w-2xl">
				<div class="grid grid-cols-1 gap-4 sm:grid-cols-4">
					<div class="relative sm:col-span-3">
						<MagnifyingGlassIcon
							class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground"
						/>
						<Input
							placeholder="Search by name or description..."
							bind:value={query}
							class="h-10 w-full pl-9"
						/>
					</div>

					<Select.Root type="single" bind:value={tag}>
						<Select.Trigger class="select-height-fix h-12 w-35 sm:w-full">
							<span class:text-muted-foreground={tag === 'All'}>
								{trigger}
							</span>
						</Select.Trigger>
						<Select.Content>
							<Select.Group>
								<Select.Label>Filter Tags</Select.Label>
								{#each tags as tag (tag)}
									<Select.Item value={tag}>
										{tag}
									</Select.Item>
								{/each}
							</Select.Group>
						</Select.Content>
					</Select.Root>
				</div>
			</div>

			{#if filtered.length > 0}
				<div class="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
					{#each filtered as project (project)}
						{@render Project(project)}
					{/each}
				</div>
			{:else}
				<Card.Root class="border-2 border-dashed bg-muted/20 py-12 text-center">
					<Card.Title class="text-2xl font-semibold">No projects found.</Card.Title>
					<Card.Description class="mt-2 text-muted-foreground">
						Try adjusting your search query or tag filter.
					</Card.Description>
				</Card.Root>
			{/if}
		</div>
	</main>

	<Footer />
</div>

{#snippet Project(project: Project)}
	<Card.Root class="flex flex-col justify-between">
		<Card.Header>
			<Card.Title class="text-2xl font-semibold">{project.name}</Card.Title>

			<div class="flex flex-wrap gap-2 pt-2">
				{#each project.tags as tag (tag)}
					<Badge variant="secondary">{tag}</Badge>
				{/each}
			</div>
		</Card.Header>

		<Card.Content>
			<p class="text-muted-foreground">
				{project.description}
			</p>
		</Card.Content>

		<Card.Footer class="mt-4">
			<Button
				href={project.url}
				target="_blank"
				rel="noopener noreferrer"
				variant="default"
				class="w-full"
			>
				<GithubLogoIcon class="mr-2 h-4 w-4" />
				View on GitHub
			</Button>
		</Card.Footer>
	</Card.Root>
{/snippet}
