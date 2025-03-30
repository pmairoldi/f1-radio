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
	class="font-f1 w-[320px] flex flex-col bg-gray-900 overflow-clip [font-variant-ligatures:none]"
	bind:this={element}
	style="--team-color: {team.color};"
>
	<div class="flex flex-col p-3 relative z-0">
		<div class="flex flex-row items-center justify-end">
			<span class="leading-none font-bold uppercase text-4xl text-[var(--team-color)]">
				{name.display === 'first' ? name.first : name.last}
			</span>
		</div>
		<div class="flex flex-row items-center justify-end">
			<span class="leading-none font-bold uppercase text-4xl text-white"> Radio </span>
		</div>
		<div class="flex flex-row items-center justify-between">
			<span class="font-black text-6xl text-[var(--team-color)] text-border-outline">
				{driver.number}
			</span>
			<div class="justify-end w-16">
				<img src={team.logo} alt={team.name} />
			</div>
		</div>

		<div class="grid grid-cols-9 absolute start-0 end-0 -bottom-6 items-end -z-10">
			{#each wave as item}
				<div
					class="audio-wave-item h-12 row-start-1"
					style="--wave-height: {item}%; --wave-intensity: {item * 0.25}%;"
				></div>
				<div
					class="audio-wave-item h-6 row-start-2 -scale-y-[1] opacity-35"
					style="--wave-height: {item}%; --wave-intensity: {item * 0.25}%;"
				></div>
			{/each}
		</div>
	</div>

	<div class="flex flex-col px-3 py-6 uppercase text-2xl leading-[1.2] gap-4">
		{@render children?.()}
	</div>

	<footer class="text-white text-opacity-50 text-center w-full pb-2 text-sm">@F1RadioMeme</footer>
</div>

<style>
	.text-border-outline {
		text-shadow: 0.5px 0.5px var(--color-gray-900);
	}

	.audio-wave-item {
		background-image: linear-gradient(
			to top,
			var(--team-color) var(--wave-intensity),
			transparent var(--wave-height)
		);
		filter: drop-shadow(0 0 8px var(--team-color));
	}
</style>
