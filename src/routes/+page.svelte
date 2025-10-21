<script lang="ts">
	import Navbar from '../components/Navbar.svelte';
	import Footer from '../components/Footer.svelte';
</script>

<div class="flex h-screen flex-col bg-surface-50">
	<Navbar />

	<main class="flex flex-1 items-center justify-center px-6">
		<div class="max-w-2xl text-center">
			<!-- Inline Avatar and Name -->
			<div class="mb-8 flex items-center justify-center gap-4">
				<div
					class="flex h-16 w-16 items-center justify-center rounded-xl bg-primary-100 text-xl font-bold text-primary-600"
				>
					SG
				</div>
				<h1 class="text-text-primary text-3xl font-light md:text-4xl">Samuel Golis</h1>
			</div>

			<!-- Description -->
			<p class="text-text-secondary mb-8 text-left text-lg leading-relaxed md:text-xl">
				Focusing on C and C++,<br />
				low-level programming, and<br />
				performance-oriented systems.
			</p>
		</div>
	</main>

	<Footer />
</div>
