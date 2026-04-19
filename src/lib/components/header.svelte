<script lang="ts">
	import { Button } from '$lib/components/ui/button';
</script>

<header
	class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60"
>
	<div class="container mx-auto flex h-16 max-w-4xl items-center justify-between px-4">
		<Button href="/" variant="ghost" class="text-lg">Samuel Golis</Button>

		<nav class="flex items-center space-x-4">
			<Button href="/projects" variant="link" class="text-md">Projects</Button>
			<Button href="/blogs" variant="link" class="text-md">Blogs</Button>
		</nav>
	</div>
</header>
