<script lang="ts">
	interface Props {
		type: 'driver' | 'team';
		text: string;
	}

	let { type, text }: Props = $props();
</script>

{#if type === 'team'}
	<span class="team-message">
		"{text}"
	</span>
{/if}

{#if type === 'driver'}
	<span class="driver-message">
		"{text}"
	</span>
{/if}

<style>
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
