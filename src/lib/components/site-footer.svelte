<script lang="ts">
	import { Button } from '$lib/components/ui/button';

	const currentYear = new Date().getFullYear();
	const socialLinks = {
		github: 'https://github.com/vh8t',
		instagram: 'https://instagram.com/golis.sam'
	};
</script>

<footer class="border-t bg-background">
	<div class="container mx-auto flex h-16 max-w-4xl items-center justify-between px-4">
		<p class="text-sm text-muted-foreground">&copy; {currentYear} Samuel Golis</p>
		<div class="flex space-x-4">
			<Button
				variant="link"
				href={socialLinks.github}
				target="_blank"
				rel="noopener noreferrer"
				class="h-auto p-0"
			>
				GitHub
			</Button>
			<Button
				variant="link"
				href={socialLinks.instagram}
				target="_blank"
				rel="noopener noreferrer"
				class="h-auto p-0"
			>
				Instagram
			</Button>
		</div>
	</div>
</footer>
