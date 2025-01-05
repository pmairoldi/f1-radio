<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import { formatDate } from '$lib/data-formatter';

	let { data } = $props();
</script>

<SEO
	title={`${data.meta.title} | F1 Radio Meme`}
	description={data.meta.description}
	name="F1RadioMeme"
	url="https://f1radiomeme.com"
	imageUrl="https://f1radiomeme.com/OG.png"
/>

<svelte:head>
	<meta property="og:type" content="article" />
</svelte:head>

<Header />

<main class="p-4 flex-auto">
	<article class="flex flex-col gap-8 max-w-2xl mx-auto">
		<header class="flex flex-col gap-1">
			<h1 class="text-2xl font-f1">{data.meta.title}</h1>
			<p class="text-sm text-red-700">Published at {formatDate(data.meta.date)}</p>
			<div class="text-xs flex flex-wrap gap-1 font-f1">
				{#each data.meta.categories as category}
					<span class="rounded px-1 py-0.5 bg-red-700 text-white">&num;{category}</span>
				{/each}
			</div>
		</header>

		<section class="prose">
			<data.content />
		</section>
	</article>
</main>

<Footer />

<style>
	.prose > :global(h2) {
		@apply text-xl font-f1;
	}

	.prose > :global(p) {
		@apply text-sm;
	}

	.prose > :global(* + *) {
		@apply mt-3;
	}

	.prose > :global(* + h2) {
		@apply mt-6;
	}

	.prose :global(a) {
		@apply underline text-red-700;
	}
</style>
