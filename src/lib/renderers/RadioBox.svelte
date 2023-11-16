<script lang="ts">
	import type { Driver, Messages } from '../types';

	export let driver: Driver;
	export let messages: Messages;

	$: name = driver.name.display === 'first' ? driver.name.first : driver.name.last;
	$: team = driver.team;

	export let element: HTMLElement | undefined;

	const wave: number[] = [
		0.1, 0.2, 0.2, 0.2, 0.4, 0.4, 0.3, 0.4, 0.3, 0.4, 0.5, 0.6, 0.6, 0.6, 0.5, 0.7, 0.8, 0.7, 0.8,
		0.8, 0.6, 0.7, 0.8, 0.6, 0.4, 0.4, 0.5, 0.4, 0.3, 0.7, 0.5, 0.3, 0.2, 0.2, 0.1, 0.4, 0.3, 0.1,
		0.2, 0.2, 0.3
	];
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
					style="--wave-height: {item * 100}%; --wave-intensity: {item * 25}%;"
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
