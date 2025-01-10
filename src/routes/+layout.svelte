<script lang="ts">
	import type { Snippet } from 'svelte';
	import '../app.css';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<svelte:head>
	<meta name="color-scheme" content="light dark" />
	<meta name="theme-color" content="rgb(185 28 28)" media="(prefers-color-scheme: light)" />
	<meta name="theme-color" content="rgb(185 28 28)" media="(prefers-color-scheme: dark)" />
</svelte:head>

{@render children?.()}
