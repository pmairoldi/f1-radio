<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import { formatDate } from '$lib/data-formatter';
	import { m } from '$lib/paraglide/messages';

	let { data } = $props();
</script>

<SEO
	title={m['seo.page_title']({ name: data.meta.title })}
	description={data.meta.description}
	name={m['seo.site_name']()}
	url="https://f1radiomeme.com"
	imageUrl="https://f1radiomeme.com/OG.png"
/>

<svelte:head>
	<meta property="og:type" content="article" />
</svelte:head>

<Header />

<main class="flex-auto p-4">
	<article class="mx-auto flex max-w-2xl flex-col gap-8">
		<header class="flex flex-col gap-1">
			<h1 class="font-f1 text-2xl">{data.meta.title}</h1>
			<p class="text-sm text-red-600">
				{m['blog.published_at']({ date: formatDate(data.meta.date) })}
			</p>
			<div class="font-f1 flex flex-wrap gap-1 text-xs">
				{#each data.meta.categories as category}
					<span class="rounded-sm bg-red-600 px-1 py-0.5 text-white">&num;{category}</span>
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
		font-family: var(--font-f1);
		font-size: var(--text-xl);
		line-height: var(--tw-leading, var(--text-xl--line-height));
	}

	.prose > :global(p) {
		font-size: var(--text-sm);
		line-height: var(--tw-leading, var(--text-sm--line-height));
	}

	.prose > :global(* + *) {
		margin-top: calc(var(--spacing) * 3);
	}

	.prose > :global(* + h2) {
		margin-top: calc(var(--spacing) * 6);
	}

	.prose :global(a) {
		color: var(--color-red-700);
		text-decoration-line: underline;
		outline: none;
		border-radius: var(--radius-sm);

		&:focus-visible {
			outline: calc(var(--spacing) * 0.5) solid var(--color-red-700);
			outline-offset: 2px;
		}
	}
</style>
