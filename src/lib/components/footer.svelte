<script lang="ts">
	import { Button } from '$lib/components/ui/button';

	const year = new Date().getFullYear();
	const links = {
		GitHub: 'https://github.com/vh8t',
		Instagram: 'https://instagram.com/golis.sam'
	};
</script>

<footer class="border-t bg-background">
	<div class="container mx-auto flex h-16 max-w-4xl items-center justify-between px-4">
		<p class="text-sm text-muted-foreground">&copy; {year} Samuel Golis</p>
		<div class="flex space-x-4">
			{#each Object.entries(links) as entry (entry)}
				<Button
					variant="link"
					href={entry[1]}
					target="_blank"
					rel="noopener noreferrer"
					class="h-auto p-0"
				>
					{entry[0]}
				</Button>
			{/each}
		</div>
	</div>
</footer>
