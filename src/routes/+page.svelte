<script lang="ts">
	import { drivers, type Driver, type Messages } from '$lib/data';
	import type { FormEventHandler } from 'svelte/elements';
	import RadioBox from '$lib/renderers/RadioBox.svelte';
	import domtoimage from 'dom-to-image';

	let output: HTMLElement | undefined;

	let driver: Driver | null = drivers[0];
	let messages: Messages = [
		{ type: 'driver', message: "I've got no grip out here mate!" },
		{ type: 'team', message: 'copy' }
	];

	const formChange: FormEventHandler<HTMLFormElement> = (event) => {
		const form = new FormData(event.currentTarget);

		const d = form.get('driver') as string | null;
		const m = form.getAll('messages') as string[] | null;

		if (d != null) {
			driver = drivers.find((driver) => driver.id === d) ?? null;
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

	async function copy() {
		if (output == null) {
			return;
		}

		try {
			const blob = await domtoimage.toBlob(output);
			await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
		} catch (error) {
			console.error('oops, something went wrong!', error);
		}
	}
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
					value={driver?.id ?? ''}
					name="driver"
					class="text-white bg-red-700 p-2 appearance-none rounded-xl"
				>
					<option value={null} />
					{#each drivers as driver}
						<option value={driver.id}>
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
			<RadioBox {driver} {messages} bind:element={output} />

			<button type="button" class="bg-red-700 text-white p-2 rounded-xl" on:click={() => copy()}
				>Copy</button
			>
		{/if}
	</div>
</main>
