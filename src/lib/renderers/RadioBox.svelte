<script lang="ts">
	import type { Driver, Messages } from '../data';

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

<div class="message" bind:this={element}>
	<div class="header">
		<div class="driver">
			<span style="color: {team.color};">{name}</span>
		</div>
		<div class="radio">
			<img class="logo" src={team.logo} alt="" />
			<span style="color: #ffffff;"> Radio </span>
		</div>
	</div>
	<div class="audio-wave">
		{#each wave as item}
			<div
				class="audio-wave-item"
				style="height: {item *
					100}%; background: {team.color}; box-shadow: 0px 0px 10px 2px {team.color};"
			/>
		{/each}
	</div>
	<hr class="separator" style="background: {team.color};" />

	<div class="messages">
		{#each messages as message}
			{#if message.type === 'team'}
				<span class="team-message" style="color: #ffffff;">"{message.message}"</span>
			{/if}

			{#if message.type === 'driver'}
				<span class="driver-message" style="color: {team.color};">"{message.message}"</span>
			{/if}
		{/each}
	</div>
</div>

<style>
	.message {
		width: 100%;
		max-width: 320px;
		display: flex;
		flex-direction: column;
		background-color: #16181c;
		overflow: clip;
	}

	.header {
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: 12px 16px;
		background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.1), transparent);
	}

	.driver {
		text-transform: uppercase;
		font-style: italic;
		font-size: 32px;
		line-height: 1;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.radio {
		text-transform: uppercase;
		font-style: italic;
		font-size: 32px;
		line-height: 1;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		gap: 8px;
	}

	.logo {
		height: 30px;
	}

	.separator {
		border: 0;
		height: 4px;
		margin-top: 4px;
		margin-bottom: 8px;
	}

	.audio-wave {
		display: flex;
		flex-direction: row;
		align-items: flex-end;
		gap: 4px;
		height: 36px;
	}

	.audio-wave-item {
		width: 4px;
		border-radius: 4px 4px 0px 0px;
	}

	.messages {
		display: flex;
		flex-direction: column;
		padding: 24px 16px;
		font-size: 24px;
		font-style: italic;
		line-height: 1;
		gap: 8px;
		background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.1), transparent);
		border-top: 2px solid rgba(255, 255, 255, 0.2);
	}

	.team-message {
		text-align: start;
	}

	.driver-message {
		text-align: end;
	}
</style>
