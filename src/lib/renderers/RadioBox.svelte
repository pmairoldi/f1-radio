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

<div class="message" bind:this={element}>
	<div class="header">
		<div class="driver">
			<span style="color: {team.color};">{name}</span>
		</div>
		<div class="radio">
			<img class="logo" src={team.logo} alt="" />
			<span style="color: #ffffff;"> Radio </span>
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
	</div>

	<div class="messages">
		{#each messages as message}
			{#if message.type === 'team'}
				<span class="team-message" style="color: #ffffff;">
					"{@html message.message.split('.').join('.<br/>')}"
				</span>
			{/if}

			{#if message.type === 'driver'}
				<span class="driver-message" style="color: {team.color};">
					"{@html message.message.split('.').join('.<br/>')}"
				</span>
			{/if}
		{/each}
	</div>

	<!-- <footer class="text-white text-opacity-50 text-center w-full pb-2 text-sm">@f1-radio-meme</footer> -->
</div>

<style>
	.message {
		width: 320px;
		display: flex;
		flex-direction: column;
		background-color: #16181c;
		overflow: clip;
	}

	.header {
		display: flex;
		flex-direction: column;
		background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.1), transparent);
		padding: 20px 0 12px 0;
	}

	.driver {
		text-transform: uppercase;
		font-style: italic;
		font-weight: 500;
		font-size: 36px;
		padding: 0 20px;
		line-height: 1;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.radio {
		text-transform: uppercase;
		font-style: italic;
		font-weight: 500;
		font-size: 36px;
		line-height: 1;
		padding: 0 20px;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		gap: 4px;
	}

	.logo {
		height: 45px;
	}

	.separator {
		border: 0;
		height: 3px;
		margin-top: 4px;
	}

	.audio-wave {
		display: flex;
		flex-direction: row;
		align-items: flex-end;
		justify-content: center;
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
		padding: 24px 24px;
		text-transform: uppercase;
		font-size: 24px;
		font-style: italic;
		line-height: 1.2;
		gap: 32px;
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
