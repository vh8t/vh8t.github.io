<script lang="ts">
	interface BlogPost {
		id: number;
		slug: string;
		title: string;
		date: string;
		read_time: number;
		excerpt: string;
		tags: string[];
		published: boolean;
	}

	interface BlogData {
		posts: BlogPost[];
	}

	import Navbar from '../../components/Navbar.svelte';
	import Footer from '../../components/Footer.svelte';
	import blog_data from '../../lib/blog_data.json';

	const format_date = (str_date: string): string => {
		const date = new Date(str_date);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	};

	const published_posts: BlogPost[] = (blog_data as BlogData).posts.filter(
		(post: BlogPost) => post.published
	);
</script>

<div class="flex h-screen flex-col bg-surface-50">
	<Navbar />

	<main class="flex flex-1 flex-col items-center px-6 py-6">
		<div class="w-full max-w-2xl">
			<!-- Header -->
			<div class="mb-8 text-center">
				<h1 class="text-text-primary mb-2 text-2xl font-light md:text-3xl">Writings</h1>
				<p class="text-text-secondary text-sm">
					Thoughts on software, systems, and technical challenges
				</p>
			</div>

			<!-- Blog Posts -->
			{#if published_posts.length === 0}
				<div class="py-12 text-center">
					<div class="text-text-secondary mb-4 text-6xl">📝</div>
					<h3 class="text-text-primary mb-2 text-xl font-medium">No posts yet</h3>
					<p class="text-text-secondary text-sm">Blog posts are coming soon. Check back later!</p>
				</div>
			{:else}
				<div class="space-y-4">
					{#each published_posts as post: BlogPost}
						<article class="rounded-xl bg-white p-5 shadow-sm transition-all hover:shadow-md">
							<div class="text-text-secondary mb-2 flex items-center gap-2 text-xs">
								<span>{format_date(post.date)}</span>
								<span>•</span>
								<span>{post.read_time} min read</span>
							</div>
							<h2 class="text-text-primary mb-2 text-lg font-medium">
								{post.title}
							</h2>
							<p class="text-text-secondary mb-3 text-sm">
								{post.excerpt}
							</p>
							<div class="flex items-center justify-between">
								<div class="flex gap-2">
									{#each post.tags as tag: string}
										<span class="text-text-secondary rounded-full bg-surface-100 px-2 py-1 text-xs">
											{tag}
										</span>
									{/each}
								</div>
								<a
									href="/blog/{post.slug}"
									class="rounded-lg bg-primary-500 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-primary-600"
								>
									Read Post
								</a>
							</div>
						</article>
					{/each}
				</div>
			{/if}
		</div>
	</main>

	<Footer />
</div>
