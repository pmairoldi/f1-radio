<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLSelectAttributes } from 'svelte/elements';

	interface Props extends HTMLSelectAttributes {
		children: Snippet;
	}

	let { children, ...props }: Props = $props();
</script>

<select
	class="appearance-none rounded-xl bg-red-700 p-2 text-white outline-2 outline-offset-2 outline-red-700 outline-none focus-visible:outline-solid"
	{...props}
>
	{@render children()}
</select>

<style>
	select {
		padding-right: 28px;
		background-image:
			linear-gradient(45deg, transparent 50%, white 50%),
			linear-gradient(135deg, white 50%, transparent 50%);
		background-position:
			calc(100% - 15px) calc(1em + 2px),
			calc(100% - 10px) calc(1em + 2px);
		background-size:
			5px 5px,
			5px 5px;
		background-repeat: no-repeat;
	}
</style>
