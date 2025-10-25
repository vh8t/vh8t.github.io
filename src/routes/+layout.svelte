<script lang="ts">
	import '../app.css';
	import '$lib/stores/theme';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="https://vh8t.xyz/favicon.jpg" />
</svelte:head>

{@render children?.()}
