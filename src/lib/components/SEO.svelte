<script lang="ts">
	interface Props {
		title: string;
		description: string;
		name: string;
		url: string;
		imageUrl: string;
	}

	let { title, description, name, url, imageUrl }: Props = $props();
</script>

<svelte:head>
	<title>{title}</title>
	<meta property="description" content={description} />

	<meta property="og:image" content={imageUrl} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:site_name" content={name} />

	<meta name="twitter:image" content={imageUrl} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
</svelte:head>
