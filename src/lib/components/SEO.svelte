<script lang="ts">
	export let title: string;
	export let description: string;
	export let url: string;
	export let imageUrl: string;
</script>

<svelte:head>
	<title>{title}</title>
	<meta property="description" content={description} />

	<meta property="og:image" content={imageUrl} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />

	<meta name="twitter:image" content={imageUrl} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
</svelte:head>
