<script lang="ts">
	import '../app.css';
	import { provideRandom } from '$lib/random.svelte';
	import { type Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	interface Props {
		data: LayoutData;
		children?: Snippet;
	}

	let { data, children }: Props = $props();

	const random = provideRandom(data.random);

	$effect(() => {
		random.update(data.random);
	});
</script>

<svelte:head>
	<meta name="color-scheme" content="light dark" />
	<meta name="theme-color" content="rgb(185 28 28)" media="(prefers-color-scheme: light)" />
	<meta name="theme-color" content="rgb(185 28 28)" media="(prefers-color-scheme: dark)" />
</svelte:head>

{@render children?.()}
