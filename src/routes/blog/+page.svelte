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

<main class="p-4 flex-auto">
	<section class="flex flex-col gap-8 max-w-2xl mx-auto">
		{#if data.posts.length === 0}
			<p class="text-center font-f1">No posts</p>
		{:else}
			<ul>
				{#each data.posts as post}
					<li>
						<a class="flex flex-row gap-2 group" href={`/blog/${post.slug}`}>
							<div class="flex flex-col gap-1 flex-1">
								<h2 class="text-2xl col-start-1 font-f1">{post.title}</h2>
								<p class="text-sm text-red-700 col-start-1">Published at {formatDate(post.date)}</p>
								<p class="text-sm col-start-1">{post.description}</p>
							</div>

							<span
								class="flex items-center gap-1 row-start-1 row-span-3 col-start-2 text-sm group-hover:text-red-700 transition-colors"
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
