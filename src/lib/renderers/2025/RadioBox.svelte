<script lang="ts">
	import type { Driver } from '$lib/types';
	import type { Snippet } from 'svelte';

	interface Props {
		driver: Driver;
		children?: Snippet;
		element?: HTMLElement | undefined;
	}

	let { driver, children, element = $bindable() }: Props = $props();
	let { name, team } = $derived(driver);

	const sine: number[] = [0, 0.383, 0.707, 0.924, 1, 0.924, 0.707, 0.383, 0];
	const wave = sine.map((v) => {
		const rand = Math.random();
		const noise = (rand - 0.5) * 40;
		const normalized = (v + 1) * 50;
		return Math.max(0, Math.min(100, normalized + noise));
	});
</script>

<div
	class="font-f1 flex w-[320px] flex-col overflow-clip bg-gray-900 [font-variant-ligatures:none]"
	bind:this={element}
	style="--team-color: {team.color}; --light-team-color: color-mix(in oklab, var(--team-color), white);"
>
	<div class="relative flex flex-col p-3">
		<div class="absolute start-0 end-0 -bottom-6 grid grid-cols-9 items-end">
			{#each wave as item}
				<div
					class="audio-wave-item row-start-1 h-12 opacity-80"
					style="--wave-height: {item}%; --wave-intensity: {item * 0.25}%;"
				></div>
				<div
					class="audio-wave-item row-start-2 h-6 -scale-y-[1] opacity-20"
					style="--wave-height: {item}%; --wave-intensity: {item * 0.25}%;"
				></div>
			{/each}
		</div>

		<div class="flex flex-row items-center justify-end">
			<span class="text-4xl leading-none font-bold text-[var(--team-color)] uppercase">
				{name.display === 'first' ? name.first : name.last}
			</span>
		</div>

		<div class="flex flex-row items-center justify-end">
			<span class="text-4xl leading-none font-black text-white uppercase"> Radio </span>
		</div>

		<div class="flex flex-row items-center justify-between">
			<span
				class="font-kh-interference-f1 bg-gradient-to-tl from-[var(--light-team-color)] to-[var(--team-color)] to-60% bg-clip-text text-7xl font-black text-transparent"
			>
				{driver.number}
			</span>

			<div class="flex h-16 w-16 justify-end">
				<img src={team.logo} alt={team.name} class="max-h-full max-w-full object-contain" />
			</div>
		</div>
	</div>

	<div class="flex flex-col gap-4 px-3 py-6 text-2xl leading-[1.2] uppercase">
		{@render children?.()}
	</div>

	<footer class="text-opacity-50 w-full pb-2 text-center text-sm text-white">@F1RadioMeme</footer>
</div>

<style>
	.audio-wave-item {
		background-image: linear-gradient(
			to top,
			var(--team-color) var(--wave-intensity),
			transparent var(--wave-height)
		);
		filter: drop-shadow(0 0 8px var(--team-color));
	}
</style>
