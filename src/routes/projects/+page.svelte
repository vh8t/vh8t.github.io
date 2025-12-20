<script lang="ts">
	import SiteFooter from '$lib/components/site-footer.svelte';
	import SiteHeader from '$lib/components/site-header.svelte';

	import * as Card from '$lib/components/ui/card';
	import * as Select from '$lib/components/ui/select';

	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Github, Search, Globe } from '@lucide/svelte';

	type ProjectType = 'github' | 'web';

	interface Project {
		type: ProjectType;
		name: string;
		desc: string;
		url: string;
		tags: string[];
	}

	const gitProject = (name: string, desc: string, url: string, ...tags: string[]): Project => ({
		type: 'github',
		name,
		desc,
		url: 'https://github.com/vh8t/' + url,
		tags
	});
	const webProject = (name: string, desc: string, url: string, ...tags: string[]): Project => ({
		type: 'web',
		name,
		desc,
		url: 'https://vh8t.xyz/' + url,
		tags
	});

	const projects: Project[] = [
		gitProject('Xylia', 'Hobby programming language written in C', 'xylia', 'C', 'Interpreter'),
		gitProject('TMax', 'A declarative and composable tmux wrapper', 'tmax', 'Bash', 'CLI'),
		gitProject(
			'Spotlight++',
			'Keyboard-driven application launcher for Linux systems',
			'spotlightpp',
			'C++',
			'Linux'
		),
		webProject('Klotski', 'Web based game of klotski', 'klotski', 'Web'),
		webProject('Notes', 'Simple web based note taking app', 'notes', 'Web')
	];

	let searchQuery = $state('');
	let selectedTag = $state('All');
	let triggerContent = $derived(selectedTag === 'All' ? 'Filter by Tag' : selectedTag);

	const allUniqueTags = ['All', ...Array.from(new Set(projects.flatMap((p) => p.tags)))].sort();

	let filteredProjects = $state(projects);

	$effect(() => {
		const query = searchQuery.toLowerCase().trim();
		const tag = selectedTag;

		filteredProjects = projects.filter((project) => {
			const matchesQuery =
				query === '' ||
				project.name.toLowerCase().includes(query) ||
				project.desc.toLowerCase().includes(query);

			const matchesTag = tag === 'All' || project.tags.includes(tag);

			return matchesQuery && matchesTag;
		});
	});
</script>

{#snippet Project(project: Project)}
	<Card.Root class="flex flex-col justify-between">
		<Card.Header>
			<Card.Title class="text-2xl font-semibold">{project.name}</Card.Title>

			<div class="flex flex-wrap gap-2 pt-2">
				{#each project.tags as tag}
					<Badge variant="secondary">{tag}</Badge>
				{/each}
			</div>
		</Card.Header>

		<Card.Content>
			<p class="text-muted-foreground">
				{project.desc}
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
				{#if project.type === 'github'}
					<Github class="mr-2 h-4 w-4" />
					View on GitHub
				{:else if project.type === 'web'}
					<Globe class="mr-2 h-4 w-4" />
					View on web
				{/if}
			</Button>
		</Card.Footer>
	</Card.Root>
{/snippet}

<div class="flex min-h-screen flex-col">
	<SiteHeader />

	<main class="flex-grow p-4 sm:p-8">
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
						<Search
							class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground"
						/>
						<Input
							placeholder="Search by name or description..."
							bind:value={searchQuery}
							class="h-10 w-full pl-9"
						/>
					</div>

					<Select.Root type="single" bind:value={selectedTag}>
						<Select.Trigger class="select-height-fix h-10 w-35 sm:w-full">
							<span class:text-muted-foreground={selectedTag === 'All'}>
								{triggerContent}
							</span>
						</Select.Trigger>
						<Select.Content>
							<Select.Group>
								<Select.Label>Filter Tags</Select.Label>
								{#each allUniqueTags as tag}
									<Select.Item value={tag}>
										{tag}
									</Select.Item>
								{/each}
							</Select.Group>
						</Select.Content>
					</Select.Root>
				</div>
			</div>

			{#if filteredProjects.length > 0}
				<div class="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
					{#each filteredProjects as project}
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

	<SiteFooter />
</div>

<style>
	:global(.select-height-fix) {
		height: 40px !important;
		min-height: 40px !important;
	}
</style>
