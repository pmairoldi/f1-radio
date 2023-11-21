<script lang="ts">
	import type { Driver, Message } from '../types';

	export let driver: Driver;
	export let messages: Message[];

	$: name = driver.name.display === 'first' ? driver.name.first : driver.name.last;
	$: team = driver.team;

	export let element: HTMLElement | undefined;

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

<div class="message" bind:this={element} style="--team-color: {team.color};">
	<div class="header">
		<div class="driver">
			<span>{name}</span>
		</div>
		<div class="radio">
			<img class="logo" src={team.logo} alt="" />
			<span> Radio </span>
		</div>
		<div class="audio-wave">
			{#each wave as item}
				<div
					class="audio-wave-item"
					style="--wave-height: {item}%; --wave-intensity: {item * 0.25}%;"
				/>
			{/each}
		</div>
		<hr class="separator" />
	</div>

	<div class="messages">
		{#each messages as message}
			{#if message.type === 'team'}
				<span class="team-message">
					"{@html message.message.split('.').join('.<br/>')}"
				</span>
			{/if}

			{#if message.type === 'driver'}
				<span class="driver-message">
					"{@html message.message.split('.').join('.<br/>')}"
				</span>
			{/if}
		{/each}
	</div>

	<footer class="text-white text-opacity-50 text-center w-full pb-2 text-sm">@F1RadioMeme</footer>
</div>

<style>
	:root {
		--background-color: #16181c;
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
		color: var(--team-color);
	}

	.header {
		display: flex;
		flex-direction: column;
		background-image: var(--gradient-background);
		padding: 24px 0 12px 0;
	}

	.driver,
	.radio {
		padding: 0 20px;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		gap: 12px;
	}

	.driver span,
	.radio span {
		text-transform: uppercase;
		font-weight: 700;
		transform: skewX(-10deg);
		font-size: 36px;
		line-height: 1;
	}

	.radio span {
		color: var(--light-text-color);
	}

	.logo {
		height: 45px;
	}

	.separator {
		border: 0;
		border-top: 4px solid #16181c;
		border-bottom: 2px solid currentColor;
	}

	.audio-wave {
		display: flex;
		flex-direction: row;
		align-items: stretch;
		justify-content: center;
		gap: 4px;
		height: 36px;
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
		padding: 24px 24px;
		text-transform: uppercase;
		font-size: 24px;
		font-style: italic;
		line-height: 1.2;
		gap: 32px;
		background-image: var(--gradient-background);
		border-top: var(--gradient-background-border);
	}

	.team-message {
		text-align: start;
		word-wrap: break-word;
		color: var(--light-text-color);
	}

	.driver-message {
		text-align: end;
		word-wrap: break-word;
	}
</style>
