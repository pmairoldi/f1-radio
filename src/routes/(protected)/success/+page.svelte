<script lang="ts">
	import type { PageProps } from './$types';
	import { page } from '$app/state';

	let { data } = $props();
</script>

<h1>Success</h1>

<table>
	<tbody>
		{#each page.url.searchParams as [key, value]}
			<tr>
				<td>{key}</td>
				<td>{value}</td>
			</tr>
		{/each}
	</tbody>
</table>

{#each data.subscriptions as subscription}
	<div>{subscription.id}</div>
{/each}
