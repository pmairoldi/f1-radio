<script lang="ts">
	import type { Messages, Driver } from '../data';

	export let driver: Driver;
	export let messages: Messages;

	$: name = driver.name.display === 'first' ? driver.name.first : driver.name.last;
	$: team = driver.team;
</script>

<div class="container">
	<div class="driver">
		{name}
	</div>
	<div class="team">
		{team.name}
	</div>
	{{ messages }}
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		max-width: 320px;
	}

	.driver {
		background: red;
		display: flex;
		align-items: flex-end;
	}

	.team {
		background: blue;
	}
</style>
