<script lang="ts">
	// import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { drivers } from '$lib/data';
	import type { ChangeEventHandler } from 'svelte/elements';

	$: driver = $page.url.searchParams.get('d');
	$: messages = $page.url.searchParams.get('m');

	const driverChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
		// const url = $page.url;
		// url.searchParams.set('d', event.currentTarget.value);
		// goto(url);
		driver = event.currentTarget.value;
	};

	const messagesChange: ChangeEventHandler<HTMLInputElement> = (event) => {
		// const url = $page.url;
		// url.searchParams.set('m', event.currentTarget.value);
		// goto(url);
		messages = event.currentTarget.value;
	};

	function getQuery(driver: string, messages: string): string {
		const query = new URLSearchParams();
		query.set('d', driver);
		query.set('m', messages);

		return query.toString();
	}

	$: image = `/image?${getQuery(driver ?? '', messages ?? '')}`;
</script>

<header class="p-4 text-white bg-red-700">
	<h1 class="text-3xl font-f1">F1 Radio Meme</h1>
</header>

<main class="grid grid-cols-1 gap-4 p-4 font-f1 items-center">
	<label class="flex flex-col">
		<span>Pick a driver:</span>
		<select
			value={driver}
			on:change={driverChange}
			class="text-white bg-red-700 rounded-md p-2 appearance-none"
		>
			<option value={null} />
			{#each drivers as driver}
				<option value={`${driver.name.first}_${driver.name.last}`.toLowerCase()}>
					{#if driver.name.display === 'first'}
						{driver.name.first}
					{:else}
						{driver.name.last}
					{/if}
				</option>
			{/each}
		</select>
	</label>

	<label class="flex flex-col">
		<span>Messages:</span>
		<input
			type="text"
			value={messages}
			on:change={messagesChange}
			class="text-white bg-red-700 rounded-md p-2 appearance-none"
		/>
	</label>

	<img src={image} alt="" width="320" />
</main>
