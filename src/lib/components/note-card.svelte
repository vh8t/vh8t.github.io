<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import type { Note } from '$lib/db';

	let { note }: { note: Note } = $props();

	const formattedDate = new Intl.DateTimeFormat(undefined, {
		dateStyle: 'medium',
		timeStyle: 'short'
	}).format(note.createdAt);

	const preview = note.content.substring(0, 150) + (note.content.length > 150 ? '...' : '');
</script>

<a href={`/notes/edit/${note.id}`} class="block">
	<Card.Root class="mb-4 transition-all hover:shadow-md active:scale-[0.98]">
		<Card.Content class="p-4">
			{#if preview}
				<p class="whitespace-pre-wrap">{preview}</p>
			{:else}
				<p class="text-muted-foreground">Empty note...</p>
			{/if}
		</Card.Content>
		<Card.Footer class="p-4 pt-0">
			<p class="text-xs text-muted-foreground">{formattedDate}</p>
		</Card.Footer>
	</Card.Root>
</a>
