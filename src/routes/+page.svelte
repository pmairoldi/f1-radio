<script lang="ts">
	import { drivers, type Driver, type Messages } from '$lib/data';
	import type { FormEventHandler } from 'svelte/elements';
	import RadioBox from '../lib/renderers/RadioBox.svelte';

	let driver: Driver | null = drivers[0];
	let messages: Messages = [
		{ type: 'driver', message: "I've got no grip out here mate!" },
		{ type: 'team', message: 'copy' }
	];

	const formChange: FormEventHandler<HTMLFormElement> = (event) => {
		const form = new FormData(event.currentTarget);

		const d = form.get('driver') as Driver | null;
		const m = form.getAll('messages') as string[] | null;
		console.log(d);
		if (d != null) {
			driver = d;
		} else {
			driver = null;
		}

		if (m != null) {
			const newMessage: Messages = [];
			for (let i = 0; i < m.length; i += 2) {
				const type = m[i] as 'driver' | 'team';
				const message = m[i + 1];

				newMessage.push({ type: type, message: message });
			}

			messages = newMessage;
		} else {
			messages = [];
		}
	};

	function addMessage() {
		messages.push({ type: 'driver', message: '' });
		messages = messages;
	}

	function removeMessage(index: number) {
		messages.splice(index, 1);
		messages = messages;
	}

	function getQuery(driver: Driver, messages: Messages): string {
		const query = new URLSearchParams();
		query.set('d', `${driver.name.first}_${driver.name.last}`.toLowerCase());
		query.set('m', JSON.stringify(messages));

		return query.toString();
	}

	$: image = driver != null ? `/image?${getQuery(driver, messages)}` : null;
</script>

<header class="p-4 text-white bg-red-700">
	<h1 class="text-3xl font-f1 max-w-2xl mx-auto">F1 Radio Meme</h1>
</header>

<main class="p-4 font-f1">
	<div class=" grid grid-cols-1 gap-4 w-full max-w-2xl mx-auto justify-items-center">
		<h2 class="w-full text-lg">
			Generate funny f1 radio meme and copy the image to post to your favorite website!
		</h2>
		<form on:input={formChange} autocomplete="off" class="flex flex-col gap-4 w-full">
			<label class="flex flex-col">
				<span>Pick a driver:</span>
				<select
					value={driver}
					name="driver"
					class="text-white bg-red-700 p-2 appearance-none rounded-xl"
				>
					<option value={null} />
					{#each drivers as driver}
						<option value={driver}>
							{#if driver.name.display === 'first'}
								{driver.name.first}
							{:else}
								{driver.name.last}
							{/if}
						</option>
					{/each}
				</select>
			</label>

			<div class="flex flex-col gap-2">
				<span>Messages:</span>
				{#each messages as message, i}
					<div class="flex flex-row items-center gap-2">
						<select value={message.type} name="messages">
							<option value="driver">Driver</option>
							<option value="team">Team</option>
						</select>
						<span>:</span>
						<input
							type="text"
							value={message.message}
							name="messages"
							class="w-full flex-auto text-white bg-red-700 p-2 appearance-none rounded-xl"
						/>
						<button type="button" on:click={() => removeMessage(i)}>X</button>
					</div>
				{/each}
			</div>

			<button
				type="button"
				on:click={() => addMessage()}
				class="bg-red-700 text-white p-2 rounded-xl"
			>
				Add Message
			</button>
		</form>

		{#if driver != null}
			<hr class="w-full" />
			<RadioBox {driver} {messages} />
			<img src={image} alt="" width="320" />
		{/if}
	</div>
</main>
