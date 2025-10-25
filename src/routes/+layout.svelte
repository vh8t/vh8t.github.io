<script lang="ts">
	import '../app.css';
	import '$lib/stores/theme';
	import favicon from '$lib/assets/vh8t.jpg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}
