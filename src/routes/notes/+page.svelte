<script lang="ts">
	import SiteFooter from '$lib/components/site-footer.svelte';
	import SiteHeader from '$lib/components/site-header.svelte';
	import NoteCard from '$lib/components/note-card.svelte';

	import { Button } from '$lib/components/ui/button';
	import { Plus } from '@lucide/svelte';

	import { db } from '$lib/db';
	import { liveQuery } from 'dexie';
	import { goto } from '$app/navigation';

	let notes = liveQuery(() => db.notes.orderBy('createdAt').reverse().toArray());

	const createAndGo = async () => {
		try {
			const newNoteId = await db.notes.add({
				content: '',
				createdAt: new Date()
			});

			await goto(`/notes/edit/${newNoteId}`);
		} catch (error) {
			console.log('Failed to create new note:', error);
		}
	};
</script>

<div class="flex min-h-screen flex-col">
	<SiteHeader />

	<main class="flex-1 p-4 md:p-6">
		{#if !$notes}
			<p class="text-center text-muted-foreground">Loading notes...</p>
		{:else if $notes.length === 0}
			<div class="flex h-[50vh] flex-col items-center justify-center">
				<h2 class="text-xl font-semibold">No Ideas Yet</h2>
				<p class="text-muted-foreground">Tap the '+' button to capture your first idea.</p>
			</div>
		{:else}
			<div class="mx-auto max-w-2xl">
				{#each $notes as note (note.id)}
					<NoteCard {note} />
				{/each}
			</div>
		{/if}
	</main>

	<Button
		onclick={createAndGo}
		size="icon"
		class="fixed right-6 bottom-22 h-14 w-14 rounded-full shadow-lg"
	>
		<Plus class="h-6 w-6" />
		<span class="sr-only">Create new note</span>
	</Button>

	<SiteFooter />
</div>
