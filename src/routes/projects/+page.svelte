<script lang="ts">
	import Navbar from '../../components/Navbar.svelte';
	import Footer from '../../components/Footer.svelte';
</script>

<div class="flex h-screen flex-col bg-surface-50">
	<Navbar />

	<main class="flex flex-1 flex-col items-center px-6 py-6">
		<div class="w-full max-w-3xl">
			<!-- Header -->
			<div class="mb-8 text-center">
				<h1 class="text-text-primary mb-2 text-2xl font-light md:text-3xl">Projects</h1>
				<p class="text-text-secondary text-sm">Things I've created and worked on</p>
			</div>

			<!-- Projects Grid -->
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				<!-- Project 1 -->
				<a
					href="https://github.com/vh8t/xylia"
					target="_blank"
					class="rounded-xl bg-white p-5 shadow-sm transition-all hover:shadow-md"
				>
					<div class="mb-3 flex items-center gap-3">
						<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100">
							<span class="text-base font-bold text-primary-600">X</span>
						</div>
						<h3 class="text-text-primary text-lg font-medium">Xylia</h3>
					</div>
					<p class="text-text-secondary mb-3 text-sm">
						A hobby programming language written in C, exploring compiler design and language
						implementation.
					</p>
					<div class="flex gap-2">
						<span class="text-text-secondary rounded-full bg-surface-100 px-2 py-1 text-xs">C</span>
						<span class="text-text-secondary rounded-full bg-surface-100 px-2 py-1 text-xs"
							>Compiler</span
						>
					</div>
				</a>

				<!-- Project 2 -->
				<a
					href="https://github.com/vh8t/tmax"
					target="_blank"
					class="rounded-xl bg-white p-5 shadow-sm transition-all hover:shadow-md"
				>
					<div class="mb-3 flex items-center gap-3">
						<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100">
							<span class="text-base font-bold text-primary-600">T</span>
						</div>
						<h3 class="text-text-primary text-lg font-medium">TMax</h3>
					</div>
					<p class="text-text-secondary mb-3 text-sm">
						A declarative and composable tmux wrapper for streamlined terminal session management
						written in Lua.
					</p>
					<div class="flex gap-2">
						<span class="text-text-secondary rounded-full bg-surface-100 px-2 py-1 text-xs"
							>Lua</span
						>
						<span class="text-text-secondary rounded-full bg-surface-100 px-2 py-1 text-xs"
							>CLI</span
						>
					</div>
				</a>
			</div>
		</div>
	</main>

	<Footer />
</div>
