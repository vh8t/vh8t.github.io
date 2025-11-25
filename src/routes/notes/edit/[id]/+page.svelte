<script lang="ts">
	import SiteFooter from '$lib/components/site-footer.svelte';
	import SiteHeader from '$lib/components/site-header.svelte';

	import { db } from '$lib/db';
	import { goto } from '$app/navigation';
	// import type { PageData } from './$types';

	import { Button } from '$lib/components/ui/button';
	import { Textarea } from '$lib/components/ui/textarea';

	import { ChevronLeft, Trash2 } from '@lucide/svelte';

	let { data } = $props();

	const originalContent = data.note.content;
	const noteId = data.note.id!;

	let content = $state(originalContent);

	$effect(() => {
		if (content === originalContent) {
			return;
		}

		const timer = setTimeout(async () => {
			try {
				await db.notes.update(noteId, { content });
			} catch (e) {
				console.error('Failed to save note:', e);
			}
		}, 750);

		return () => {
			clearTimeout(timer);
		};
	});

	const goBack = () => {
		goto('/notes');
	};

	const deleteNote = async () => {
		if (confirm('Are you sure you want to delete this note?')) {
			try {
				await db.notes.delete(noteId);
				goBack();
			} catch (e) {
				console.error('Failed to delete note:', e);
			}
		}
	};
</script>

<div class="flex h-screen flex-col">
	<SiteHeader />

	<header class="flex items-center justify-between p-2">
		<Button variant="ghost" size="icon" onclick={goBack} aria-label="Back to notes">
			<ChevronLeft class="h-5 w-5" />
		</Button>
		<Button variant="ghost" size="icon" onclick={deleteNote} aria-label="Delete note">
			<Trash2 class="h-5 w-5 text-destructive" />
		</Button>
	</header>

	<main class="flex-1 p-4 pt-0">
		<Textarea
			bind:value={content}
			placeholder="What's on your mind?"
			class="h-full w-full resize-none border-none bg-transparent p-0
                   text-lg shadow-none focus-visible:ring-0"
		/>
	</main>

	<SiteFooter />
</div>
