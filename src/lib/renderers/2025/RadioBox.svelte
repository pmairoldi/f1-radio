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

	const sine: number[] = [
		0, 1, 2, 5, 8, 11, 16, 21, 26, 32, 38, 44, 50, 56, 62, 68, 74, 79, 84, 89, 92, 95, 98, 99, 100,
		100, 99, 98, 95, 92, 89, 84, 79, 74, 68, 62, 56, 50, 44, 38, 32, 26, 21, 16, 11, 8, 5, 2, 1, 0
	];
	const wave = sine.map((v) => {
		const rand = Math.random();
		const noise = (rand - 0.5) * 40;
		return v + noise;
	});
</script>

<div class="font-f1 message" bind:this={element} style="--team-color: {team.color};">
	<div class="flex flex-col p-3">
		<div class="flex flex-row items-center justify-end">
			<span class="leading-none font-bold uppercase text-4xl text-[var(--team-color)]">
				{name.display === 'first' ? name.first : name.last}
			</span>
		</div>
		<div class="flex flex-row items-center justify-end">
			<span class="leading-none font-bold uppercase text-4xl text-white"> Radio </span>
		</div>
		<div class="flex flex-row items-center justify-between">
			<span class="font-black text-6xl text-[var(--team-color)]">{driver.number}</span>
			<div class="logo">
				<img src={team.logo} alt={team.name} />
			</div>
		</div>

		<div class="audio-wave">
			{#each wave as item}
				<div
					class="audio-wave-item"
					style="--wave-height: {item}%; --wave-intensity: {item * 0.25}%;"
				></div>
			{/each}
		</div>
	</div>

	<div class="messages">
		{@render children?.()}
	</div>

	<footer class="text-white text-opacity-50 text-center w-full pb-2 text-sm">@F1RadioMeme</footer>
</div>

<style>
	@reference "../../../app.css";

	.message {
		--background-color: #16181c; /* change to dotted bg */
		--light-text-color: #ffffff;
		--gradient-background: linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 0, transparent 80px);
		--gradient-background-border: 2px solid rgba(255, 255, 255, 0.15);
	}

	.message {
		width: 320px;
		display: flex;
		flex-direction: column;
		background-color: var(--background-color);
		overflow: clip;
		font-variant-ligatures: none;
	}

	.header {
		display: flex;
		flex-direction: column;
		background-image: var(--gradient-background);
		padding: 12px;
	}

	.driver,
	.radio,
	.logo {
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.logo {
		justify-content: center;
		width: 64px;
	}

	.driver span {
		text-transform: uppercase;
		font-weight: 700;
		line-height: 1;
	}

	.radio span {
		text-transform: uppercase;
		font-weight: 700;
		line-height: 1;
	}

	.driver span {
		font-size: 34px;
	}

	.radio span {
		font-size: 36px;
		color: var(--light-text-color);
	}

	.logo img {
		max-height: 48px;
		max-width: 64px;
	}

	.audio-wave {
		display: flex;
		flex-direction: row;
		align-items: stretch;
		justify-content: center;
		gap: 4px;
		height: 32px;
		padding-top: 4px;
	}

	.audio-wave-item {
		flex: none;
		width: 4px;
		background-image: radial-gradient(
			circle at bottom,
			var(--team-color) var(--wave-intensity),
			transparent var(--wave-height)
		);
		filter: drop-shadow(0 -2px 8px var(--team-color)) blur(1px);
	}

	.messages {
		display: flex;
		flex-direction: column;
		padding: 24px 12px;
		text-transform: uppercase;
		font-size: 24px;
		line-height: 1.2;
		gap: 16px;
	}
</style>
