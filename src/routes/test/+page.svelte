<script>
	let value = 'baz';
	let items = ['foo', 'bar', 'baz'];
</script>

<select {value}>
	{#each items as item}
		<option value={item}>{item}</option>
	{/each}
</select>
(state: {value})

{#each items as item}
	<button on:click={() => (value = item)}>{item}</button>
{/each}
