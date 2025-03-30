<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="flex flex-col items-center">
	<div class="border border-red-300 dark:border-gray-700">
		{@render children?.()}
	</div>
</div>
