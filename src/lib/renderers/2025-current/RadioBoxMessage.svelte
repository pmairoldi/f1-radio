<script lang="ts">
	interface Props {
		type: 'driver' | 'team';
		text: string;
	}

	let { type, text }: Props = $props();
</script>

{#if type === 'team'}
	<span class="text-start wrap-break-word text-white">
		"{@html text}"
	</span>
{/if}

{#if type === 'driver'}
	<span class="text-end wrap-break-word text-(--team-color)">
		"{@html text}"
	</span>
{/if}
