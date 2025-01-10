<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Driver } from '$lib/types';
	import RadioBox from '$lib/renderers/RadioBox.svelte';

	interface Props {
		driver: Driver;
		children?: Snippet;
	}

	let { driver, children }: Props = $props();
</script>

<div class="flex flex-col items-center gap-4">
	<div class="border border-red-300 dark:border-gray-700">
		<RadioBox name={driver.name} team={driver.team}>
			{@render children?.()}
		</RadioBox>
	</div>
</div>
