<script lang="ts">
	import type { Messages, Driver } from '../data';
	import { base, assets } from '$app/paths';

	console.log(base, assets);
	export let driver: Driver;
	export let messages: Messages;

	$: name = driver.name.display === 'first' ? driver.name.first : driver.name.last;
	$: team = driver.team;
</script>

<div class="message">
	<div class="header">
		<div class="driver">
			<span style="color: {team.color};">{name}</span>
		</div>
		<div class="radio">
			<img class="logo" src={team.logo} alt="" />
			<span style="color: #ffffff;"> Radio </span>
		</div>
	</div>
	<hr class="separator" style="background: {team.color};" />

	{{ messages }}
</div>

<style>
	* {
		/* outline: 1px solid red; */
	}

	.message {
		width: 100%;
		max-width: 320px;
		flex-direction: column;
		background-color: #16181c;
	}

	.header {
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: 16px;
		background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.2), transparent);
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
	}
</style>
