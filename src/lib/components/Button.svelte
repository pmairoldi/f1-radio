<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends HTMLButtonAttributes {
		children: Snippet;
	}

	let { children, onclick, disabled, ...props }: Props = $props();

	function handleClick(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
		if (disabled) {
			return;
		}

		if (onclick != null) {
			onclick(event);
		}
	}
</script>

<button
	class="flex items-center justify-center gap-1 rounded-xl bg-red-700 p-2 text-white outline-2 outline-offset-2 outline-red-700 outline-none focus-visible:outline-solid aria-disabled:opacity-70"
	onclick={handleClick}
	aria-disabled={disabled ? 'true' : undefined}
	{...props}
>
	{@render children()}
</button>
