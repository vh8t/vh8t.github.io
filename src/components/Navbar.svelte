<script lang="ts">
	let is_menu_open = $state(false);

	const toggle_menu = () => {
		is_menu_open = !is_menu_open;
	};
</script>

<nav class="bg-surface-50">
	<div class="mx-auto max-w-7xl px-6">
		<div class="flex h-14 items-center justify-between">
			<!-- Logo -->
			<div class="flex items-center gap-3">
				<div class="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-500">
					<span class="text-xs font-bold text-white">SG</span>
				</div>
				<span class="text-text-primary text-base font-medium">Samuel Golis</span>
			</div>

			<!-- Desktop Navigation -->
			<div class="hidden items-center gap-6 md:flex">
				<a href="/" class="text-text-secondary hover:text-text-primary text-sm transition-colors">
					Home
				</a>
				<a
					href="/projects"
					class="text-text-secondary hover:text-text-primary text-sm transition-colors"
				>
					Projects
				</a>
				<a
					href="/blogs"
					class="text-text-secondary hover:text-text-primary text-sm transition-colors"
				>
					Writings
				</a>
			</div>

			<!-- Mobile menu button -->
			<div class="flex items-center md:hidden">
				<button
					onclick={toggle_menu}
					class="text-text-secondary hover:text-text-primary rounded-lg p-1.5 transition-colors hover:bg-surface-100"
				>
					<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						{#if is_menu_open}
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width={1.5}
								d="M6 18L18 6M6 6l12 12"
							/>
						{:else}
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width={1.5}
								d="M4 6h16M4 12h16M4 18h16"
							/>
						{/if}
					</svg>
				</button>
			</div>
		</div>

		<!-- Mobile Menu -->
		{#if is_menu_open}
			<div class="border-t border-surface-200 pt-2 pb-3 md:hidden">
				<div class="space-y-1">
					<a
						href="/"
						class="text-text-secondary hover:text-text-primary block rounded-lg px-3 py-2 text-sm transition-colors hover:bg-surface-100"
					>
						Home
					</a>
					<a
						href="/projects"
						class="text-text-secondary hover:text-text-primary block rounded-lg px-3 py-2 text-sm transition-colors hover:bg-surface-100"
					>
						Projects
					</a>
					<a
						href="/blogs"
						class="text-text-secondary hover:text-text-primary block rounded-lg px-3 py-2 text-sm transition-colors hover:bg-surface-100"
					>
						Writings
					</a>
				</div>
			</div>
		{/if}
	</div>
</nav>
