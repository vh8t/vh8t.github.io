<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';

	const siteName = 'Samuel Golis';
</script>

<header
	class="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
	style="padding-top: env(safe-area-inset-top);"
>
	<div class="container mx-auto flex h-16 max-w-4xl items-center justify-between px-4">
		<div class="flex items-center">
			<Button href="/" variant="ghost" class="text-lg font-bold hover:bg-transparent">
				{siteName}
			</Button>
		</div>
		<nav class="flex items-center space-x-4 text-sm font-medium">
			<Button
				href="/projects"
				variant="link"
				class="h-auto p-0 text-base text-foreground/80 hover:text-foreground"
			>
				Projects
			</Button>
			<Button
				href="/blogs"
				variant="link"
				class="mr-4 h-auto p-0 text-base text-foreground/80 hover:text-foreground"
			>
				Blogs
			</Button>
		</nav>
	</div>
	<Separator class="h-[1px]" />
</header>
