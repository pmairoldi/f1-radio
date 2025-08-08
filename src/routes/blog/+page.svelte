<script lang="ts">
	import { formatDate } from '$lib/data-formatter';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<SEO
	title="Blog | F1 Radio Meme"
	description="Generate funny f1 radio memes and copy the image to post to your favorite website!"
	name="F1RadioMeme"
	url="https://f1radiomeme.com"
	imageUrl="https://f1radiomeme.com/OG.png"
/>

<Header />

<main class="flex-auto p-4">
	<section class="mx-auto flex max-w-2xl flex-col gap-8">
		{#if data.posts.length === 0}
			<p class="font-f1 text-center">No posts</p>
		{:else}
			<ul>
				{#each data.posts as post}
					<li>
						<a
							class="flex flex-row gap-2 rounded-lg p-2 transition-colors hover:bg-gray-500/20 dark:hover:bg-gray-200/20"
							href={`/blog/${post.slug}`}
						>
							<div class="flex flex-1 flex-col gap-1">
								<h2 class="font-f1 col-start-1 text-2xl">{post.title}</h2>
								<p class="col-start-1 text-sm text-red-600">Published at {formatDate(post.date)}</p>
								<p class="col-start-1 text-sm">{post.description}</p>
							</div>

							<span
								class="col-start-2 row-span-3 row-start-1 flex items-center gap-1 text-sm text-red-600 transition-colors"
							>
								Read
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="lucide lucide-arrow-right"
									><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg
								>
							</span>
						</a>
					</li>
				{/each}
			</ul>
		{/if}
	</section>
</main>

<Footer />
